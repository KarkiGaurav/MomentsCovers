import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import Reviews from "@/components/Reviews";
import { Icons } from "@/components/icons";
import { BadgeCheck, Check, Star } from "lucide-react";
import Image from "next/image";


export default function Home() {
  return (
  <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
             <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                <div className="absolute w-28 left-0 -top-24 hidden lg:block">
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28' />
                     <img src="/snake-1.png" className="w-full" alt="hero Image"/> 
                </div>
                <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">Your Images on a <span className="bg-green-600 text-white px-2">Custome</span>Phone Case</h1>
                <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-blance md:text-wrap">Capture your favorite memories with your own,<span className="font-semibold"> one-of-of</span>phone case. 
                CaseCobra allows you to protect your memories, not just your phone case.</p>

                <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                  <div className="space-y-2">
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="h-5 w-5 shrink-0 text"/>
                      Hight-quality, durable material
                    </li>
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="h-5 w-5 shrink-0 text"/>
                     5 years print guarantee
                    </li>
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="h-5 w-5 shrink-0 text"/>
                      Modern iPhone models supported
                    </li>
                  </div>
                </ul>

                <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="flex -space-x-4">
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" src="/users/user-1.png" alt="user image"/>

                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" src="/users/user-2.png" alt="user image"/>

                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" src="/users/user-3.png" alt="user image"/>

                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" src="/users/user-4.jpg" alt="user image"/>

                    <img className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100" src="/users/user-5.jpg" alt="user image"/>
                  </div>

                  <div className="flex flex-col justify-between items-center sm:items-start">
                    <div className="flex gap-0.5">
                      <Star className="h-4 w-4 text-green-600 filll-green-600"/>
                      <Star className="h-4 w-4 text-green-600 filll-green-600"/>
                      <Star className="h-4 w-4 text-green-600 filll-green-600"/>
                      <Star className="h-4 w-4 text-green-600 filll-green-600"/>
                      <Star className="h-4 w-4 text-green-600 filll-green-600"/>
                    </div>

                    <p><span className="font-semibold">1,250</span>happy customer</p>
                  </div>
                </div>
             </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mt-20 h-fit">
             <div className="relative md:max-w-xl">
              <img src="/your-image.png" className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"/>
             
              <img src="/line.png" className="absolute w-20 -left-6 -bottom-6 select-none"/>
              <Phone className="w-64" imgSrc="/testimonials/1.jpg"/>
             </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* value proposition section */}
      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row text-center gap-4 sm:gap-6">
              <h2 className="order-1 mt-2 tracking-tight text-balance !leading-tight font-bold text-5xl md:text-6xl">
                   what our <span className="relative px-2">customer <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500'/> </span>  say
              </h2>
              <img src="/snake-2.png" className="w-24 order-0 lg:order-2"/>
          </div>

          {/* Review Section (will make it dynamic later) */}

          <div className="max-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0  lg:max-w-none lg:grid-cols-2 gap-y-16">
             <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
               <div className="flex gap-0.5 mb-2">
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
               </div>
               <div className="text-lg leading-8">
                  <p>
                    "this case feels dirable and I  even got a compliment ont he design. Had the case for two and a half months now and <span>the image is the super clear</span>, on the case I had before, the image started fading into yellow'ish color after a couple weeks. love it."
                  </p>
               </div>
               <div className="flex gap-4 mt-2">
                <img src='/users/user-1.png' className="rounded-full h-12 w-12 object-cover" alt="user" />
                <div className="flex flex-col">
                  <p className="font-semibold">
                    Jonathan
                  </p>
                <div className="flex gap-1.5 items-center text-zinc-600">
                    <BadgeCheck className="h-4 w-4 strole-[3px] text-green-600" />
                    <p>Varified Purchase</p>
                </div>
                </div>
               </div>
             </div>

             <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
               <div className="flex gap-0.5 mb-2">
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600" />
               </div>
               <div className="text-lg leading-8">
                  <p>
                    "I usually keep my phone together with my keys in my pocket and that led to some pretty heavy acratchmarks on all of my last phone case. This one, besides a barely noticeable scratch on the corner, <span>looks brand new after about half a year.</span> I dig it."
                  </p>
               </div>
               <div className="flex gap-4 mt-2">
                <img src='/users/user-4.jpg' className="rounded-full h-12 w-12 object-cover" alt="user" />
                <div className="flex flex-col">
                  <p className="font-semibold">
                    Harry
                  </p>
                <div className="flex gap-1.5 items-center text-zinc-600">
                    <BadgeCheck className="h-4 w-4 strole-[3px] text-green-600" />
                    <p>Varified Purchase</p>
                </div>
                </div>
               </div>
             </div>
          </div>
        </MaxWidthWrapper>

        <div className="pt-16">
           <Reviews/>
        </div>
      </section>
      
  </div>
  );
}
