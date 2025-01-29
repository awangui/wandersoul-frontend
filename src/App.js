import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./pages/Home/Hero";
import Features from "./pages/Home/Features";
import Benefits from "./pages/Home/Benefits";
import Reviews from "./pages/Home/Reviews";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/Sign-up";
import About from "./pages/About";
import Destinations from "./pages/Destination/Destinations"
import Footer from "./components/layout/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>

    <Navbar />
    
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/destinations" element={<Destinations/>}/>
      <Route path="/" element={
        <>
          <Hero />
          <div className="container">
            <Features />
            <Benefits />
            <Reviews />
            <h1>Destinations</h1>
            <button className="btn">Load Destinations</button>
          </div>
        </>
      } />
    </Routes>
    <Footer />
    </Router>
  );
}

export default App;