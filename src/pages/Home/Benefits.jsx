import React from 'react';
import './Benefits.css';

const Benefits = () => {
    return (
        <section className="benefits-section">
            <h2>Why Choose Us?</h2>
            <ul className="benefits-list d-flex justify-content-between">
                <li className='benefit' >
                    <h3>Travel with Confidence</h3>
                    <p>Feel safe with reliable guides and expert tips.</p>
                </li>
                <li className='benefit' >
                    <h3>Stress-Free Planning</h3>
                    <p>Tailored recommendations save you time.</p>
                </li>
                <li className='benefit' >
                    <h3>Authentic Experiences</h3>
                    <p>Connect with trusted local guides for unique adventures.</p>
                </li>
            </ul>
        </section>
    );
};

export default Benefits;