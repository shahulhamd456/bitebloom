'use client';

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../css/global.css'; // Ensure basic styles are loaded

const LoginPage = () => {
    const { login } = useAuth();
    const [password, setPassword] = React.useState('');
    const [isAdminMode, setIsAdminMode] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleLogin = (role) => {
        setError('');
        const res = login(role, role === 'admin' ? password : '');
        if (res && !res.success) {
            setError(res.message);
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
                <h1 style={{ fontFamily: '"Cookie", cursive', color: '#DF7E5D', fontSize: '50px', marginBottom: '10px' }}>Welcome Back</h1>
                <p className="ppp" style={{ marginBottom: '30px' }}>Select your role to login</p>

                {error && <div style={{ color: '#D1293D', marginBottom: '15px', fontSize: '14px', fontWeight: '600' }}>{error}</div>}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {!isAdminMode ? (
                        <>
                            <button
                                onClick={() => handleLogin('user')}
                                className="button"
                                style={{ width: '100%', borderRadius: '50px', padding: '15px' }}
                            >
                                Login as User
                            </button>
                            <button
                                onClick={() => setIsAdminMode(true)}
                                className="button"
                                style={{
                                    width: '100%',
                                    borderRadius: '50px',
                                    padding: '15px',
                                    backgroundColor: '#734F96',
                                    borderColor: '#734F96'
                                }}
                            >
                                Login as Admin
                            </button>
                        </>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input
                                type="password"
                                placeholder="Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 20px',
                                    borderRadius: '50px',
                                    border: '2px solid #EEE',
                                    outline: 'none',
                                    fontFamily: 'Inter, sans-serif'
                                }}
                                autoFocus
                            />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => handleLogin('admin')}
                                    className="button"
                                    style={{
                                        flex: 2,
                                        borderRadius: '50px',
                                        padding: '12px',
                                        backgroundColor: '#734F96',
                                        borderColor: '#734F96'
                                    }}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => { setIsAdminMode(false); setError(''); }}
                                    className="button"
                                    style={{
                                        flex: 1,
                                        borderRadius: '50px',
                                        padding: '12px',
                                        backgroundColor: '#fff',
                                        color: '#666',
                                        border: '1px solid #EEE'
                                    }}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
