import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handelError, handelSuccess } from '../utils';
import student from "../assets/Login/student.png";
import emailIcon from "../assets/Login/email.png"
import NavbarSimple from "../components/NavbarSimple";
import logo from "../assets/Login/idea_lab 1.png";
import { Circles } from "react-loader-spinner"; // Install this package: npm install react-loader-spinner

function StudentForgotPassword() {
    const handleOpenOverlay = () => setOverlayOpen(true);
    const handleCloseOverlay = () => setOverlayOpen(false);

    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false); // Track loading state

    const navigate = useNavigate(); //This function helps to not refresh while switching the links


    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            return handelError('Email is required');
        }

        setIsLoading(true); // Show loader

        try {
            const url = `${import.meta.env.VITE_API_URL}/studentAuth/student-forgot-password`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();
            const { success, message } = result;

            if (success) {
                setIsLoading(false); // Hide loader
                handelSuccess(message);
            } else {
                setIsLoading(false); // Hide loader
                handelError(message);
            }
        } catch (error) {
            setIsLoading(false); // Hide loader
            handelError('Internal server error');
        }
    };

    return (
        <div className="font-poppins h-screen w-screen overflow-hidden relative">

            {/* Main Container */}
            <div className="absolute top-0 left-0 flex w-full h-full">

                {/* Left Section */}
                <div className="w-full h-screen flex flex-col justify-center items-center bg-white  md:w-1/2 md:h-full md:bg-[#d7e5f0]">
                    <div className="w-full flex flex-col  justify-center items-center max-w-[400px] text-center md:mt-[210px] lg:mt-[210px] xl:mt-[-10px]">
                        <div className="w-full md:hidden">
                            <NavbarSimple handleOpenOverlay={handleOpenOverlay} />
                            <div className="pt-10 flex justify-center">
                                <img className="w-[50px] " src={logo} alt="Logo" />
                            </div>
                        </div>
                        {/* Welcome Text */}
                        <p className="font-semibold text-[25px] p-3">Please enter you email.</p>

                        {/* Form Section */}
                        <div className="relative w-max-[80%] w-[310px]  h-[410px] md:w-[350px] xl:h-auto ">
                            <form className="flex flex-col space-y-4" onSubmit={handleForgotPassword}>
                                {/* Email Input */}
                                <div className="relative top-3">
                                    <input
                                        onChange={handleChange}
                                        type="email"
                                        name="email"
                                        className="w-full border p-3 rounded-[10px] bg-custom-gray-200 text-black shadow-custom-dark-500 md:bg-custom-gray-100 md:p-4"
                                        placeholder="Email"
                                        value={email}
                                    />
                                    <img
                                        src={emailIcon}
                                        alt="Email Icon"
                                        className="absolute top-1/2 right-4 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
                                    />
                                </div>

                                <br />
                                {/* Login Button */}
                                <button
                                    type="submit"
                                    className="text-white bg-custom-blue-100 h-[50px] py-2 rounded-lg text-center shadow-custom-dark-500 hover:bg-custom-blue-200 transition md:h-[55px]"
                                >
                                    Continue
                                </button>

                                {/* Sign-Up Prompt */}
                                <p className="text-center text-sm">
                                    Remembered password?{" "}
                                    <Link to="/mainLogin" className="text-custom-blue-100 font-semibold hover:underline">
                                        Login
                                    </Link>
                                </p>
                            </form>

                            {/* Show loader */}
                            {isLoading && (
                                <div className="flex justify-center items-center mt-[20px]">
                                    <Circles
                                        height="50"
                                        width="50"
                                        color="#6B46C1"
                                        ariaLabel="loading"
                                    />
                                </div>
                            )}

                        </div>
                    </div>
                </div>


                {/* Right Section */}
                <div className="w-full bg-white z-10 p-5 hidden md:flex md:flex-col md:w-1/2">
                    <NavbarSimple handleOpenOverlay={handleOpenOverlay} />

                    {/* Student/Teacher Image */}
                    <div className=" flex flex-col pl-5 pb-14 h-screen justify-center items-center">
                        <img
                            className={`sm:w-full lg:w-[500px] h-auto transition-all duration-700 ease-in-out`}
                            src={student}
                            alt="Student Image"
                        />
                    </div>
                </div>

            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default StudentForgotPassword;
