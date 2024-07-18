'use server'

import { auth } from "@/auth"
import { BASE_PRICE } from "@/config/products"
import { db } from "@/db"
import { stripe } from "@/lib/stripe"
import { FINISHES, MATERIALS } from "@/validators/option-validator"
import { Order } from "@prisma/client"


export const createCheckoutSession = async ({configId,}:{ configId: string}) => {
   
  const configuration = await db.configuration.findUnique({
        where: { id: configId },
     })

 
     if( !configuration ) {
        console.log("configuration=>", configId)
        throw new Error('No such configuration not found')
     }
 
    const userSession = await auth()
    const user = userSession?.user
    console.log("yyiui", user);

    if( !user ) {
        throw new Error('No such user not found')
    }

    const { material, finish } = configuration

    let price = BASE_PRICE

    const materialPrice = MATERIALS.options.find(({ value }) => value === material)?.price

    const finishPrice = FINISHES.options.find(({ value }) => value === finish)?.price

    if (typeof materialPrice !== 'undefined' && materialPrice > 0) {
        price += materialPrice
    }

    if (typeof finishPrice !== 'undefined' && finishPrice > 0) {
        price += finishPrice
    }

    let order: Order | undefined = undefined

    const existingOrder = await db.order.findFirst({
        where: {
            userId: user.id,
            configurationId: configuration.id,
        },
     })

  if (typeof user.id === 'string') {
     if (existingOrder) {
        order = existingOrder
     } else {
        order = await db.order.create({
            data: {
                amount: price / 100,
                userId: user.id,
                configurationId: configuration.id,
            },
        })
     }
    }

     const product = await stripe.products.create({
        name: 'Custome iphone Case',
        images: [configuration.imgUrl],
        default_price_data: {
            currency: 'USD',
            unit_amount: price,
        },
     })
     const successUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/preview?id=${configuration.id}`
    try{
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order?.id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/preview?id=${configuration.id}`,
            payment_method_types: ['card'],
            mode: 'payment',
            shipping_address_collection: { allowed_countries: ['DE', 'IN', 'US']},
            metadata: {
                userId: user.id,
                orderId: order?.id,
            },
            line_items: [{ price: product.default_price as string, quantity: 1}],
        });

     return { url: stripeSession.url}

    }catch (err) {
        console.error('Error creating Stripe session:', err);
    }


}