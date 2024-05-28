import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface PhoneProps extends HTMLAttributes<HTMLDivElement>{
    imgSrc: string
    dark?: boolean
}

const Phone = ({imgSrc, className, dark=false, ...props}: PhoneProps) => {
    return (
       <div className={cn('relative pointer-events-zone z-50 overflow-hidden', className)} {...props}>
        
       </div>
    )
}

export default Phone