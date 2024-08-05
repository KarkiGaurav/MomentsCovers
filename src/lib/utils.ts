import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(price)

}

export function constructMetadata({
  title = 'MomentsCovers - custom high-quality phone cases',
  description = 'Create custom high-quality phone cases in seconds',
  image = '/Momentscovers.png',
  icons = '/icon.png',
  manifest = '/manifest.webmanifest'
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  manifest?: string
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@karkiGaurav',
    },
    icons,
    manifest,
    metadataBase: new URL("https://moments-covers.vercel.app/")
  }
}