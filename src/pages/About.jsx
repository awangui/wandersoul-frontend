import Features from './Home/Features.jsx';
import './About.css';
function About() {
    return (
        <>
            <div className='about-hero'>
                <h1>About</h1>
                <p>Travel the world with ease</p>
            </div>
            <div className="container">
                <Features />
            </div>
        </>
    );
}
export default About;