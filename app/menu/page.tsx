import { Suspense } from "react"
import type { MenuItem } from "@/lib/types"
import { MenuList } from "@/components/customer/menu-list"
import { Skeleton } from "@/components/ui/skeleton"

// This function will fetch menu items from your API route or directly from Supabase via Prisma.
// For demonstration, we'll use a mock fetch.
async function getMenuItems(): Promise<MenuItem[]> {
  // In a real application, you would fetch from your Next.js API route:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/menu-items`, {
  //   cache: 'no-store', // Or 'force-cache' with revalidate for static menus
  // });
  // if (!res.ok) {
  //   throw new Error('Failed to fetch menu items');
  // }
  // return res.json();

  // Mock data for demonstration
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
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
  ]
}

export default async function HomePage() {
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
