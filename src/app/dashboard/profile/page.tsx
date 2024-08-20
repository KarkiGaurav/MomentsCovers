import { auth } from "@/auth"
import Popover from "@/components/Popover"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/db"

const Page = async () => {

  const userSession = await auth()
  const currentUser = userSession?.user
  const user = await db.user.findFirst({where:{
    email : currentUser?.email
  }})

  const purchase = await db.order.aggregate({
    where: {
      isPaid: true,
      user: {
        email: user?.email
      }
      
    },
    _count: {
      id: true
    }
  })


  return (
    <Card className="mx-14">
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
        <CardDescription>
          Mange your Personal details here 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              defaultValue={user?.name}
          
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="w-full"
              defaultValue={user?.email}
              disabled
            />
          </div>
          <div className="grid ">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              className="w-full"
              defaultValue="8888888888"
            />
          </div>
          <div className="grid ">
            <Label htmlFor="items">Total Purchese</Label>
            <Input
              id="item"
              type="text"
              className="w-full"
              defaultValue={purchase._count?.id ?? 0}
              disabled
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Profile Picture</Label>
            <Textarea
              id="description"
              defaultValue=""
              className="min-h-32"
            />
          </div>

          <div className="grid gap-1 max-w-fit mt-7 ">
            <Button variant={"default"} >Update profile </Button>

            {/* <Button variant={"secondary"}>Update Password </Button> */}
            <Popover/>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Page
