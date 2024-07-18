'use server'

import { auth } from "@/auth"
import { db } from "@/db"

export const getAuthStatus = async () => {
    const session = await auth()
    const user = session?.user
    console.log('user:' ,user)

    if(!user?.id || !user.email) {
        throw new Error('Invalid user data')
    }

    const existingUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    })

    if (!existingUser) {
        await db.user.create({
            data:{
                id: user.id,
                email: user.email,
            }
        })
    }

    return { success: true }
}
