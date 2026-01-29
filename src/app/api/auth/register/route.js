import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        await dbConnect();
        const { username, email, password, role } = await request.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'user' // Allow specifying role for initial setup, otherwise default to user
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: error.message || 'Registration failed' },
            { status: 500 }
        );
    }
}
