import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BookTablePage() {
  return (
    <div className="flex flex-col min-h-[100dvh] items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Book a Table</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Table booking functionality coming soon! Please check back later or contact us directly.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  )
}
