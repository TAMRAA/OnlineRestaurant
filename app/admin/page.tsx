import { auth } from "@clerk/nextjs/server"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import type { MenuItem } from "@/lib/types"
import { AdminMenuTable } from "@/components/admin/admin-menu-table"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// This function will fetch menu items for the admin dashboard from your API route.
async function getMenuItemsForAdmin(): Promise<MenuItem[]> {
  // Ensure NEXT_PUBLIC_APP_URL is set in your environment variables for Vercel deployments
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const res = await fetch(`${appUrl}/api/admin/menu-items`, {
    cache: "no-store", // Always fetch fresh data for admin
  })
  if (!res.ok) {
    // It's good practice to log the error response from the API
    const errorData = await res.json()
    console.error("Failed to fetch menu items for admin:", errorData)
    throw new Error("Failed to fetch menu items for admin")
  }
  return res.json()
}

export default async function AdminPage() {
  // Clerk authentication check (Server-side)
  const { userId } = auth()

  const user = await currentUser() // Fetch the current user details

  // Define your admin email(s) - must match the list in middleware.ts or come from a shared config
  // In a real product, consider managing roles in your database or via Clerk's metadata/organizations.
  const ADMIN_EMAILS = ["admin@example.com", "your.admin.email@example.com"]

  const userEmail = user?.emailAddresses?.[0]?.emailAddress

  if (!userId || !userEmail || !ADMIN_EMAILS.includes(userEmail)) {
    // Redirect unauthenticated or unauthorized users
    redirect("/") // Redirect to home page or a specific unauthorized page
  }

  const menuItems = await getMenuItemsForAdmin()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard - Menu Management</h1>
      <Suspense fallback={<AdminMenuTableSkeleton />}>
        <AdminMenuTable initialMenuItems={menuItems} />
      </Suspense>
    </main>
  )
}

function AdminMenuTableSkeleton() {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
            <Skeleton className="h-16 w-16 rounded-md mr-4" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-8 w-24 ml-4" />
            <Skeleton className="h-8 w-8 ml-2" />
          </div>
        ))}
      </div>
    </div>
  )
}
