import {PrismaClient} from '@prisma/client'

declare global {
    var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
console.log(process.env.NODE_ENV )
if (process.env.NODE_ENV == 'production') {
    console.log("data-recevied")
    prisma = new PrismaClient()
} else {
    if (!global.cachedPrisma) {
        console.log("data-recevied")
        global.cachedPrisma = new PrismaClient()
    }
    console.log("data-recevied")
    prisma = global.cachedPrisma 
}

export const db = prisma