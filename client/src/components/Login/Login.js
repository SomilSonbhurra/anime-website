// Enhanced LoginModal with Naruto character animation on email input

import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Login.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';


export default function Login({ onClose, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const [showNaruto, setShowNaruto] = useState(false);
    const [position, setPosition] = useState(0); // Naruto's X position
    const inputRef = useRef(null);
   const baseURL = process.env.REACT_APP_BACKEND_URL|| 'https://anime-backend-6igl.onrender.com';


    const estimateX = (length) => {
        // Adjust this multiplier based on input width
        return Math.min(length * 10, 260); // Cap at 260px
    };

   const handleLogin = async () => {
    try {
        const res = await axios.post(`${baseURL}/api/auth/login`, {
            email,
            password,
            username,
            age
        });

        // Optional: Show a success message if needed
        alert(res.data?.message || 'Login successful!');

        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        onLoginSuccess(res.data.user);
        onClose();
    } catch (err) {
        console.error(err.response?.data);  // Debug actual error
        const message = err.response?.data?.message || err.response?.data?.error || 'Login failed!';
        alert(message);  // ✅ Show user-friendly error
        setError(message); // Also set in your state if you use it somewhere else
    }
};


    return (
        <div style={overlayStyle}>
            <div style={modalContainerSplit}>
                {/* Left side - Login Form */}
                <div style={formSection}>
                    <div style={{ position: 'relative', marginBottom: '10px' }}>
                        {/* Naruto Character Animation */}
                        <AnimatePresence>
                            {showNaruto && (
                                <motion.img
                                    src="./img/naruto.gif"
                                    alt="Naruto"
                                    animate={{ x: position }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, ease: "easeInOut" }}
                                    style={{
                                        position: 'absolute',
                                        top: '-60px',
                                        width: '50px',
                                        height: '80px',
                                        zIndex: 10,
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Email Input */}
                        <input
                            ref={inputRef}
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                const value = e.target.value;
                                setEmail(value);
                                const isValid = /\S+@\S+\.\S+/.test(value);

                                if (value) {
                                    setShowNaruto(true);
                                    setPosition(isValid ? 260 : estimateX(value.length));
                                } else {
                                    setShowNaruto(false);
                                    setPosition(0);
                                }
                            }}
                            onFocus={() => {
                                if (email && !/\S+@\S+\.\S+/.test(email)) {
                                    setShowNaruto(true);
                                    setPosition(estimateX(email.length));
                                }
                            }}
                            onBlur={() => {
                                if (/\S+@\S+\.\S+/.test(email)) {
                                    setShowNaruto(false);
                                }
                            }}
                            style={{
                                width: '370px',
                                padding: '12px',
                                borderRadius: '8px',
                                fontSize: '16px',
                            }}
                        />

                    </div>


                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
                    <input type="text" placeholder="Username (new user)" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} />
                    <input type="number" placeholder="Age (new user)" value={age} onChange={e => setAge(e.target.value)} style={inputStyle} />
                    {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

                    <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                        <button onClick={handleLogin} style={loginButtonStyle}>Login</button>
                        <button onClick={onClose} style={cancelButtonStyle}>Cancel</button>
                    </div>
                </div>

                {/* Right side - Image */}
                <div style={imageSection}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0 15px 15px 0',
                        padding: '20px',
                        textAlign: 'center',
                    }}>
                        <img
                            src="./img/luffy.gif"
                            alt="Hello Character"
                            style={{
                                width: '80%',
                                maxHeight: '250px',
                                objectFit: 'contain',
                                marginBottom: '10px'
                            }}
                        />
                        <h3 style={{ color: '#333' }}>👋 Hello there!</h3>
                        <p style={{ color: '#666', fontSize: '14px' }}>Welcome back, ninja!</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

const overlayStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    backdropFilter: 'blur(8px)',       // 🔁 ADD THIS LINE
    WebkitBackdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px'
};

const modalContainerSplit = {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    maxWidth: '800px',
    height: '500px',
    backgroundColor: '#111',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 0 20px rgba(0,0,0,0.6)'
};

const formSection = {
    flex: 1,
    padding: '30px',
    backgroundColor: 'transparent',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
};

const imageSection = {
    flex: 1,
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const inputStyle = {
    margin: '6px 0',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #444',
    background: 'rgba(255, 255, 255, 0.85)',
    color: '#222',
    fontSize: '14px',
    width: '100%'
};

const loginButtonStyle = {
    flex: 1,
    padding: '10px',
    backgroundColor: '#ff5252',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
};

const cancelButtonStyle = {
    flex: 1,
    padding: '10px',
    backgroundColor: '#888',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
};
