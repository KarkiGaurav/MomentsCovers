import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth'
import Tour from "@/components/Tour";
import { constructMetadata } from "@/lib/utils";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = constructMetadata()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
      {/* <link rel="icon" href="/icon.png" sizes="any" /> */}
        <body className={recursive.className}>
          <Navbar />
          <Tour/>
          <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
            <div className="flex-1 flex flex-col h-full">
              <Providers>
                {children}
              </Providers>
            </div>
            <Footer />
          </main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
