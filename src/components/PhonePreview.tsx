import { useEffect, useRef, useState } from "react"
import { AspectRatio } from "./ui/aspect-ratio"
import { COLORS } from "@/validators/option-validator"
import { cn } from "@/lib/utils"

const PhonePreview = ({croppedImageUrl, color,} : {
    croppedImageUrl: string,
    color: string,
}) => {

    const ref = useRef<HTMLDivElement>(null)

    const [renderedDimensions, setRederedDimensions] = useState({
        height: 0,
        width: 0,
    })

    const handleResize = () => {
        if (!ref.current) return
        const { width, height } = ref.current.getBoundingClientRect()
        setRederedDimensions({ width, height})
    }

    useEffect(() => {
        handleResize()

        window.addEventListener('resize', handleResize)
    }, [ref.current])

    let caseBackgroundColor = COLORS.find((supportedColor) => supportedColor.value === color)?.tw


  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
        <div className="absolute z-20 scale-[1.0352]" style={{
            left: renderedDimensions.width / 2 - renderedDimensions.width / (1216 / 121),
            top: renderedDimensions.height / 6.22,
         }} >

            <img width={renderedDimensions.width / (3000 / 637)} src={croppedImageUrl} alt="Case Preview Image" className={cn('phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]', caseBackgroundColor)} />
        </div>
      
        <div className='relative h-full w-full z-40'>
        <img
          alt='phone'
          src='/clearphone.png'
          className='pointer-events-none h-full w-full antialiased rounded-md'
        />
      </div>
    </AspectRatio>
  )
}

export default PhonePreview
