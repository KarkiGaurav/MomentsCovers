import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface PhoneProps extends HTMLAttributes<HTMLDivElement>{
    imgSrc: string
    dark?: boolean
}

const Phone = ({imgSrc, className, dark=false, ...props}: PhoneProps) => {
    return (
       <div className={cn('relative pointer-events-zone z-50 overflow-hidden', className)} {...props}>
        <img src={dark? '/phone-template-dark-edges.png': '/phone-template-white-edges.png'} className="pointer-events-none z-50 select-none" alt="phone image" />

         <div className="absolute -z-10 inset-0">
            <img src={imgSrc} className="object-cover min-w-full min-h-full" alt="overlaying phone image"/>
         </div>
       </div>
    )
}

export default Phone