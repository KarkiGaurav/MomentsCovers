
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { db } from "@/db"
import { useCurrentUser } from "@/hooks/use-current-user"
import { formatPrice } from "@/lib/utils"
import { notFound } from "next/navigation"

const Page = async () => {

    const user = useCurrentUser()

    if (!user || user.role !== 'ADMIN') {
        return notFound()
    }

    const orders =  await db.order.findMany({
        where: {
            isPaid: true,
            createdAt : {
                gte : new Date(new Date().setDate(new Date().getDate() - 7)),
            },  
        },
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: true,
          shippingAddess: true,
        },
    })

    const lastWeekSum = await db.order.aggregate({
      where: {
        isPaid: true,
        createdAt: {
          gte : new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      _sum: {
        amount: true
      }
    })

    const lastMonthSum = await db.order.aggregate({
      where: {
        isPaid: true,
        createdAt: {
          gte : new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
      _sum: {
        amount: true
      }
    })

    const WEEKLY_GOLE = 500
    const MONTHLY_GOLE = 2500

  return (
    <div className="flex min-h-screen w-full bg-muted/40" >
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4">
        <div className="flex flex-col fap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>
                  Last Week
                </CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastWeekSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOLE)} gole
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOLE}/>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>
                  Last Month
                </CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice((lastMonthSum)._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(MONTHLY_GOLE)} gole
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTHLY_GOLE}/>
              </CardFooter>
            </Card>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Incoming Orders</h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">Purchase date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="bg-accent">

                </TableRow>

              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
    </div>
  )
}

export default Page
