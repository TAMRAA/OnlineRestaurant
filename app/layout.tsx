import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster" // Import Toaster for toasts
import { ClerkProvider } from "@clerk/nextjs" // Import ClerkProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Restaurant Online Ordering",
  description: "Your custom online food ordering website.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      {" "}
      {/* Wrap your application with ClerkProvider */}
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster /> {/* Add Toaster component */}
        </body>
      </html>
    </ClerkProvider>
  )
}
