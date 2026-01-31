'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check if user is logged in via API on mount
    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Failed to fetch user", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const login = async (role, password, email) => {
        try {
            // For now, if no email provided in UI (Admin only input password), we might need a default admin email or handle it.
            // But the Login UI has "Login as User" button with no inputs, and "Login as Admin" with password.
            // We need to adapt the Login Page to send credentials.

            // Temporary Logic to bridge the gap:
            // If it's a "User" role click (no input), we might need to register a guest or ask for login?
            // The prompt said: "auth for admin and user auth one login page if user redirect to pages if hes is admin redirect to admin page"
            // It implies real authentication. 
            // I will assume for "Login as User" we might need a demo login or actual inputs.
            // Let's UPDATE Request Body to match what we send.

            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.error || 'Login failed' };
            }

            setUser(data.user);

            if (data.user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }

            return { success: true };
        } catch (error) {
            return { success: false, message: 'Network error' };
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
