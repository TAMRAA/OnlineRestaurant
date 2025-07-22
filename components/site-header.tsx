import Link from "next/link"
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">Restaurant</span>
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/"
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
            >
              Menu
            </Link>
            <Link
              href="/about"
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
            >
              Admin
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button asChild>
                <SignInButton />
              </Button>
            </SignedOut>
          </nav>
        </div>
      </div>
    </header>
  )
}
