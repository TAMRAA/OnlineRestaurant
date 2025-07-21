"use client"

import { useState } from "react"
import type { MenuItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MenuItemForm } from "./menu-item-form"
import Image from "next/image"
import { Edit, Trash, PlusCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
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

interface AdminMenuTableProps {
  initialMenuItems: MenuItem[]
}

export function AdminMenuTable({ initialMenuItems }: AdminMenuTableProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { toast } = useToast()

  const handleSaveMenuItem = async (item: MenuItem) => {
    // In a real app, you'd call your API route/Server Action here
    // For demo, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (item.id) {
      // Update existing item
      setMenuItems((prev) => prev.map((mi) => (mi.id === item.id ? item : mi)))
      toast({
        title: "Menu Item Updated",
        description: `${item.name} has been updated.`,
      })
    } else {
      // Add new item (assign a mock ID for demo)
      const newItem = {
        ...item,
        id: `new-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setMenuItems((prev) => [...prev, newItem])
      toast({
        title: "Menu Item Added",
        description: `${item.name} has been added to the menu.`,
      })
    }
    setIsFormOpen(false)
    setEditingItem(null)
  }

  const handleDeleteMenuItem = async (itemId: string) => {
    // In a real app, you'd call your API route/Server Action here
    // For demo, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setMenuItems((prev) => prev.filter((item) => item.id !== itemId))
    toast({
      title: "Menu Item Deleted",
      description: "The menu item has been removed.",
      variant: "destructive",
    })
  }

  const handleToggleAvailability = async (item: MenuItem) => {
    const updatedItem = { ...item, isAvailable: !item.isAvailable }
    // In a real app, call API to update availability
    await new Promise((resolve) => setTimeout(resolve, 300))
    setMenuItems((prev) => prev.map((mi) => (mi.id === item.id ? updatedItem : mi)))
    toast({
      title: "Availability Updated",
      description: `${item.name} is now ${updatedItem.isAvailable ? "available" : "unavailable"}.`,
    })
  }

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Menu Items</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingItem(null)
                setIsFormOpen(true)
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
            </DialogHeader>
            <MenuItemForm item={editingItem} onSave={handleSaveMenuItem} />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Image
                  src={item.imageUrl || "/placeholder.svg?height=64&width=64&query=food item thumbnail"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category || "N/A"}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`availability-${item.id}`}
                    checked={item.isAvailable}
                    onCheckedChange={() => handleToggleAvailability(item)}
                  />
                  <Label htmlFor={`availability-${item.id}`} className="sr-only">
                    Toggle availability for {item.name}
                  </Label>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Dialog open={isFormOpen && editingItem?.id === item.id} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingItem(item)
                          setIsFormOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit Menu Item</DialogTitle>
                      </DialogHeader>
                      <MenuItemForm item={editingItem} onSave={handleSaveMenuItem} />
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600 bg-transparent">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the
                          <span className="font-semibold"> {item.name} </span>
                          menu item.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteMenuItem(item.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
