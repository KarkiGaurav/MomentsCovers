import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import { ArrowRight, Lock } from "lucide-react";
import { auth } from "@/auth";
import { signOut } from "@/auth.ts";
import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
 } from "./ui/hover-card"
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
 

const Navbar = async () => {
   const session = await auth();
   const user = session?.user;
   const userImage = user?.image ? user.image : "https://utfs.io/f/dd3c91ab-6758-41de-8987-ebf008e52231-ij8tzf.png"
   const isAdmin = false;
   return (
      <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/7 backdrop-blur-lg transition-all">

         <MaxWidthWrapper>
            <div className="flex h-14 items-center justify-between border-b border-zinc-200">
               <Link href='/' className="flex z-40 font-semibold" id="step1">Moments <span className="text-red-700">Covers</span>
               </Link>

               <div className="h-full flex items-center space-x-4">
                  {(user ? (
                     <>

                        {isAdmin ?
                           (<Link href='' className={buttonVariants({
                              size: 'sm',
                              variant: 'ghost',
                           })}>Dashboard</Link>) : null}

                        <Link href='/configure/upload' className={buttonVariants({
                           size: 'sm',
                           className: 'hidden sm:flex items-center gap-1',
                        })}>Create Case
                           <ArrowRight className="ml-1.5 h-5 w-5" />
                        </Link>
                        <form
                           action={async () => {
                              'use server';
                              await signOut();
                           }}
                        >
                        <HoverCard>
                           <HoverCardTrigger>
                           <img src={userImage} alt="profile" className="h-10 w-14 rounded-full" />
                           </HoverCardTrigger>
                           <HoverCardContent className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                           <div className="flex flex-col justify-between space-x-1">
                              <div className="flex">
                              <Avatar>
                                 <AvatarImage className="h-10 w-16" src={userImage} />
                                 <AvatarFallback>Profile</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                   <h4 className="text-sm font-semibold">{user.name}</h4>
                                 <span className="text-xs text-gray-500">{user.email}</span>
                              </div>
                              
                              </div>
                              <hr className="my-2" />
                              <div className="space-y-1">
                                 
                                 <ul className="text-sm list-none text-left space-y-1">
                                 <li>
                                    <Link href="/dashboard/profile" className="text-blue-500 hover:underline">Profile</Link>
                                 </li>
                                 <li>
                                    <Link href="/dashboard/orders" className="text-blue-500 hover:underline">My Orders</Link>
                                 </li>
                                 </ul>
                                
                                 
                                 <button
                                    className={`${buttonVariants({
                                       size: 'sm',
                                       variant: 'ghost',
                                    })} text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 p-2 bg-slate-200`}
                                 >
                                   <Lock className="mr-1 h-4 w-4 opacity-70" /> Sign Out
                                 </button>
                                 
                              </div>
                           </div>
                           </HoverCardContent>
                        </HoverCard>

                        </form>

                     </>
                  ) : (
                     <>
                        <Link href='/auth/register' id="step-1" className={buttonVariants({
                           size: 'sm',
                           variant: 'ghost',
                        })}>Sign up</Link>

                        <Link href='/auth/login' className={buttonVariants({
                           size: 'sm',
                           variant: 'ghost',
                        })}>Login</Link>

                        <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                        <Link href='/configure/upload' id="step-2" className={buttonVariants({
                           size: 'sm',
                           className: 'hidden sm:flex items-center gap-1',
                        })}>Create Case
                           <ArrowRight className="ml-1.5 h-5 w-5" />
                        </Link>

                     </>
                  )
                  )}
               </div>
            </div>
         </MaxWidthWrapper>

      </nav>
   )
}

export default Navbar
