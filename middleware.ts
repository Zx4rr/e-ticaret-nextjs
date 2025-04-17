import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/user(.*)'])
const isPublicRoute = createRouteMatcher(['/api/contact(.*)', '/contact(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // İletişim formu gibi herkese açık rotaları kontrol et ve korumayı atla
  if (isPublicRoute(req)) {
    return;
  }
  
  // Korumalı rotaları kısıtla
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}