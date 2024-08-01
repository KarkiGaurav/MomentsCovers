'use server'

import { db } from "@/db"
import { headers } from 'next/headers'

export const checkUserIp = async (): Promise<boolean> => {
    const FALLBACK_IP_ADDRESS = '0.0.0.0'
    const forwardedFor = headers().get('x-forwarded-for')
    let ip: string
   
    if (forwardedFor) {
      ip = forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
      console.log('ip=>', ip)
    }else {
      ip = headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS
      console.log('ip==>', ip)
    }

   const existingUserIp = await db.ipAddress.findFirst({
      where: { ip : ip}
    })

    if (existingUserIp) {
      return false
    } else {
      await db.ipAddress.create({
        data: { ip: ip }
    })
    return true
    }

    
}