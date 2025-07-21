"use client"

import { useState, useMemo } from "react"
import type { MenuItem } from "@/lib/types"
import { MenuItemCard } from "./menu-item-card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface MenuListProps {
  initialMenuItems: MenuItem[]
}

export function MenuList({ initialMenuItems }: MenuListProps) {
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup")
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const { toast } = useToast()

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.item.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { item, quantity: 1 }]
      }
    })
    toast({
      title: "Item added to cart!",
      description: `${item.name} has been added.`,
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.item.id !== itemId))
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((cartItem) =>
            cartItem.item.id === itemId ? { ...cartItem, quantity: Math.max(1, newQuantity) } : cartItem,
          )
          .filter((cartItem) => cartItem.quantity > 0), // Remove if quantity becomes 0
    )
  }

  const totalItemsInCart = useMemo(() => {
    return cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0)
  }, [cart])

  const subtotal = useMemo(() => {
    return cart.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.quantity, 0)
  }, [cart])

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    if (!customerDetails.name || !customerDetails.email || (orderType === "delivery" && !customerDetails.address)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required customer details.",
        variant: "destructive",
      })
      return
    }

    // In a real application, you would integrate with Stripe here.
    // This is a placeholder for the payment process.
    console.log("Processing checkout with:", { cart, customerDetails, orderType, subtotal })

    try {
      // Example: Call your Next.js API route for order creation and Stripe checkout
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          customerDetails,
          orderType,
          totalAmount: subtotal,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Order Placed!",
          description: "Your order has been successfully placed. You will receive an email confirmation shortly.",
        })
        setCart([]) // Clear cart after successful order
        setIsCartOpen(false)
        setCustomerDetails({ name: "", email: "", phone: "", address: "" }) // Clear customer details
        // Redirect to a confirmation page or handle Stripe redirect
        // For Stripe, you'd typically get a checkout session URL and redirect the user.
        // window.location.href = data.checkoutSessionUrl;
      } else {
        throw new Error(data.error || "Failed to place order")
      }
    } catch (error: any) {
      console.error("Checkout error:", error)
      toast({
        title: "Order Failed",
        description: error.message || "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {initialMenuItems.map((item) => (
          <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
        ))}
      </div>

      <Button
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItemsInCart > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
            {totalItemsInCart}
          </span>
        )}
        <span className="sr-only">View Cart</span>
      </Button>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>Review your order before checkout.</SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-1 py-4 pr-4 -mr-4">
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium">{cartItem.item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${cartItem.item.price.toFixed(2)} x {cartItem.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                      >
                        -
                      </Button>
                      <span>{cartItem.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(cartItem.item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="customerName">Your Name</Label>
              <Input
                id="customerName"
                placeholder="John Doe"
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="customerEmail">Your Email</Label>
              <Input
                id="customerEmail"
                type="email"
                placeholder="john.doe@example.com"
                value={customerDetails.email}
                onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="customerPhone">Your Phone (Optional)</Label>
              <Input
                id="customerPhone"
                type="tel"
                placeholder="123-456-7890"
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
              />
            </div>

            <RadioGroup
              value={orderType}
              onValueChange={(value: "pickup" | "delivery") => setOrderType(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup">Pickup</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery">Delivery</Label>
              </div>
            </RadioGroup>

            {orderType === "delivery" && (
              <div className="grid gap-2">
                <Label htmlFor="deliveryAddress">Delivery Address</Label>
                <Input
                  id="deliveryAddress"
                  placeholder="123 Main St, Anytown, USA"
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                  required
                />
              </div>
            )}
          </div>
          <SheetFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full" disabled={cart.length === 0}>
                  Proceed to Checkout (${subtotal.toFixed(2)})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Your Order</AlertDialogTitle>
                  <AlertDialogDescription>
                    You are about to place an order for ${subtotal.toFixed(2)}. Please confirm your details and proceed
                    with payment.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCheckout}>Confirm & Pay</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
