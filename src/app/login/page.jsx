'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../css/global.css';

import { useSearchParams } from 'next/navigation';

const LoginPage = () => {
    const { login } = useAuth();
    const searchParams = useSearchParams();

    // Check if we should default to register mode and/or admin role
    const initialRegister = searchParams.get('mode') === 'register';
    const initialRole = searchParams.get('role') === 'admin' ? 'admin' : 'user';

    const [isRegister, setIsRegister] = useState(initialRegister);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: initialRole
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
            if (isRegister) {
                // Register
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || 'Registration failed');

                // Auto login after register
                const loginRes = await login('user', formData.password, formData.email);
                if (!loginRes.success) throw new Error(loginRes.message);

            } else {
                // Login
                // Explicitly pass 'user' role requirement to context if we want to enforce it there, 
                // AND/OR rely on the context to redirect users to '/'.
                const loginRes = await login('user', formData.password, formData.email || formData.username);
                if (!loginRes.success) throw new Error(loginRes.message);
            }
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
            backgroundColor: '#FFFDD0'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%'
            }}>
                <h1 style={{ fontFamily: '"Cookie", cursive', color: '#DF7E5D', fontSize: '50px', marginBottom: '10px' }}>
                    {isRegister ? 'Join Us' : 'Welcome Back'}
                </h1>

                {error && <div style={{ color: '#D1293D', marginBottom: '15px', fontSize: '14px', fontWeight: '600' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    {isRegister && (
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    )}

                    <input
                        type="email" // Accept email only
                        name="email"
                        placeholder="Email Address"
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
                            backgroundColor: '#DF7E5D', // Brand Orange for User
                            color: 'white',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            fontWeight: 'bold'
                        }}
                    >
                        {loading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
                    </button>

                    {isRegister && (
                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                            <input
                                type="checkbox"
                                id="adminCheck"
                                checked={formData.role === 'admin'}
                                onChange={(e) => setFormData({ ...formData, role: e.target.checked ? 'admin' : 'user' })}
                            />
                            <label htmlFor="adminCheck" style={{ fontSize: '14px', color: '#666' }}>Register as Admin</label>
                        </div>
                    )}
                </form>

                <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                    {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <span
                        onClick={() => setIsRegister(!isRegister)}
                        style={{ color: '#DF7E5D', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        {isRegister ? 'Login' : 'Sign Up'}
                    </span>
                </p>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '12px 20px',
    borderRadius: '50px',
    border: '2px solid #EEE',
    outline: 'none',
    fontFamily: 'Inter, sans-serif'
};

export default LoginPage;
