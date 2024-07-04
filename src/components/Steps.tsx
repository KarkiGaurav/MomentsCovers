"use client"

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"

const STEPS = [
    {
        name: 'Step 1: Add image',
        description: 'Choose an image for your case',
        url: '/upload'
    },
    {
        name: 'Step 2: Customize design',
        description: 'Make the case yours',
        url: '/design'
    },
    {
        name: 'Step 3: Summary',
        description: 'Review your final design',
        url: '/preview'
    },
]

const Steps = () => {

    const pathname = usePathname();
    return ( 
        <ol className="rounded-md bg-white lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200">
           {STEPS.map((step, i)=>{
              const isCurrent = pathname.startsWith(step.url)
              const isCompleted = STEPS.slice(i+1).some((step) => 
                pathname.endsWith(step.url)
              )

              const imgPath = `/snake-${i+1}.png`
              return (
                <li key={step.name} className="relative overflow-hidden lg:flex-1">
                    <span className={cn('absolute left-0 top-0 h-full w-1 bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full', {
                        'bg-zinc-700': isCurrent,
                        'bg-primary': isCompleted,
                    })} 
                    aria-hidden='true'>
 
                        <span className={cn(i !== 0 ? 'lg:pl-9': '', 'flex items-center px-6 py-4 text-sm font-medium')}>

                            <img src={imgPath} alt="snale" className="h-6"/>
                        </span>


                    </span>

                </li>
              )
           })}
        </ol>
    )
}

export default Steps