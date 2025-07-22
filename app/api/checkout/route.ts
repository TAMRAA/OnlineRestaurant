import { NextResponse } from "next/server"
import type { MenuItem } from "@/lib/types"
import { createServerClient } from "@/lib/supabase" // Import server-side Supabase client

// Mock Stripe for demonstration (replace with actual Stripe integration later)
const stripe = {
  checkout: {
    sessions: {
      create: async (params: any) => {
        console.log("Mock: Creating Stripe checkout session", params)
        // In a real app, you'd use your actual Stripe secret key and configure line_items
        // For now, return a placeholder URL
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

    const supabase = createServerClient() // Use server-side client

    // 1. Create Order in Database
    const { data: newOrder, error: orderError } = await supabase
      .from("Order")
      .insert({
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,
        totalAmount: totalAmount,
        status: "PENDING", // Initial status
        orderType: orderType.toUpperCase(),
        deliveryAddress: orderType === "delivery" ? customerDetails.address : null,
        // pickupTime: new Date().toISOString(), // You might want to add a selection for this
      })
      .select()
      .single()

    if (orderError || !newOrder) {
      console.error("Supabase error creating order:", orderError)
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    // 2. Create Order Items
    const orderItemsData = cart.map((item: { item: MenuItem; quantity: number }) => ({
      orderId: newOrder.id,
      menuItemId: item.item.id,
      quantity: item.quantity,
      price: item.item.price, // Store price at time of order
    }))

    const { error: orderItemsError } = await supabase.from("OrderItem").insert(orderItemsData)

    if (orderItemsError) {
      console.error("Supabase error creating order items:", orderItemsError)
      // Consider rolling back the order if order items fail
      return NextResponse.json({ error: "Failed to create order items" }, { status: 500 })
    }

    // 3. Create Stripe Checkout Session (Mocked for now)
    // In a real app, you'd uncomment and use your actual Stripe integration here.
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
    //   success_url: `${req.headers.get('origin')}/order-success?order_id=${newOrder.id}`,
    //   cancel_url: `${req.headers.get('origin')}/cart`,
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
