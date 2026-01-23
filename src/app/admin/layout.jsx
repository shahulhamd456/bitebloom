'use client';

import React, { useEffect, Suspense } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSearch from '../../components/AdminSearch';

// Simple SVG Icons
const DashboardIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const LogoutIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const PlusIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const ListIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;

export default function AdminLayout({ children }) {
    const { user, logout, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== 'admin') {
                router.push('/login');
            }
        }
    }, [user, loading, router]);

    if (loading) return null;
    if (!user || user.role !== 'admin') return null;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F6FA', fontFamily: 'Inter, sans-serif' }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                backgroundColor: '#ffffff',
                borderRight: '1px solid #e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflowY: 'auto',
                padding: '30px'
            }}>
                {/* Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '50px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#734F96', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>B</div>
                    <div style={{ fontSize: '24px', fontFamily: '"Cookie", cursive', color: '#333' }}>
                        Bite Bloom
                    </div>
                </div>

                {/* Menu */}
                <div style={{ fontSize: '12px', color: '#999', fontWeight: '600', marginBottom: '15px', letterSpacing: '0.5px' }}>MENU</div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
                    <NavItem href="/admin" icon={<DashboardIcon />} label="Dashboard" active={pathname === '/admin'} />
                    <NavItem href="/admin/products" icon={<ListIcon />} label="Products" active={pathname.startsWith('/admin/products')} />
                    <NavItem href="/admin/offers" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>} label="Offers" active={pathname.startsWith('/admin/offers')} />
                </nav>

                {/* Tools */}
                <div style={{ fontSize: '12px', color: '#999', fontWeight: '600', marginBottom: '15px', letterSpacing: '0.5px' }}>TOOLS</div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <NavItem href="#" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>} label="Settings" />
                    <button onClick={logout} style={{
                        background: 'none', border: 'none', width: '100%',
                        padding: '12px 15px', borderRadius: '12px',
                        display: 'flex', alignItems: 'center', gap: '15px',
                        color: '#666', fontSize: '15px', fontWeight: '500', cursor: 'pointer', textAlign: 'left'
                    }}>
                        <LogoutIcon /> Logout
                    </button>
                </nav>

                {/* Bottom Card */}
                <div style={{ marginTop: 'auto', padding: '20px', backgroundColor: '#333', borderRadius: '20px', color: 'white', textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'white', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Shop Status</div>
                    <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: '15px' }}>Your shop is currently open for orders.</div>
                    <button style={{ backgroundColor: '#DF7E5D', border: 'none', color: 'white', width: '100%', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>View Shop</button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <header style={{ padding: '30px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F5F6FA' }}>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1A1A1A', margin: 0, fontFamily: 'Inter, sans-serif' }}>Dashboard</h1>
                        <p style={{ color: '#666', margin: 0, fontSize: '14px', marginTop: '5px' }}>Here is your daily store overview</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {/* Search Feature: Wrapped in Suspense */}
                        <Suspense fallback={<div style={{ width: '45px', height: '45px', background: '#fff', borderRadius: '50%' }}></div>}>
                            <AdminSearch />
                        </Suspense>

                        {/* Notifications */}
                        <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', color: '#666' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                        </button>

                        {/* Profile */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Admin User</div>
                                <div style={{ fontSize: '11px', color: '#999' }}>Store Manager</div>
                            </div>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#DF7E5D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>A</div>
                        </div>
                    </div>
                </header>

                <main style={{ flex: 1, padding: '0 40px 40px' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}

const NavItem = ({ href, icon, label, active }) => (
    <Link href={href} style={{
        textDecoration: 'none',
        padding: '12px 15px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        fontSize: '15px',
        fontWeight: '500',
        transition: 'all 0.2s',
        backgroundColor: active ? '#734F96' : 'transparent',
        color: active ? '#fff' : '#666',
        boxShadow: active ? '0 5px 15px rgba(115, 79, 150, 0.3)' : 'none'
    }}>
        {icon}
        {label}
    </Link>
);
