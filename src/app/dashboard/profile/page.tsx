import { auth } from "@/auth"
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
  const user = db.user.findFirst({where:{
    email : currentUser?.email
  }})

  return (
    <Card className="mx-14">
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
        <CardDescription>
          Mange your Personal details here 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              defaultValue='j'
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="w-full"
              defaultValue="youremail@gmail.com"
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
              defaultValue="0"
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
        </div>
      </CardContent>
    </Card>
  )
}

export default Page
