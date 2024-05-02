import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import CustomerApp from './Pages/CustomerApp';
import SupervisorApp from './Pages/SupervisorApp';
import MainApp from './Pages/MainApp';
import { UserProvider } from './context/UserContext';
import About from './Components/Home/About';
import Budget from './OurServices/Budget';
import Quality from './OurServices/Quality';
import BookApp from './OurServices/BookApp';
import Services from './OurServices/Services';
import Navbar from './Components/NavBar/Navbar';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Budget" element={<Budget />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/book" element={<BookApp />} />
        <Route path="/services" element={<Services />} />
        <Route path='/*' element={<MainApp />} />
        <Route path='/customer/*' element={<CustomerApp />} />
        <Route path='/supervisor/*' element={<SupervisorApp />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App;
