import { Routes, Route } from 'react-router-dom';
import SignupForm from '../Components/Validations/SignupForm';
import NewUser from '../Components/Validations/NewUser';
import Login from '../Components/Validations/Login';
import TrackTasks from '../Tracking/TrackTasks';
import Services from '../OurServices/Services';
import BookApp from '../OurServices/BookApp';
import Quality from '../OurServices/Quality';
import Budget from '../OurServices/Budget';
import About from '../Components/Home/About';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/NavBar/Navbar';
import Home from '../Components/Home/Home';
import { useUserContext } from "../context/UserContext";
import { useState } from "react";

function MainApp() {
    const { userType, setUserType } = useUserContext();
    useState(() => {
        setUserType("main");
    }, [userType])
    return (
        <div>
            <Routes>
                <Route path="/tracktasks" element={<TrackTasks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/newuser" element={<NewUser />} />
                <Route path="/signup" element={<SignupForm title="Sign up for a Supervisor of Construction" experienceLabel="Experience" experiencePlaceholder="Enter your experience" formtype="supervisor" />} />
                <Route path="/signup-customer" element={<SignupForm title="Sign up for a Customer" formtype="customer" />} />
            </Routes>
        </div>
    );
}

export default MainApp;
