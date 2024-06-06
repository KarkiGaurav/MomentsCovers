import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import { ArrowRight } from "lucide-react";
import { auth } from "@/auth";
import { signOut } from "@/auth.ts";


const Navbar = async () => {
   const session = await auth();
   const user = session?.user;
   const isAdmin = false;
   return (
      <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/7 backdrop-blur-lg transition-all">

         <MaxWidthWrapper>
            <div className="flex h-14 items-center justify-between border-b border-zinc-200">
               <Link href='/' className="flex z-40 font-semibold">Moments <span className="text-green-600">Covers</span>
               </Link>

               <div className="h-full flex items-center space-x-4">
                  {(user ? (
                     <>
                        <form
                           action={async () => {
                              'use server';
                              await signOut();
                           }}
                        >
                           <button
                              className={buttonVariants({
                                 size: 'sm',
                                 variant: 'ghost',
                              })}>Sign Out</button>
                        </form>


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

                     </>
                  ) : (
                     <>
                        <Link href='/api/auth/register' className={buttonVariants({
                           size: 'sm',
                           variant: 'ghost',
                        })}>Sign up</Link>

                        <Link href='/auth/login' className={buttonVariants({
                           size: 'sm',
                           variant: 'ghost',
                        })}>Login</Link>

                        <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                        <Link href='/configure/upload' className={buttonVariants({
                           size: 'sm',
                           className: 'hidden sm:flex items-center gap-1',
                        })}>Create Case
                           <ArrowRight className="ml-1.5 h-5 w-5" />
                        </Link>
                        {/* </div> */}

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
