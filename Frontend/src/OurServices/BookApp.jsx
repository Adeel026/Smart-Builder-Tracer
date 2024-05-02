
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Quality from './Quality';


const BookApp = () => {
    const [showAppointment, setshowAppointment] = useState(false);

    const callAppoinment = () => {
        return (
            <>
                {/* <Link to="/quality">
                <button className='hidden ml-3 md:block p-3 px-6 pt-2 text-black bg-red-200 rounded-full self-baseline hover:bg-red-500 mt-10 mb-10'>
                    Book an Appointment now!
                </button>
            </Link> */}
                <button
                    className='mx-auto md:block p-3 px-6 pt-2 text-black bg-red-200 rounded-full self-baseline hover:bg-red-500 mt-10 mb-10 sm:mx-auto'
                    onClick={() => setshowAppointment(true)}
                >
                    Book an Appointment now!
                </button>
            </>
        )
    }

    return (
        <div >
            <div className='mb-7 mt-10'>
                {/* <Quality /> */}
                
                {showAppointment && <Quality />} {/* Show Quality component based on state */}
            </div>

            <section id="features " >
                {/* Flex container */}
                <div className="flex flex-col px-4 mx-auto  space-y-12 md:space-y-0 md:flex-row bg-red-950 mt-16 ">
                    {/* Why choose us part */}
                    <div className="flex flex-col space-y-12 md:w-1/2 text-white mt-64 shadow-xl  md:mb-80">
                        <h1 className="max-w-md text-4xl font-bold text-center md:text-left md:ml-64">
                            What is Quality Assurance Team?
                        </h1>
                        <p className="md:text-left px-8 py-8 ">
                            Our specialized Quality Assurance Team conducts thorough assessments of construction materials. They meticulously evaluate each material's suitability, ensuring only the best components are used. From foundation to finishing touches, our team scrutinizes every element to guarantee structural integrity and longevity. With a strong focus on material quality, we ensure your project is built to endure and exceed expectations. Trust our material inspection expertise for construction that stands the test of time.
                        </p>
                    </div>
                    {/* Our featuers of the APP */}
                    {/* List */}
                    <div className="flex flex-col space-y-8 md:w-1/2">
                        {/* Item 1 */}
                        <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row mt-16 md:ml-14">
                            <div className="rounded-l-full">
                                <div className="flex items-center flex-col md:flex-row space-x-2 shadow-2xl md:mt-60">
                                    <div className="">
                                        <h1 className="ml-3 items-center font-bold text-white text-3xl md:text-4xl">
                                            How to book an Appointment with our team?
                                        </h1>
                                        <p className="ml-3 text-yellow-50 mt-6 md:mt-12 font-serif text-sm md:text-base">
                                            You can always call us to book your appointment at +92-xxx-xxx-xx or you can book it online below.
                                        </p>
                                        <div className="mt-4 md:mt-6">
                                        {/* Call appointment button and function is called */}
                                            {callAppoinment()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>

    );
}

export default BookApp;
