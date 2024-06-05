import { HTMLAttributes, useEffect, useRef, useState } from "react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { disconnect } from "process"

const PHONES = [
  '/testimonials/1.jpg',
  '/testimonials/2.jpg',
  '/testimonials/3.jpg',
  '/testimonials/4.jpg',
  '/testimonials/5.jpg',
  '/testimonials/6.jpg',
]

function splitArray<T>(array: Array<T>, numParts: number){
  const result: Array<Array<T>> = []

  for(let i = 0; i < array.length; i++ ){
    const index = i % numParts;
    if(!result[index]){
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result 
}

function ReviewColumn({
  reviews, 
  className,
  reviewClassName,
  msPerPixel = 0
}:{
  reviews: string[]
  className?: string
  reviewClassName?: (reviewIndex: number) => string
  msPerPixel?: number
}){

  const columnRef = useRef<HTMLDivElement | null>(null)
  const [coulmnHeight, setCoulnHeight] = useState(0)
  const duration = `${coulmnHeight * msPerPixel}ms`

  useEffect(()=>{
    if(!columnRef.current) return 

    const resizeObserver = new window.ResizeObserver(()=>{
      setCoulnHeight(columnRef.current?.offsetHeight?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return() => {
      resizeObserver.disconnect()
    }
  }, [])

  return(
   <div 
   ref={columnRef}
   className={cn('anumate-marquee space-y-8 py-4', className)}
   style={{'--marquee-duration': duration} as React.CSSProperties}
   >
    {
      <Review />
    }

   </div>
  )
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement>{
  imgSrc: string
}

function Review({imgSrc, className, ..props}: ReviewProps) {

  return(
     <div className={cn('')}>

     </div>
  )

}

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, {once: true, amount: 0.4})
  const columns = splitArray(PHONES, 3)
  const column1 = columns[0]
  const column2 = columns[2]
  const column3 = splitArray(columns[2], 2)

  return (
       <div ref={containerRef} className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-center gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {
          isInView?(
            <>
              <ReviewColumn/>
            </>
          ): null
        }

        <div className="pointer-events-none absolute inset-x-o top-0 h-32 bg-gradient-to-b from-slate-100"/>
        <div className="pointer-events-none absolute inset-x-o bottom-0 h-32 bg-gradient-to-t from-slate-100"/>

       </div> 
  )
}

const Reviews = () => {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <img src="/what-people-are-buying.png" />
      {/* <ReviewGrid/> */}
    </MaxWidthWrapper>
  )
}

export default Reviews
