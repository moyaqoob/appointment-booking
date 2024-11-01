import { 
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect 
} from "@convex-dev/auth/nextjs/server";
import { create } from "domain";

// Define route matchers
const isSignInPage = createRouteMatcher(["/auth"]);
const isProtectedRoute = createRouteMatcher(["/page(.*)"])
// const isProtectedRoute = createRouteMatcher(["/page(.*)"]);

export default convexAuthNextjsMiddleware((request,{convexAuth}) => {
  // If the request is for a public page and the user is authenticated, redirect to a specific page
  if (isProtectedRoute(request) && isAuthenticatedNextjs()) {
      return nextjsMiddlewareRedirect(request, "/page"); // Redirect to the desired page for authenticated users
  }

  // If the request is for a protected page and the user is not authenticated, redirect to the auth page
  if (!isSignInPage(request) && !isAuthenticatedNextjs()) {
      return nextjsMiddlewareRedirect(request, "/auth"); // Redirect to the auth page for unauthenticated users
  }
});

// Config for the middleware
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
