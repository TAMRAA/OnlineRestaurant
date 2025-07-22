import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster" // Import Toaster for toasts
import { ClerkProvider } from "@clerk/nextjs" // Import ClerkProvider
import { SiteHeader } from "@/components/site-header" // Added import

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Restaurant Online Ordering",
  description: "Your custom online food ordering website.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex min-h-screen flex-col">
            {" "}
            {/* Added wrapper div */}
            <SiteHeader /> {/* Added SiteHeader */}
            <main className="flex-1">
              {" "}
              {/* Added main wrapper */}
              {children}
            </main>
          </div>
          <Toaster /> {/* Add Toaster component */}
        </body>
      </html>
    </ClerkProvider>
  )
}
