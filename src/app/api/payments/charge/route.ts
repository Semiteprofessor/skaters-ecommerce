const midtransClient = require('midtrans-client')
import { z } from 'zod'
import { nanoid } from 'nanoid'

import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db'
import { checkoutSchema } from '@/lib/validators/checkout'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const { productIds } = checkoutSchema.parse(body)

    if (!productIds || productIds.length === 0) {
      return new Response('Product ids are required.', { status: 400 })
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    })

    const gross_amount = products.reduce((total, item) => {
      return total + Number(item.price)
    }, 0)

    const order_id = `TRX-${nanoid(4)}-${nanoid(8)}`

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    })
