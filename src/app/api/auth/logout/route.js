import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = NextResponse.json({
            success: true,
            message: 'Logged out successfully'
        });

        // Clear the cookie
        response.cookies.set('auth_token', '', {
            httpOnly: true,
            expires: new Date(0),
            path: '/',
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: 'Server error during logout' },
            { status: 500 }
        );
    }
}
