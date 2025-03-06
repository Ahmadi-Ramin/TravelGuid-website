// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export default async function middleware(req) {
//     const token = await getToken({ req })
//     const pathname = req.nextUrl.pathname
//     const urlOrigin = "http://localhost:3000/"

//     if (pathname.includes('/admin') && !token?.isAdmin) {
//         return NextResponse.redirect(urlOrigin)
//     }

//     if(!pathname.includes('/login') && !pathname.includes('/signup') && !token){
//         return NextResponse.redirect(urlOrigin + 'login')
//     }

//     if((pathname.includes('/login') || pathname.includes('/signup')) && token){
//           return NextResponse.redirect(urlOrigin)
//     } else {
//         return NextResponse.next()
//     }
// }

// export const config = {
//     matcher: ["/create", "/details/((?!general).*)", "/reservations", "/catalog", "/", "/login", "/signup", "/success-page", "/admin/dashboard", "/admin/users", "/admin/reservations", "/admin/listings"]
// }



import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
    const token = await getToken({ req });
    const pathname = req.nextUrl.pathname;
    const urlOrigin = "http://localhost:3000/";

    // Allow access to public pages (no login required)
    if (
        pathname === '/' ||                  // Home page
        pathname === '/catalog' ||            // Catalog page
        pathname === '/login' ||              // Login page
        pathname === '/signup' ||             // Signup page
        pathname === '/success-page'          // Success page
    ) {
        return NextResponse.next();           // No restriction on these pages
    }

    // Redirect non-authenticated users to login page for booking or restricted actions
    if (
        pathname.includes('/create') ||      // Create new listing
        pathname.includes('/details') ||     // View details for booking
        pathname.includes('/reservations') || // Reservations page
        pathname.includes('/dashboard')      // Dashboard
    ) {
        if (!token) {  // User is not logged in
            return NextResponse.redirect(urlOrigin + 'login');  // Redirect to login
        }
    }

    // Admin pages should be restricted to admin users
    if (pathname.includes('/admin') && !token?.isAdmin) {
        return NextResponse.redirect(urlOrigin);  // Redirect non-admin users to homepage
    }

    // If a logged-in user tries to access login or signup, redirect them to homepage
    if ((pathname === '/login' || pathname === '/signup') && token) {
        return NextResponse.redirect(urlOrigin);  // Redirect logged-in users to homepage
    }

    // If none of the conditions match, continue to the requested page
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",                // Home page
        "/catalog",         // Catalog page
        "/login",           // Login page
        "/signup",          // Signup page
        "/success-page",    // Success page
        "/create",          // Create listing page
        "/details/((?!general).*)", // Detail page for booking or any action
        "/reservations",    // Reservations page
        "/dashboard",       // Dashboard page
        "/admin/dashboard", // Admin dashboard
        "/admin/users",     // Admin users page
        "/admin/reservations", // Admin reservations page
        "/admin/listings"   // Admin listings page
    ]
};
