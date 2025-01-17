import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handelError, handelSuccess } from '../utils';
import { Circles } from "react-loader-spinner"; // Install this package: npm install react-loader-spinner

function AdminForgotPassword() {

    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false); // Track loading state

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
            const url = `${import.meta.env.VITE_API_URL}/adminAuth/admin-forgot-password`;
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
        <div className='flex flex-col bg-[#fff] py-[32px] px-[48px] rounded-[10px] w-[400px] shadow-custom'>
            <h1 className='mb-[20px] text-3xl font-semibold'>Forgot Password</h1>
            <form className='flex flex-col gap-[10px] ' onSubmit={handleForgotPassword}>
                <div className='flex flex-col'>
                    <label className='text-[20px]' htmlFor="email">Email</label>
                    <input
                        className='w-full text-[18px] p-[10px] outline-none border-b-2 border-black placeholder:text-[15px] placeholder:italic'
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder='Enter your email...'
                        value={email} />
                </div>
                <button className='bg-purple-900 border-none text-[20px] text-white rounded-[6px] p-[8px] cursor-pointer my-auto mx-0'>
                    Submit
                </button>
                <span>Remembered your password? <Link to="/mainLogin">Login</Link></span>
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

            <ToastContainer></ToastContainer>
        </div>
    );
}

export default AdminForgotPassword;
