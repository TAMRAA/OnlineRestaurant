import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)", // Protects all routes under /admin
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect() // Ensure user is authenticated

    const user = await currentUser() // Fetch the current user details

    // Define your admin email(s) - replace with actual admin emails or a more robust check
    const ADMIN_EMAILS = ["admin@example.com", "your.admin.email@example.com"]

    // Check if the authenticated user's email is an admin email
    const userEmail = user?.emailAddresses?.[0]?.emailAddress

    if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
      // If not an admin, redirect them away from the admin page
      return NextResponse.redirect(new URL("/", req.url))
    }
  }
})

export const config = {
  matcher: [
    // Exclude files with a "." in the name, which are typically static assets (e.g., favicon.ico, .jpg, .png)
    // Exclude _next/static (static files) and _next/image (image optimization files)
    // Exclude api/trpc (tRPC routes)
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files that should be protected, e.g., API routes
    "/",
    "/(api|trpc)(.*)",
  ],
}
