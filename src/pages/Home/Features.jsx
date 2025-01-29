import React from 'react';
import { FaMapMarkedAlt, FaUserShield, FaLifeRing, FaSuitcaseRolling } from 'react-icons/fa';
import './Features.css';

const features = [
    {
        icon: <FaSuitcaseRolling />,
        title: 'Plan and Save Trips Easily',
        description: 'Organize and save your travel plans effortlessly with our user-friendly tools.'
    },
    {
        icon: <FaMapMarkedAlt />,
        title: 'Curated Destination Recommendations',
        description: 'Discover the best places to visit with our expertly curated recommendations.'
    },
    {
        icon: <FaUserShield />,
        title: 'Find Reliable Local Guides',
        description: 'Connect with trustworthy local guides to enhance your travel experience.'
    },
    {
        icon: <FaLifeRing />,
        title: 'Safety Tips and Emergency Resources',
        description: 'Stay safe with our comprehensive safety tips and emergency resources.'
    }
];

const Features = () => {
    return (
        <section className="features-section">
            <h2>What Makes Us Your Ultimate Travel Companion?</h2>
            <div className="features-grid row">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card col">
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;