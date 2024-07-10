import { db } from "@/db"
import { notFound } from "next/navigation"
import DesignConfigurator from './DesignConfigurator'

interface PageProps {
    searchParams: {
     [key: string]: string | string[] | undefined
    }
}

const Page = async ({searchParams}: PageProps) => {

    const {id} = searchParams

    if (!id || typeof id !== 'string') {
        return notFound()
    }

    const configuration = await db.configuration.findUnique({
        where:{id},
    })

    if(!configuration){
        return notFound()
    }

    const {imgUrl, height, width} = configuration

    return (
       <>
         <DesignConfigurator
          configId={configuration.id}
          imageUrl={configuration.imgUrl}
          imageDimensions={{height, width}}
         />
        </>
    )
}

export default Page