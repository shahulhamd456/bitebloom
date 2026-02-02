'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Automatically set a mock admin user
    const [user, setUser] = useState({
        id: 'mock-admin-id',
        username: 'Admin',
        email: 'admin@bitebloom.com',
        role: 'admin'
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // No need to fetch user from API anymore

    const login = async (role, password, email) => {
        // Mock login success
        return { success: true };
    };

    const logout = async () => {
        // Mock logout - maybe just do nothing or refresh?
        // For now, we want to stay logged in permanently as requested.
        console.log("Logout disabled as authentication is removed.");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
