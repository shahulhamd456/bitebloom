'use client';

import React from 'react';

import { useProducts } from '../../context/ProductContext';

// Icons
const TrendUp = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const UserIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const BagIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>;

export default function AdminDashboard() {
    const { products } = useProducts();

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '30px', fontFamily: 'Inter, sans-serif' }}>

            {/* Left Column (Sales & Stats) */}
            <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '30px' }}>

                {/* Row 1: Sales & Orders */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>

                    {/* Total Sales Card (Gradient) */}
                    <div style={{
                        background: 'linear-gradient(135deg, #734F96 0%, #DF7E5D 100%)',
                        borderRadius: '24px',
                        padding: '30px',
                        color: 'white',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '220px',
                        boxShadow: '0 10px 30px rgba(115, 79, 150, 0.3)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </div>
                            <div style={{ background: '#FFFDD0', color: '#734F96', padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <TrendUp /> +12.5%
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '5px' }}>Total Sales</div>
                            <div style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: '"Cookie", cursive', letterSpacing: '1px' }}>$612,917</div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <StatWidget
                            icon={<BagIcon />}
                            label="Total Orders"
                            value="34,760"
                            trend="+23%"
                            trendColor="#4CAF50"
                        />
                        <StatWidget
                            icon={<UserIcon />}
                            label="Total Visitors"
                            value="14,987"
                            trend="-5%"
                            trendColor="#FF5252"
                        />
                    </div>
                </div>

                {/* Row 2: Customer Habits Chart */}
                <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 5px 20px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>Customer Habits</h3>
                        <select style={{ border: 'none', color: '#999', fontSize: '14px', outline: 'none' }}>
                            <option>This Year</option>
                        </select>
                    </div>

                    {/* CSS Bar Chart Mock */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', paddingBottom: '20px' }}>
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((month, i) => (
                            <div key={month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%' }}>
                                <div style={{
                                    width: '12px',
                                    height: `${[40, 70, 50, 90, 60, 80, 50, 75][i]}%`,
                                    backgroundColor: i === 3 ? '#333' : '#E0E0E0',
                                    borderRadius: '10px',
                                    position: 'relative',
                                    transition: 'height 1s ease'
                                }}>
                                    {i === 3 && (
                                        <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', background: '#333', color: 'white', padding: '5px 10px', borderRadius: '8px', fontSize: '10px', whiteSpace: 'nowrap' }}>
                                            High: 90k
                                        </div>
                                    )}
                                </div>
                                <span style={{ fontSize: '12px', color: '#999' }}>{month}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Right Column (Product Stats) */}
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '30px' }}>

                {/* Product Statistics */}
                <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 5px 20px rgba(0,0,0,0.02)', flex: 1 }}>
                    <h3 style={{ margin: '0 0 30px', fontSize: '18px', color: '#333' }}>Product Statistic</h3>

                    {/* Donut Chart Mock */}
                    <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 40px' }}>
                        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                            {/* Ring 1 - Purple */}
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" strokeWidth="2" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#734F96" strokeWidth="2" strokeDasharray="75, 100" strokeLinecap="round" />

                            {/* Ring 2 - Orange */}
                            <path d="M18 5.0845 a 12.9155 12.9155 0 0 1 0 25.831 a 12.9155 12.9155 0 0 1 0 -25.831" fill="none" stroke="#eee" strokeWidth="2" />
                            <path d="M18 5.0845 a 12.9155 12.9155 0 0 1 0 25.831 a 12.9155 12.9155 0 0 1 0 -25.831" fill="none" stroke="#DF7E5D" strokeWidth="2" strokeDasharray="50, 100" strokeLinecap="round" />
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>9,829</div>
                            <div style={{ fontSize: '12px', color: '#999' }}>Products</div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#734F96' }}></div>
                                Cakes & Cupcakes
                            </div>
                            <span style={{ fontWeight: '600' }}>2,487</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#DF7E5D' }}></div>
                                Breads
                            </div>
                            <span style={{ fontWeight: '600' }}>1,828</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eee' }}></div>
                                Pastries
                            </div>
                            <span style={{ fontWeight: '600' }}>1,463</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

const StatWidget = ({ icon, label, value, trend, trendColor }) => (
    <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.02)', flex: 1 }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: '#F5F6FA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: '13px', color: '#999', marginBottom: '2px' }}>{label}</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>{value}</div>
            </div>
        </div>
        <div style={{ background: `${trendColor}20`, color: trendColor, padding: '4px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: '600' }}>
            {trend}
        </div>
    </div>
);
