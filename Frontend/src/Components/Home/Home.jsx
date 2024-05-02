import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const textStyling = {
    fontSize: '2.5rem',
    background: 'linear-gradient(to right, cadetblue, green)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  };

const Home = () => {
    
    
    return (
        <div>

<div className="bg-black p-12 justify-center items-center text-center mt-10">
                <h1 className="text-white text-4xl font-serif">Welcome to Smart Builder Tracker</h1>
            </div>
        
            {/* Nav bar */}
          
           
            {/* Hero section */}
            <section id="hero">
                {/* Flex container */}
                <div className="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
                    {/* Left side of container  */}
                    <div className="flex flex-col mb-64 space-y-12  md:w-1/2">
                        <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left mb-0">
                            Simplify construction with <strong className='sbt-heading'> SBT </strong> Your easy solution.
                        </h1>
                        <p className="mx-w-sm text-center font-bold text-blue-950 md:text-left mt-0">
                            Effortlessly manage your construction tasks with our user-friendly tracking system.
                        </p>
                        <div className="flex md:flex-start">
                            <Link to="/get-started" className="p-3 px-6 pt-2 text-white bg-red-950 rounded-full self-baseline hover:bg-red-500">
                                Get Started
                            </Link>
                        </div>
                    </div>
                    {/* Right side of the container (Image) */}
                    <div className="md:w-1/2">
                        <img className="object-cover h-96 mt-0 animate-slideIn	" src="https://images.unsplash.com/photo-1567954970774-58d6aa6c50dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80" alt="Not found" />
                    </div>
                </div>
            </section>
            {/* Features */}
            <section id="features">
                {/* Flex container */}
                <div className="flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row bg-red-950 ">
                    {/* Why choose us part */}
                    <div className="flex flex-col space-y-12 md:w-1/2 text-white mt-16">
                        <h1 className="max-w-md text-4xl font-bold text-center md:text-left md:ml-64">
                            Why choose us?
                        </h1>
                        <p className="md:text-left px-8 py-8 ">
                            Experience the power of live task tracking, ensuring real-time updates on your construction projects. Our dedicated quality assurance team ensures that only top-notch materials are used, guaranteeing the highest standards of excellence. Receive accurate budget estimations tailored to your specific area, ensuring transparency and cost-efficiency. Rest assured with our secure payment methods, providing you peace of mind throughout your construction journey. Join us today to unlock the full potential of your projects with our comprehensive construction tracking services.
                        </p>
                    </div>
                    {/* Our featuers of the APP */}
                    {/* List */}
                    <div className="flex flex-col space-y-8  md:w-1/2 ">
                        {/* Item 1 */}
                        <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row mt-16">
                            <div className="rounded-l-full ">

                                <div className="flex items-center space-x-2">
                                    <div className="px-4 py-2 text-white rounded-full md:py-1 bg-slate-600 ">
                                        01
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold  text-white ">
                                            Construction Tasks Tracking
                                        </h3>
                                        <p className="text-yellow-50">
                                            Effortlessly monitor and manage every aspect of your construction projects with our cutting-edge Construction Tasks Tracking feature. Stay in control of timelines, milestones, and progress with real-time updates. Streamline communication between teams, ensuring seamless coordination.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Item 2 */}
                        <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row mt-16">
                            <div className="rounded-l-full ">

                                <div className="flex items-center space-x-2">
                                    <div className="px-4 py-2 text-white rounded-full md:py-1 bg-slate-600 ">
                                        02
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold  text-white ">
                                            Quality Assurance
                                        </h3>
                                        <p class="text-yellow-50">
                                            Assured Quality: Our dedicated team ensures top-notch materials and craftsmanship,
                                            ensuring your construction projects meet the highest standards of excellence.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Item 3 */}
                        <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row mt-16">
                            <div className="rounded-l-full ">

                                <div className="flex items-center space-x-2">
                                    <div className="px-4 py-2 text-white rounded-full md:py-1 bg-slate-600 ">
                                        03
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold  text-white ">
                                            Budget estimation
                                        </h3>
                                        <p className="text-yellow-50 mb-7">
                                            Accurate Budget Estimation: Get precise cost forecasts tailored to your project's
                                            unique requirements. Make informed decisions and stay on track with confidence.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Know more about our services */}
            <section id="services" className="bg-orange-950 ">
                {/* Flex container */}
                <div className="container flex-col item-center justify-between px-6 py-24 m-auto space-y-12 md:y-12 md:flex-row md:space-y-0">
                    <h2 className="text-5xl font-bold leading-tight font-serif text-center text-white md:text-4xl mb-10 md:max-w-xl md:text-left">
                        Check out our all services here!
                    </h2>
                    <div>
                        <Link to="/services" className="p-3 px-6 pt-2 text-black bg-red-400 rounded-full baseline shadow-2xl hover:bg-red-800">
                            Check our services!
                        </Link>
                    </div>
                </div>
            </section>
            {/* Footer */}
            
        </div>
    );
};

export default Home;
