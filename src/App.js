import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./pages/Home/Hero";
import Features from "./pages/Home/Features";
import Benefits from "./pages/Home/Benefits";
import Reviews from "./pages/Home/Reviews";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/Sign-up";
import About from "./pages/About";
import Destinations from "./pages/Destination/Destinations"
import DestinationDetail from "./pages/Destination/DestinationDetail"
import Footer from "./components/layout/Footer/Footer";
import AdminDestinations from "./pages/Admin/AdminDestinations";
import Dashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <Router>
       <Navbar />
  <Routes>
  <Route exact path="/destinations" element={<Destinations />} />
  <Route path="/destinations/:id" element={<DestinationDetail />} />
  <Route path="/admin" element={<Dashboard />} />
  <Route path="/about" element={<About />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/admin/destinations" element={<AdminDestinations />} />
  <Route path="/admin/users" element={<Users />} />


  <Route path="/" element={
    <>
      <Hero />
      <div className="container">
        <Benefits />
        <Reviews />
      </div>
    </>
  } />
  </Routes>
    <Footer />
    </Router>
  );
}

export default App;