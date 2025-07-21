import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import type { MenuItem } from "@/lib/types"

// Mock Prisma client for demonstration
const prisma = {
  menuItem: {
    findMany: async () => {
      console.log("Mock: Fetching all menu items from DB")
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
      ]
    },
    create: async (data: { data: Omit<MenuItem, "id" | "createdAt" | "updatedAt"> }) => {
      console.log("Mock: Creating menu item in DB", data.data)
      return {
        id: `mock-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data.data,
      }
    },
    update: async (params: { where: { id: string }; data: Partial<MenuItem> }) => {
      console.log("Mock: Updating menu item in DB", params.where.id, params.data)
      return { id: params.where.id, updatedAt: new Date().toISOString(), ...params.data }
    },
    delete: async (params: { where: { id: string } }) => {
      console.log("Mock: Deleting menu item from DB", params.where.id)
      return { id: params.where.id }
    },
  },
}

export async function GET() {
  // Clerk authentication check (Server-side)
  const { userId } = auth()

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const menuItems = await prisma.menuItem.findMany()
    return NextResponse.json(menuItems)
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const body = await req.json()
    const newMenuItem = await prisma.menuItem.create({ data: body })
    return NextResponse.json(newMenuItem, { status: 201 })
  } catch (error) {
    console.error("Error creating menu item:", error)
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const body = await req.json()
    const { id, ...data } = body
    if (!id) {
      return NextResponse.json({ error: "Menu item ID is required for update" }, { status: 400 })
    }
    const updatedMenuItem = await prisma.menuItem.update({ where: { id }, data })
    return NextResponse.json(updatedMenuItem)
  } catch (error) {
    console.error("Error updating menu item:", error)
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "Menu item ID is required for deletion" }, { status: 400 })
    }
    await prisma.menuItem.delete({ where: { id } })
    return NextResponse.json({ message: "Menu item deleted successfully" })
  } catch (error) {
    console.error("Error deleting menu item:", error)
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
  }
}
