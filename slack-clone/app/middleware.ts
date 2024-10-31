import { convexAuthNextjsMiddleware,
createRouteMatcher,
isAuthenticatedNextjs,
nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";
import { request } from "http";
import { createRouteLoader } from "next/dist/client/route-loader";




const isPublicPage = createRouteMatcher(["/signin"]);
const isProtectedRoute = createRouteMatcher(["/product(.*)"]);

export default convexAuthNextjsMiddleware((request)=>{
    if(!isPublicPage(request) && !isAuthenticatedNextjs()){
        return nextjsMiddlewareRedirect(request,"/signin");
    }
})



export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};