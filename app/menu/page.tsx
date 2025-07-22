import { Suspense } from "react"
import type { MenuItem } from "@/lib/types"
import { MenuList } from "@/components/customer/menu-list"
import { Skeleton } from "@/components/ui/skeleton"

// This function will fetch menu items from your API route.
async function getMenuItems(): Promise<MenuItem[]> {
  // Ensure NEXT_PUBLIC_APP_URL is set in your environment variables for Vercel deployments
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const res = await fetch(`${appUrl}/api/admin/menu-items`, {
    cache: "no-store", // Fetch fresh data for the menu
  })
  if (!res.ok) {
    const errorData = await res.json()
    console.error("Failed to fetch menu items:", errorData)
    throw new Error("Failed to fetch menu items")
  }
  return res.json()
}

export default async function MenuPage() {
  // Renamed from HomePage to MenuPage for clarity
  const menuItems = await getMenuItems()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">Our Menu</h1>
      <Suspense fallback={<MenuSkeleton />}>
        <MenuList initialMenuItems={menuItems} />
      </Suspense>
    </main>
  )
}

function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 shadow-md flex flex-col space-y-3">
          <Skeleton className="h-48 w-full rounded" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  )
}
