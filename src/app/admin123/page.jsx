'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../css/global.css';

const AdminLoginPage = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: 'admin123', // Admin might use username or email
        password: 'admin123'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Login using context
            // We expect the context to return the user so we can check role
            const loginRes = await login('admin', formData.password, formData.email);

            if (!loginRes.success) {
                throw new Error(loginRes.message);
            }

            // Context handles redirect, but let's ensure we are admin
            // (The API/Context should ideally check this, but we'll add a check here if context allows)

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1a1a1a' // Darker background for Admin
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%'
            }}>
                <h1 style={{ fontFamily: '"Cookie", cursive', color: '#734F96', fontSize: '50px', marginBottom: '10px' }}>
                    Admin Portal
                </h1>

                {error && <div style={{ color: '#D1293D', marginBottom: '15px', fontSize: '14px', fontWeight: '600' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <input
                        type="text"
                        name="email"
                        placeholder="Admin Email / Username"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="button"
                        style={{
                            width: '100%',
                            borderRadius: '50px',
                            padding: '15px',
                            backgroundColor: '#734F96', // Purple for Admin
                            color: 'white',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            fontWeight: 'bold'
                        }}
                    >
                        {loading ? 'Authenticating...' : 'Login as Admin'}
                    </button>
                </form>

                <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                    Need an admin account?{' '}
                    <a href="/login?mode=register&role=admin" style={{ color: '#734F96', fontWeight: 'bold', textDecoration: 'none' }}>
                        Register here as Admin
                    </a>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '12px 20px',
    borderRadius: '50px',
    border: '2px solid #ddd',
    outline: 'none',
    fontFamily: 'Inter, sans-serif'
};

export default AdminLoginPage;
