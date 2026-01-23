'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading user state
    const router = useRouter();

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); // Set loading to false after check
    }, []);

    const login = (role, password = '') => {
        if (role === 'admin' && password !== 'admin123') {
            return { success: false, message: 'Invalid Admin Password' };
        }

        const newUser = { name: 'Shahul Hameed', role };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));

        if (role === 'admin') {
            router.push('/admin');
        } else {
            router.push('/');
        }
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
