import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function GET(request) {
    try {
        const auth_token = request.cookies.get('auth_token')?.value;

        if (!auth_token) {
            return NextResponse.json({ user: null });
        }

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(auth_token, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json({ user: null });
        }

        await dbConnect();
        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json({ user: null });
        }

        return NextResponse.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Me API error:', error);
        return NextResponse.json({ user: null }, { status: 500 });
    }
}
