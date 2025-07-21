import { NextResponse } from "next/server"
import type { MenuItem } from "@/lib/types"

// Mock Prisma client for demonstration
const prisma = {
  order: {
    create: async (data: any) => {
      console.log("Mock: Creating order in DB", data)
      return { id: "mock-order-123", ...data }
    },
  },
  orderItem: {
    createMany: async (data: any) => {
      console.log("Mock: Creating order items in DB", data)
      return { count: data.data.length }
    },
  },
}

// Mock Stripe for demonstration
const stripe = {
  checkout: {
    sessions: {
      create: async (params: any) => {
        console.log("Mock: Creating Stripe checkout session", params)
        return { url: "https://mock-stripe-checkout.com/session_id_123" }
      },
    },
  },
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { cart, customerDetails, orderType, totalAmount } = body

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    // 1. Create Order in Database (using Prisma)
    const newOrder = await prisma.order.create({
      data: {
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,
        totalAmount: totalAmount,
        status: "PENDING", // Initial status
        orderType: orderType.toUpperCase(),
        deliveryAddress: orderType === "delivery" ? customerDetails.address : null,
        // pickupTime: new Date().toISOString(), // You might want to add a selection for this
      },
    })

    // 2. Create Order Items
    const orderItemsData = cart.map((item: { item: MenuItem; quantity: number }) => ({
      orderId: newOrder.id,
      menuItemId: item.item.id,
      quantity: item.quantity,
      price: item.item.price, // Store price at time of order
    }))

    await prisma.orderItem.createMany({
      data: orderItemsData,
    })

    // 3. Create Stripe Checkout Session
    // In a real app, you'd use your actual Stripe secret key and configure line_items
    // const stripeSession = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: cart.map((item: { item: MenuItem; quantity: number }) => ({
    //     price_data: {
    //       currency: 'usd',
    //       product_data: {
    //         name: item.item.name,
    //         description: item.item.description,
    //       },
    //       unit_amount: Math.round(item.item.price * 100), // Price in cents
    //     },
    //     quantity: item.quantity,
    //   })),
    //   mode: 'payment',
    //   success_url: `${headers().get('origin')}/order-success?order_id=${newOrder.id}`,
    //   cancel_url: `${headers().get('origin')}/cart`,
    //   metadata: {
    //     orderId: newOrder.id,
    //   },
    //   customer_email: customerDetails.email,
    // });

    // For demonstration, we'll just return a success message.
    // In a real app, you'd return { checkoutSessionUrl: stripeSession.url }
    return NextResponse.json({ message: "Order placed successfully!", orderId: newOrder.id })
  } catch (error) {
    console.error("Error during checkout:", error)
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 })
  }
}
