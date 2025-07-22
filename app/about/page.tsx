import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <div className="max-w-3xl mx-auto text-lg space-y-6">
          <p>
            Welcome to our restaurant! We are passionate about creating delicious food and providing an unforgettable
            dining experience for our customers. Founded in [Year], our mission has always been to [brief mission
            statement, e.g., "bring authentic Italian flavors to your table" or "serve fresh, locally-sourced
            ingredients"].
          </p>
          <p>
            Our chefs meticulously craft each dish, blending traditional recipes with modern culinary techniques. We
            believe that great food starts with great ingredients, which is why we partner with local farmers and
            suppliers to ensure the freshest produce and highest quality meats.
          </p>
          <p>
            Beyond the food, we strive to create a warm and inviting atmosphere where friends and family can gather,
            celebrate, and make lasting memories. Whether you're joining us for a quick lunch, a romantic dinner, or
            ordering online for a cozy night in, we promise a delightful experience.
          </p>
          <p>Thank you for choosing us. We look forward to serving you!</p>
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
