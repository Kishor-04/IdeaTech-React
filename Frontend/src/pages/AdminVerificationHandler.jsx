import React, { useEffect, useState } from 'react';
import { handelError, handelSuccess } from '../utils';
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavbarSimple from "../components/NavbarSimple";
import logo from "../assets/Login/idea_lab 1.png";
import { Circles } from "react-loader-spinner"; // Install this package: npm install react-loader-spinner

function AdminVerificationHandler() {
  const { token } = useParams();
  const navigate = useNavigate();
  const handleOpenOverlay = () => setOverlayOpen(true);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {

      setIsLoading(true); // Show loader

      try {
        const url = `${import.meta.env.VITE_API_URL}/adminAuth/admin-verify-email/${token}`;
        const response = await fetch(url, {
          method: 'GET',
        });

        const result = await response.json();

        if (response.ok) {
          const { success, message } = result;

          // Delay response handling by 1 second
          setTimeout(() => {
            if (success) {
              setIsLoading(false); // Hide loader
              handelSuccess(message);
              setSuccessMessageVisible(true); // Show success message after 1 second
              setTimeout(() => {
                navigate('/mainLogin');
              }, 3000);
            } else {
              setIsLoading(false); // Hide loader
              handelError(message);
            }
          }, 1000);
        } else {
          setTimeout(() => {
            // Handle errors based on the response code after a 1-second delay
            setIsLoading(false); // Hide loader
            handelError(result.message || 'Verification failed');
          }, 1000);
        }
      } catch (error) {
        setTimeout(() => {
          // Handle errors in the catch block after a 1-second delay
          setIsLoading(false); // Hide loader
          handelError('Internal server error');
        }, 1000);
      }

    };

    verifyEmail();
  }, [token, navigate]);


  return (
    <div>
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
              {/* Form Section */}
              <div className="relative w-max-[80%] w-[310px]  h-[410px] md:w-[350px] xl:h-auto ">


                {/* Verifying message */}
                {isLoading && (
                  <div className="text-xl opacity-100 transition-opacity duration-1000">
                    Verifying the Email, please wait...
                  </div>
                )}

                {/* Success message */}
                {successMessageVisible && (
                  <div className="text-xl opacity-100 transition-opacity duration-1000">
                    Congratulations, Email Verified Successfully...
                  </div>
                )}


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

            {/* admin/Teacher Image */}
            <div className=" flex flex-col xl:pl-10 h-screen justify-center items-center">
              <img
                className={`sm:w-full lg:w-[500px] h-auto transition-all duration-700 ease-in-out`}
                src={admin}
                alt="Admin Image"
              />
            </div>
          </div>

        </div>
      </div>

      <ToastContainer></ToastContainer>
    </div>
  )
}

export default AdminVerificationHandler;
