"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { MenuItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface MenuItemFormProps {
  item: MenuItem | null
  onSave: (item: MenuItem) => void
}

export function MenuItemForm({ item, onSave }: MenuItemFormProps) {
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    category: "",
    isAvailable: true,
  })

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        category: item.category,
        isAvailable: item.isAvailable,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
        category: "",
        isAvailable: true,
      })
    }
  }, [item])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    setFormData((prev) => ({ ...prev, price: isNaN(value) ? 0 : value }))
  }

  const handleAvailabilityChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isAvailable: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.price !== undefined) {
      onSave(formData as MenuItem) // Cast as MenuItem, assuming all required fields are present or handled
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Textarea id="description" value={formData.description || ""} onChange={handleChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">
          Price
        </Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handlePriceChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="imageUrl" className="text-right">
          Image URL
        </Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl || ""}
          onChange={handleChange}
          className="col-span-3"
          placeholder="/placeholder.svg?height=200&width=200"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-right">
          Category
        </Label>
        <Input
          id="category"
          value={formData.category || ""}
          onChange={handleChange}
          className="col-span-3"
          placeholder="e.g., Pizza, Drinks, Desserts"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="isAvailable" className="text-right">
          Available
        </Label>
        <Switch
          id="isAvailable"
          checked={formData.isAvailable}
          onCheckedChange={handleAvailabilityChange}
          className="col-span-3"
        />
      </div>
      <Button type="submit" className="col-span-4 mt-4">
        {item ? "Save Changes" : "Add Item"}
      </Button>
    </form>
  )
}
