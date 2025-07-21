import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import type { MenuItem } from "@/lib/types"
import { AdminMenuTable } from "@/components/admin/admin-menu-table"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// This function will fetch menu items for the admin dashboard.
async function getMenuItemsForAdmin(): Promise<MenuItem[]> {
  // In a real application, you would fetch from your Next.js API route:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/menu-items`, {
  //   cache: 'no-store', // Always fetch fresh data for admin
  // });
  // if (!res.ok) {
  //   throw new Error('Failed to fetch menu items for admin');
  // }
  // return res.json();

  // Mock data for demonstration
  await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay
  return [
    {
      id: "1",
      name: "Margherita Pizza",
      description: "Classic pizza with tomato, mozzarella, and basil.",
      price: 12.99,
      imageUrl: "/placeholder.svg?height=200&width=200",
      category: "Pizza",
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Pepperoni Pizza",
      description: "Pizza with spicy pepperoni and extra cheese.",
      price: 14.5,
      imageUrl: "/placeholder.svg?height=200&width=200",
      category: "Pizza",
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Caesar Salad",
      description: "Fresh romaine lettuce, croutons, parmesan, and Caesar dressing.",
      price: 8.75,
      imageUrl: "/placeholder.svg?height=200&width=200",
      category: "Salad",
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Coca-Cola",
      description: "Refreshing soft drink.",
      price: 2.5,
      imageUrl: "/placeholder.svg?height=200&width=200",
      category: "Drinks",
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Cheeseburger",
      description: "Juicy beef patty with cheese, lettuce, tomato, and pickles.",
      price: 10.99,
      imageUrl: "/placeholder.svg?height=200&width=200",
      category: "Burgers",
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "6",
      name: "French Fries",
      description: "Crispy golden fries.",
      price: 3.5,
      imageUrl: "/placeholder.svg?height=200&width=200",
      category: "Sides",
      isAvailable: false, // Example of an unavailable item
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
}

export default async function AdminPage() {
  // Clerk authentication check (Server-side)
  const { userId } = auth()

  if (!userId) {
    // Redirect unauthenticated users to the sign-in page
    redirect("/sign-in") // Assuming you have a /sign-in route configured with Clerk
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
