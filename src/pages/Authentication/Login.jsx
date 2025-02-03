import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authentication.css';
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5555";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password };
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); //save the JWT token in local storage
                localStorage.setItem('user', JSON.stringify(data.user)); //save the user object in local storage
                if (data.user.role_id === 1) {
                    navigate('/admin'); //redirect to the admin page
                    return;
                } else if (data.user.role_id === 2) {
                    navigate('/'); //redirect to the home page
                } else {
                    setResponseMessage(data.error || 'An error occurred.');
                }
            } else {
                setResponseMessage(data.error || 'An error occurred.');
            }
        } catch (error) {
            setResponseMessage('Error connecting to the server.');
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <p>Welcome back!</p>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {responseMessage && <p className="error">{responseMessage}</p>}
            </form>
        </div>
    );
};

export default Login;