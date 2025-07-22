import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import type { MenuItem } from "@/lib/types"
import { createServerClient } from "@/lib/supabase" // Import server-side Supabase client

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const supabase = createServerClient() // Use server-side client
    const { data, error } = await supabase.from("MenuItem").select("*").order("createdAt", { ascending: false })

    if (error) {
      console.error("Supabase error fetching menu items:", error)
      return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
    }

    // Map Supabase data to your MenuItem type, handling Decimal for price
    const menuItems: MenuItem[] = data.map((item: any) => ({
      ...item,
      price: Number.parseFloat(item.price), // Convert Decimal to number
      isAvailable: item.isAvailable, // Ensure boolean type
    }))

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
    const body: Omit<MenuItem, "id" | "createdAt" | "updatedAt"> = await req.json()
    const supabase = createServerClient() // Use server-side client

    const { data, error } = await supabase.from("MenuItem").insert([body]).select().single()

    if (error) {
      console.error("Supabase error creating menu item:", error)
      return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 })
    }

    const newMenuItem: MenuItem = {
      ...data,
      price: Number.parseFloat(data.price),
      isAvailable: data.isAvailable,
    }

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
    const body: Partial<MenuItem> & { id: string } = await req.json()
    const { id, ...dataToUpdate } = body

    if (!id) {
      return NextResponse.json({ error: "Menu item ID is required for update" }, { status: 400 })
    }

    const supabase = createServerClient() // Use server-side client

    const { data, error } = await supabase.from("MenuItem").update(dataToUpdate).eq("id", id).select().single()

    if (error) {
      console.error("Supabase error updating menu item:", error)
      return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 })
    }

    const updatedMenuItem: MenuItem = {
      ...data,
      price: Number.parseFloat(data.price),
      isAvailable: data.isAvailable,
    }

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

    const supabase = createServerClient() // Use server-side client

    const { error } = await supabase.from("MenuItem").delete().eq("id", id)

    if (error) {
      console.error("Supabase error deleting menu item:", error)
      return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
    }

    return NextResponse.json({ message: "Menu item deleted successfully" })
  } catch (error) {
    console.error("Error deleting menu item:", error)
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
  }
}
