import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { handelError, handelSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { Circles } from "react-loader-spinner"; // Install this package: npm install react-loader-spinner

function AdminResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ password: '', confirmPassword: '' });

    const [isLoading, setIsLoading] = useState(false); // Track loading state

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { password, confirmPassword } = form;

        if (!password || !confirmPassword) {
            return handelError("All fields are required");
        }

        if (password !== confirmPassword) {
            return handelError("Passwords do not match");
        }

        setIsLoading(true); // Show loader

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/adminAuth/admin-reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const result = await response.json();

            if (result.success) {
                handelSuccess(result.message);
                setIsLoading(false); // Hide loader
                setTimeout(() => {
                    navigate('/mainLogin');
                }, 3000)
            } else {
                setIsLoading(false); // Hide loader
                handelError(result.message);
            }
        } catch (error) {
            setIsLoading(false); // Hide loader
            handelError("Internal server error");
        }
    };

    return (
        <div className='flex flex-col bg-[#fff] py-[32px] px-[48px] rounded-[10px] w-[400px] shadow-custom'>
            <h1 className='mb-[20px] text-3xl font-semibold'>Reset Password</h1>
            <form className='flex flex-col gap-[10px] ' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label className='text-[20px]' htmlFor="password">New Password</label>
                    <input
                        className='w-full text-[18px] p-[10px] outline-none border-b-2 border-black placeholder:text-[15px] placeholder:italic'
                        type="password"
                        name="password"
                        placeholder="Enter new password..."
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-[20px]' htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className='w-full text-[18px] p-[10px] outline-none border-b-2 border-black placeholder:text-[15px] placeholder:italic'
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password..."
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button className='bg-purple-900 border-none text-[20px] text-white rounded-[6px] p-[8px] cursor-pointer my-auto mx-0'>
                    Submit
                </button>
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

export default AdminResetPassword;
