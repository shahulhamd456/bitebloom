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

        // If user is logged in
        if (user?.role === 'admin') {
            // Admin Logic
            // If trying to go to User Login or Admin Login -> Redirect to Dashboard
            if (pathname === '/login' || pathname === '/admin/login') {
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            }
        } else {
            // Normal User Logic
            // If trying to go to Admin pages (EXCEPT Admin Login) -> Redirect to Home
            // We verify it's NOT /admin/login (ignoring trailing slash)
            const isAdminLogin = pathname === '/admin/login' || pathname === '/admin/login/';

            if (pathname.startsWith('/admin') && !isAdminLogin) {
                return NextResponse.redirect(new URL('/', request.url));
            }

            // If already logged in and going to /login -> Home
            if (pathname === '/login') {
                return NextResponse.redirect(new URL('/', request.url));
            }
        }

        // Protect Admin Routes (Secondary check)
        const isAdminLogin = pathname === '/admin/login' || pathname === '/admin/login/';
        if (adminPaths.some(path => pathname.startsWith(path)) && !isAdminLogin) {
            if (user?.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url));
            }
        }
    } else {
        // If user is NOT logged in

        // Protect Admin Routes
        // If accessing /admin/login -> Allow
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        // If accessing other /admin/* -> Redirect to /admin/login
        if (pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // If accessing protected User routes (optional, usually /profile etc)
        // For now preventing access to nothing else specific for users except what was there.
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login', '/register', '/admin/login'],
};
