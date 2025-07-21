// lib/types.ts
export type MenuItem = {
  id: string
  name: string
  description?: string
  price: number
  imageUrl?: string
  category?: string
  isAvailable: boolean
  createdAt: string
  updatedAt: string
}

export type Order = {
  id: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  totalAmount: number
  status: "PENDING" | "PREPARING" | "READY_FOR_PICKUP" | "OUT_FOR_DELIVERY" | "DELIVERED" | "COMPLETED" | "CANCELLED"
  orderType: "PICKUP" | "DELIVERY"
  pickupTime?: string
  deliveryAddress?: string
  createdAt: string
  updatedAt: string
}

export type OrderItem = {
  id: string
  orderId: string
  menuItemId: string
  quantity: number
  price: number
}
