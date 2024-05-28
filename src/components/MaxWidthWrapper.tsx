import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const MaxWidthWrapper = ({ className, children, }: { className?: string; children: ReactNode; }) => {
    return (
        <div className={cn('h-full mx-auto max-w-screen-xl md:px-20', className)}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper
