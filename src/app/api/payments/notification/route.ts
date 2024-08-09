import crypto from 'crypto'

import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const hash = crypto
      .createHash('sha512')
      .update(
        `${body.order_id}${body.status_code}${body.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`,
      )
      .digest('hex')

    if (body.signature_key !== hash) {
      return new Response('Invalid signature key', {
        status: 403,
      })
    }

    let orderId = body.order_id
    let transactionStatus = body.transaction_status
    let fraudStatus = body.fraud_status

    console.log(
      `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`,
    )

    // Sample transactionStatus handling logic
