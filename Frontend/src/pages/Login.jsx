import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handelError, handelSuccess } from '../utils';
import eyeOff from '../assets/Login/closeEye.png';
import eye from '../assets/Login/openEye.png';
import AdminLogin from "../components/AdminLogin";
import student from "../assets/Login/student.png";
import teacher from "../assets/Login/teacher.png";
import email from "../assets/Login/email.png"
import NavbarAdmin from "../components/NavbarAdmin";
import logo from "../assets/Login/idea_lab 1.png";
import { Circles } from "react-loader-spinner"; // Install this package: npm install react-loader-spinner

function Login() {

    const [isOverlayOpen, setOverlayOpen] = useState(false);

    const handleOpenOverlay = () => setOverlayOpen(true);
    const handleCloseOverlay = () => setOverlayOpen(false);

    const [isLoading, setIsLoading] = useState(false); // Track loading state

    const [isStudent, setIsStudent] = useState(true); // Toggle state: true -> Student, false -> Teacher

    const [studentLoginInfo, setStudentLoginInfo] = useState({
        email: '',
        password: ''
    })

    const [teacherLoginInfo, setTeacherLoginInfo] = useState({
        email: '',
        password: ''
    })

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const navigate = useNavigate(); //This function helps to not refresh while switching the links

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }

    const studentHandleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        const copyLoginInfo = { ...studentLoginInfo };
        console.log(copyLoginInfo);
        copyLoginInfo[name] = value;
        setStudentLoginInfo(copyLoginInfo);

    }

    const studentHandleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = studentLoginInfo;
        if (!email || !password) {
            return handelError('Email and Password are required')
        }

        setIsLoading(true); // Show loader

        try {
            const url = `${import.meta.env.VITE_API_URL}/studentAuth/login`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentLoginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name } = result;

            if (success) {
                handelSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('userRole', 'student'); // Add user type
                setIsLoading(false); // Hide loader
                setTimeout(() => {
                    navigate('/studentHome')
                }, 2000)
            } else if (!success && message === 'Please verify your email. Verification link sent.') {
                handelError(message);
                setIsLoading(false); // Hide loader       
            } else {
                handelError(message);
                setIsLoading(false); // Hide loader
            }
            console.log(result);
        } catch (error) {
            handelError('Failed to connect to the server. Please try again later.');
            console.error('Login error:', error);
            setIsLoading(false); // Hide loader
        }
    }

    const teacherHandleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        const copyLoginInfo = { ...teacherLoginInfo };
        console.log(copyLoginInfo);
        copyLoginInfo[name] = value;
        setTeacherLoginInfo(copyLoginInfo);

    }

    const teacherHandleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = teacherLoginInfo;
        if (!email || !password) {
            return handelError('email and password are required')
        }

        setIsLoading(true); // Show loader

        try {
            const url = `${import.meta.env.VITE_API_URL}/teacherAuth/login`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(teacherLoginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name } = result;

            if (success) {
                handelSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('userRole', 'teacher'); // Add user type
                setIsLoading(false); // Hide loader
                setTimeout(() => {
                    navigate('/teacherHome')
                }, 2000)
            } else if (!success && message === 'Please verify your email. Verification link sent.') {
                handelError(message);
                setIsLoading(false); // Hide loader
            } else {
                handelError(message);
                setIsLoading(false); // Hide loader
            }
            console.log(result);
        } catch (error) {
            handelError('Failed to connect to the server. Please try again later.');
            console.error('Login error:', error);
            setIsLoading(false); // Hide loader
        }
    }

    return (
        <div className="font-montserrat h-screen w-screen overflow-hidden relative">

            {/* Main Container */}
            <div className="absolute top-0 left-0 flex w-full h-full">

                {/* Left Section */}
                <div className="w-full h-screen flex flex-col justify-center items-center bg-white  md:w-1/2 md:h-full md:bg-[#d7e5f0]">
                    <div className="w-full flex flex-col justify-center items-center max-w-[400px] text-center md:mt-[160px] lg:mt-[160px] xl:mt-[-250px]">
                        <div className="w-full md:hidden">
                            <NavbarAdmin handleOpenOverlay={handleOpenOverlay} />
                            <div className="pt-10 flex justify-center">
                                <img className="w-[50px] " src={logo} alt="Logo" />
                            </div>
                        </div>
                        {/* Welcome Text */}
                        <p className="font-semibold text-[30px] p-6">Welcome back!</p>

                        {/* Toggle Section */}
                        <div className="flex items-center justify-between w-[310px] h-[55px] shadow-custom-dark-500 bg-gray-100 rounded-[12px] p-1 relative md:h-[60px] md:rounded-[15px] md:w-[350px] ">
                            {/* Highlight Slider */}
                            <div
                                className={`absolute w-[50%] h-[48px] bg-white rounded-[10px] m-[-1px] shadow-custom-dark-400 transition-transform duration-300 md:h-[54px] md:rounded-[12px]  ${isStudent ? "translate-x-0" : "translate-x-[96%]"
                                    } `}

                            ></div>

                            {/* Student Button */}
                            <button
                                onClick={() => setIsStudent(true)}
                                className={`flex-1 text-center font-bold p-[12px] text-[15px] rounded-full z-10 transition-colors duration-300 sm:text-md ${isStudent ? "text-black" : "text-gray-400"
                                    }`}
                            >
                                Student
                            </button>

                            {/* Teacher Button */}
                            <button
                                onClick={() => setIsStudent(false)}
                                className={`flex-1 text-center font-bold p-[12px] text-[15px] rounded-full z-10 transition-colors duration-300 sm:text-md ${isStudent ? "text-gray-400" : "text-black"
                                    }`}
                            >
                                Teacher
                            </button>
                        </div>

                        {/* Form Section */}
                        <div className="relative w-max-[80%] w-[360px]  h-[410px] md:w-[400px] xl:h-auto ">
                            {/* Student Login Form */}
                            <div
                                className={`absolute left-0 w-full h-[330px] p-6 rounded-b-[50px] transition-transform duration-700 ease-in-out ${isStudent ? "translate-x-0" : "translate-x-[250%]"
                                    }`}
                            >
                                <form className="flex flex-col space-y-4" onSubmit={studentHandleLogin}>
                                    {/* Email Input */}
                                    <div className="relative">
                                        <input
                                            onChange={studentHandleChange}
                                            type="email"
                                            name="email"
                                            className="w-full border p-3  rounded-[10px] bg-custom-gray-200 text-black shadow-custom-dark-500 md:bg-custom-gray-100 md:p-4"
                                            placeholder="Email"
                                            value={studentLoginInfo.email}
                                        />
                                        <img
                                            src={email}
                                            alt="Email Icon"
                                            className="absolute top-1/2 right-4 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
                                        />
                                    </div>

                                    {/* Password Input */}
                                    <div className="relative bottom-[-8px]">
                                        <input
                                            onChange={studentHandleChange}
                                            type={type}
                                            name="password"
                                            className="w-full border p-3 rounded-[10px] bg-custom-gray-200 text-black shadow-custom-dark-500 md:bg-custom-gray-100 md:p-4"
                                            placeholder="Password"
                                            value={studentLoginInfo.password}
                                        />
                                        <img
                                            src={icon}
                                            alt="Toggle Password Visibility"
                                            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer w-5 h-5 md:w-6 md:h-6"
                                            onClick={handleToggle}
                                        />
                                    </div>

                                    {/* Forgot Password */}
                                    <div className="flex justify-end">
                                        <Link
                                            to="/student-forgot-password"
                                            className="text-black font-semibold text-[12px] underline"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    {/* Login Button */}
                                    <button
                                        type="submit"
                                        className="text-white bg-custom-blue-100 h-[50px] py-2 rounded-lg text-center shadow-custom-dark-500 hover:bg-custom-blue-200 transition md:h-[55px]"
                                    >
                                        Login
                                    </button>

                                    {/* Sign-Up Prompt */}
                                    <p className="text-center text-sm">
                                        Don't have an account?{" "}
                                        <Link to="/mainSignup" className="text-custom-blue-100 font-semibold hover:underline">
                                            Sign up
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

                            {/* Teacher Login Form */}
                            <div
                                className={`absolute left-0 w-full h-[330px] p-6 rounded-b-[50px] transition-transform duration-700 ease-in-out ${!isStudent ? "translate-x-0" : "-translate-x-[250%]"
                                    }`}
                            >
                                <form className="flex flex-col space-y-4" onSubmit={teacherHandleLogin}>
                                    {/* Email Input */}
                                    <div className="relative">
                                        <input
                                            type="email"
                                            className="w-full border p-3 rounded-[10px] bg-custom-gray-200 text-black shadow-custom-dark-500 md:bg-custom-gray-100 md:p-4"
                                            onChange={teacherHandleChange}
                                            name="email"
                                            placeholder="Email"
                                            value={teacherLoginInfo.email}
                                        />
                                        <img
                                            src={email}
                                            alt="Email Icon"
                                            className="absolute top-1/2 right-4 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
                                        />
                                    </div>

                                    {/* Password Input */}
                                    <div className="relative bottom-[-8px]">
                                        <input
                                            type={type}
                                            name="password"
                                            className="w-full border p-3 rounded-[10px] bg-custom-gray-200 text-black shadow-custom-dark-500 md:bg-custom-gray-100 md:p-4"
                                            placeholder="Password"
                                            value={teacherLoginInfo.password}
                                            onChange={teacherHandleChange}
                                        />
                                        <img
                                            src={icon}
                                            alt="Toggle Password"
                                            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer w-5 h-5 md:w-6 md:h-6"
                                            onClick={handleToggle}
                                        />
                                    </div>

                                    {/* Forgot Password */}
                                    <div className="flex justify-end">
                                        <Link
                                            to="/teacher-forgot-password"
                                            className="text-black font-semibold text-[12px] underline"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    {/* Login Button */}
                                    <button
                                        type="submit"
                                        className="text-white bg-custom-blue-100 h-[50px] py-2 rounded-lg text-center shadow-custom-dark-500 hover:bg-custom-blue-200 transition md:h-[55px]"
                                    >
                                        Login
                                    </button>

                                    {/* Sign-Up Prompt */}
                                    <p className="text-center text-sm mt-3">
                                        Don’t have an account?{" "}
                                        <span className="text-custom-blue-100">
                                            <Link to="/mainSignup" className="hover:underline">
                                                Signup
                                            </Link>
                                        </span>
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
                        {/* Show loader */}

                    </div>
                </div>


                {/* Right Section */}
                <div className="w-full bg-white z-10 p-5 hidden md:flex md:flex-col md:w-1/2">
                    <NavbarAdmin handleOpenOverlay={handleOpenOverlay} />

                    {/* Overlay */}
                    <AdminLogin isOpen={isOverlayOpen} onClose={handleCloseOverlay} />

                    {/* Student/Teacher Image */}
                    <div className=" flex flex-col pl-5 pb-14 h-screen justify-center items-center">
                        <img
                            className={`sm:w-full lg:w-[500px] h-auto transition-all duration-700 ease-in-out ${isStudent ? "opacity-100" : "opacity-0 absolute"}`}
                            src={student}
                            alt="Student Image"
                        />
                        <img
                            className={`sm:w-full lg:w-[500px] h-auto transition-all duration-700 ease-in-out ${isStudent ? "opacity-0 absolute" : "opacity-100"}`}
                            src={teacher}
                            alt="Teacher Image"
                        />
                    </div>
                </div>

            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default Login;
