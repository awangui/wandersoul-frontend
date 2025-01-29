import React, { useState } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fname: '',
        sname: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
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
            </form>
        </div>
    );
};

export default SignUp;