import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { priceIds } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!priceIds) {
    return res.status(400).json({ error: 'Missing priceId' })
  }

  const sucessUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const makeLineItems = (priceIds: string[]) => {
    return priceIds.map((priceId) => {
      return {
        price: priceId,
        quantity: priceId.length
      }
    })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: sucessUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: makeLineItems(priceIds)
  })

  return res.status(200).json({ checkoutUrl: checkoutSession.url })
}