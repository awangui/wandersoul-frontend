import React, { useState } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fname: '',
        sname: '',
        email: '',
        password: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newUser = { 
            fname: formData.fname,  // Send as separate fields
            sname: formData.sname,  
            email: formData.email,
            password: formData.password 
        };
    
        try {
            const response = await fetch('http://127.0.0.1:5555/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setResponseMessage('Account created successfully.Please login.');
                setTimeout(() => window.location.href='/login', 2000);
            } else {
                setResponseMessage(data.error || 'An error occurred.');
            }
        } catch (error) {
            setResponseMessage('Error connecting to the server.');
        }
    };    

    return (
        <div className='register'>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <p>Create an account</p>

                <div>
                    <label htmlFor="fname">First Name:</label>
                    <input
                        type="text"
                        id="fname"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sname">Surname:</label>
                    <input
                        type="text"
                        id="sname"
                        name="sname"
                        value={formData.sname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
                <p style={{ color: responseMessage === 'Account created successfully.' ? 'green' : 'red' }}>
                    {responseMessage}
                </p>
            </form>
        </div>
    );
};

export default SignUp;
