import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Have a question or feedback? Fill out the form below and we'll get back to you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Send Message</Button>
            </CardFooter>
          </Card>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Our Location</h3>
              <p className="text-muted-foreground">123 Restaurant Lane, Foodie City, FC 12345</p>
              <p className="text-muted-foreground">
                <Link
                  href="https://maps.google.com/?q=123+Restaurant+Lane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  View on Map
                </Link>
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Hours of Operation</h3>
              <p className="text-muted-foreground">Monday - Friday: 11:00 AM - 10:00 PM</p>
              <p className="text-muted-foreground">Saturday - Sunday: 12:00 PM - 11:00 PM</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Phone & Email</h3>
              <p className="text-muted-foreground">Phone: (123) 456-7890</p>
              <p className="text-muted-foreground">Email: info@restaurant.com</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Restaurant Name. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/about">
            About Us
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/contact">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
