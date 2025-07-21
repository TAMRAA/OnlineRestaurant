"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { MenuItem } from "@/lib/types"

interface MenuItemCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="p-0">
        <Image
          src={item.imageUrl || "/placeholder.svg?height=200&width=200&query=food item"}
          alt={item.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="text-xl font-semibold mb-2">{item.name}</CardTitle>
        <CardDescription className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description || "No description available."}
        </CardDescription>
        <p className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => onAddToCart(item)} className="w-full" disabled={!item.isAvailable}>
          {item.isAvailable ? "Add to Cart" : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  )
}
