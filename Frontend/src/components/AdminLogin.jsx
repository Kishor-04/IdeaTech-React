import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handelError, handelSuccess } from '../utils';
import AdminPic from "../assets/Login/AdminPic.jpg";
import background from "../assets/Login/background.png";
import eyeOff from '../assets/Login/closeEye.png';
import eye from '../assets/Login/openEye.png';

const AdminLogin = ({ isOpen, onClose }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);


    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsAnimating(true), 50); // Small delay to trigger animation
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    const [adminLoginInfo, setAdminLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate(); //This function helps to not refresh while switching the links


    const AdminHandleChange = (e) => {
        const { name, value } = e.target;
        setAdminLoginInfo((prev) => ({ ...prev, [name]: value }));
    };

    const AdminHandleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = adminLoginInfo;
        if (!email || !password) {
            return handelError('Email and password are required');
        }

        try {
            const url = `${import.meta.env.VITE_API_URL}/adminAuth/login`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(adminLoginInfo)
            });

            const result = await response.json();
            const { success, message, jwtToken, name } = result;

            if (success) {
                handelSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('userRole', 'admin'); // Add user type
                setTimeout(() => {
                    navigate('/adminHome');
                }, 1000);
            } else if (!success && message === 'Please verify your email. Verification link sent.') {
                handelError(message);
            } else {
                handelError(message);
            }
        } catch (error) {
            handelError('Failed to connect to the server. Please try again later.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center">
            {/* Close Button */}
            <button
                className="absolute top-5 right-5 text-custom-blue-100 text-[40px]"
                onClick={onClose}
            >
                &times;
            </button>

            {/* Main Container */}
            <div
                className={`bg-white flex w-[900px] h-[500px] rounded-lg shadow-2xl transition-transform duration-500 ease-in-out transform ${isAnimating ? 'scale-110 opacity-100' : 'scale-0 opacity-0'
                    }`}
            >
                {/* Left Image Section */}
                <div className="w-1/2 flex flex-col justify-center items-center">
                    <img
                        src={AdminPic}
                        alt="AdminPic"
                        className="w-96 h-96"
                    />
                </div>

                {/* Right Section */}
                <div className="w-1/2 flex flex-col justify-center items-center relative">
                    <img
                        className="absolute h-full w-full top-0 left-0 z-0 object-cover opacity-70 rounded-r-lg"
                        src={background}
                        alt="background"
                    />
                    <div className="z-10 text-custom-blue-100 text-3xl font-semibold">
                        LOG IN
                    </div>

                    <form className="relative flex flex-col space-y-3 z-10" onSubmit={AdminHandleLogin}>
                        <label className="text-custom-blue-100 text-[15px] pl-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            onChange={AdminHandleChange}
                            type="email"
                            name="email"
                            className="w-full border border-custom-blue-100 px-4 py-1 bg-custom-gray-100"
                            placeholder="Enter Your Email"
                            value={adminLoginInfo.email}
                        />
                        <label className="text-custom-blue-100 text-[15px] pl-1" htmlFor="password">
                            Password
                        </label>
                        <div className="relative w-full">
                            <input
                                onChange={AdminHandleChange}
                                type={type}
                                name="password"
                                className="w-full border border-custom-blue-100 px-4 py-1 bg-custom-gray-100"
                                placeholder="Enter your password..."
                                value={adminLoginInfo.password}
                            />
                            <img
                                src={icon}
                                alt="Toggle Password"
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer w-5 h-5"
                                onClick={handleToggle}
                            />
                        </div>


                        <label className="text-custom-blue-100 text-[15px] pl-2" htmlFor="forget-password">
                            <Link to="/admin-forgot-password">Forget Password?</Link>
                        </label>
                        <button className="text-white bg-custom-blue-100 h-[40px]">
                            Login
                        </button>
                        <p className="text-center p-3 text-white">
                            Don't have an account? <span className="text-custom-blue-100"><Link to="/adminSignup">Signup</Link></span>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminLogin;
