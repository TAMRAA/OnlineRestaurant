import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)", // Protects all routes under /admin
])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
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
