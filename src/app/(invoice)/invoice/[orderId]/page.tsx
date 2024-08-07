import { redirect } from 'next/navigation'

import InvoiceTable from '@/components/InvoiceTable'
import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db'
import { formatDate, formatPrice } from '@/lib/utils'
import { InvoiceAction } from '@/components/actions/InvoiceAction'

export default async function InvoicePage({
  params,
}: {
  params: { orderId: string }
}) {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect('/sign-in')
  }

  const order = await prisma.order.findUnique({
    where: {
      id: params.orderId,
      userId: session.user.id,
    },
  })

  if (!order) {
    return <h1>Not found</h1>
  }

  const orderItems = await prisma.orderItem.findMany({
    where: {
      orderId: order.id,
    },
    include: {
      product: true,
      store: true,
    },
  })
