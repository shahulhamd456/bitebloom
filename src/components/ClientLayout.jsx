'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import IntroAnimation from './IntroAnimation';
import Header from './Header';
import Footer from './Footer';
import CartSidebar from './CartSidebar';
import useMagnetEffect from '../hooks/useMagnetEffect';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext'; // Import AuthProvider
import { ProductProvider } from '../context/ProductContext';
import AOS from 'aos';

export default function ClientLayout({ children }) {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname(); // Get current path

    // Apply magnet effect
    useMagnetEffect();

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
        });

        // Initialize Bootstrap JS
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    const isAdminOrLogin = pathname.startsWith('/admin') || pathname === '/login';

    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    {!isAdminOrLogin && loading && <IntroAnimation onComplete={() => setLoading(false)} />}
                    <div style={{ visibility: (!isAdminOrLogin && loading) ? 'hidden' : 'visible' }}>
                        {!isAdminOrLogin && <Header />}
                        {!isAdminOrLogin && <CartSidebar />}
                        {children}
                        {!isAdminOrLogin && <Footer />}
                    </div>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
}
