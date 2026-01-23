'use client';

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../css/global.css'; // Ensure basic styles are loaded

const LoginPage = () => {
    const { login } = useAuth();

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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <button
                        onClick={() => login('user')}
                        className="button"
                        style={{ width: '100%', borderRadius: '50px', padding: '15px' }}
                    >
                        Login as User
                    </button>
                    <button
                        onClick={() => login('admin')}
                        className="button"
                        style={{
                            width: '100%',
                            borderRadius: '50px',
                            padding: '15px',
                            backgroundColor: '#734F96', // Distinct color for Admin
                            borderColor: '#734F96'
                        }}
                    >
                        Login as Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
