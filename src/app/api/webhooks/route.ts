import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail"
import { db } from "@/db"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Resend } from "resend"
import Stripe from "stripe"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const body = await req.text()
        const signature = headers().get('stripe-signature')

        if (!signature) {
            return new Response('Missing stripe signature', { status: 400 })
        }

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )

        if (event.type === 'checkout.session.completed') {
            if (!event.data.object.customer_details?.email) {
                throw new Error('Missing user email')
            }

            const session = event.data.object as Stripe.Checkout.Session

            const { userId, orderId } = session.metadata || {
                userId: 'null',
                orderId: 'null'
            }

            if ( !userId || !orderId) {
                throw new Error('Invalid request metadata')
            }

            const billingAddress = session.customer_details!.address
            const shippingAddress = session.shipping_details!.address

            const updateOrder = await db.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    isPaid: true,
                    shippingAddress : {
                        // @ts-ignore
                        create: {
                            name: session.customer_details!.name!,
                            city: shippingAddress!.city!,
                            country: shippingAddress!.country!,
                            postalCode: shippingAddress!.postal_code!,
                            street: shippingAddress!.line1!,
                            state: shippingAddress!.state,
                        }
                    },
                    billingAddress: {
                        // @ts-ignore
                        create: {
                            name: session.customer_details!.name!,
                            city: billingAddress!.city!,
                            country: billingAddress!.country!,
                            postalCode: billingAddress!.postal_code!,
                            street: billingAddress!.line1!,
                            state: billingAddress!.state,
                        },
                    },
                },
            })

            await resend.emails.send({
                from: 'MomentsCovers <singhkarkigaurav@gmail.com>',
                to: [event.data.object.customer_details.email],
                subject: 'Thanks for your order!',
                react: OrderReceivedEmail({
                    orderId,
                    orderDate: updateOrder.createdAt.toLocaleDateString(),
                    // @ts-ignore
                    shippingAddress: {
                        name: session.customer_details?.name ?? 'N/A',
                        city: billingAddress?.city ?? 'N/A',
                        country: billingAddress?.country ?? 'N/A',
                        postalCode: billingAddress?.postal_code ?? 'N/A',
                        street: billingAddress?.line1 ?? 'N/A',
                        state: billingAddress?.state ?? 'N/A',
                    }
                })
            })
            
        }

        return NextResponse.json({ result: event, ok: true})

    } catch( error ) {
        console.error(error) 

        return NextResponse.json(
            { message: 'Something went wrong', ok: false},
            { status: 500 }
        )
    }


}