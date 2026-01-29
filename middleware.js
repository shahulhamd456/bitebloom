import { NextResponse } from 'next/server';


// Note: Next.js Middleware runs in Edge Runtime where 'jsonwebtoken' is not fully supported.
// We'll use a simple decoding approach if possible or 'jose' if we had it.
// For now, let's try to just check existence of cookie, and rely on API to verify validity for critical actions.
// Ideally, we should verify the token signature here.

export function middleware(request) {
    const token = request.cookies.get('auth_token')?.value;
    const { pathname } = request.nextUrl;

    // Paths that require authentication
    const adminPaths = ['/admin'];
    const authPaths = ['/login', '/register'];

    // Helper to decode JWT payload without verification (verification happens on backend APIs usually, 
    // or we need 'jose' lib for edge runtime verification).
    // For middleware routing, checking existence and role from payload is often a "good enough" first line of defense.
    function parseJwt(token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }

    if (token) {
        const user = parseJwt(token);

        // If user is logged in, prevent access to login/register pages
        if (authPaths.some(path => pathname.startsWith(path))) {
            if (user?.role === 'admin') {
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            } else {
                return NextResponse.redirect(new URL('/', request.url));
            }
        }

        // Protect Admin Routes
        if (adminPaths.some(path => pathname.startsWith(path))) {
            if (user?.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url));
            }
        }
    } else {
        // If user is NOT logged in

        // Protect Admin Routes - redirect to login
        if (adminPaths.some(path => pathname.startsWith(path))) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login', '/register', '/'],
};
