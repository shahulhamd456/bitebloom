import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        await dbConnect();
        const { email, password } = await request.json(); // We'll accept email/password, or username/password if you prefer. Using email as primary.

        // Allow login with username OR email for flexibility
        // But for simplicity in this code, let's assume the frontend sends 'email' (which could be the username string)
        const isEmail = email.includes('@');
        const query = isEmail ? { email } : { username: email };

        // Check for user
        const user = await User.findOne(query).select('+password');

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create token
        const token = jwt.sign(
            { id: user._id, role: user.role, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Create response with cookie
        const response = NextResponse.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 1 day
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}
