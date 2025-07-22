import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-b">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Delicious Food, Delivered to Your Door
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Order your favorite dishes from our restaurant online for pickup or delivery. Freshly prepared and
                  ready when you are.
                </p>
                <div className="space-x-4 mt-6">
                  <Button asChild>
                    <Link href="/menu">View Menu</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/book-table">Book a Table</Link>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width="600"
                  height="400"
                  alt="Hero"
                  className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Us?</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  We are committed to providing the best dining experience, whether you're eating in or ordering out.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  width="100"
                  height="100"
                  alt="Quality Ingredients"
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                />
                <h3 className="text-xl font-bold">Quality Ingredients</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We source the freshest local ingredients for our dishes.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  width="100"
                  height="100"
                  alt="Fast Delivery"
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                />
                <h3 className="text-xl font-bold">Fast Delivery</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get your food quickly with our efficient delivery service.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  width="100"
                  height="100"
                  alt="Excellent Service"
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                />
                <h3 className="text-xl font-bold">Excellent Service</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our team is dedicated to providing you with the best experience.
                </p>
              </div>
            </div>
          </div>
        </section>
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
