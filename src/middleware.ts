import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Routes accessible without authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/pricing(.*)',
  '/blog(.*)',
  '/privacy(.*)',
  '/terms(.*)',
  '/refund(.*)',
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
  '/api/generate',          // allow unauthenticated guest trials
  '/api/webhooks/(.*)',     // Stripe + Clerk webhooks must be publicly reachable
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const authObj = await auth();
    if (!authObj.userId) {
      return authObj.redirectToSignIn({ returnBackUrl: req.url });
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
