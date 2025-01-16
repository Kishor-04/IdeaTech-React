import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handelError, handelSuccess } from '../utils';
import eyeOff from '../assets/Login/closeEye.png';
import eye from '../assets/Login/openEye.png';
import student from "../assets/Login/student.png";
import teacher from "../assets/Login/teacher.png";
import email from "../assets/Login/email.png"
import name from "../assets/Login/name.png";
import id_card from "../assets/Login/id-card.png";
import NavbarSimple from "../components/NavbarSimple";
import logo from "../assets/Login/idea_lab 1.png";
import { Circles } from "react-loader-spinner"; // Install this package: npm install react-loader-spinner

function Signup() {
    const [isOverlayOpen, setOverlayOpen] = useState(false);

    const handleOpenOverlay = () => setOverlayOpen(true);

    const [isStudent, setIsStudent] = useState(true); // Toggle state: true -> Student, false -> Teacher

    const [isLoading, setIsLoading] = useState(false); // Track loading state

    const [studentSignupInfo, setStudentSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate(); //This function helps to not refresh while switching the links

    const [teacherSignupInfo, setTeacherSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [teacherId, setTeacherId] = useState(''); // For teacher_id input
    const [isTeacherIdVerified, setIsTeacherIdVerified] = useState(false); // To check if teacher_id is valid

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

    const studentHandleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        const copySignupInfo = { ...studentSignupInfo };
        console.log(copySignupInfo);
        copySignupInfo[name] = value;
        setStudentSignupInfo(copySignupInfo);

    }

    const studentHandleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = studentSignupInfo;
        if (!name || !email || !password || !confirmPassword) {
            return handelError('Name, email, password and confirm password are required')
        }

        if (password !== confirmPassword) {
            return handelError("Passwords do not match");
        }

        setIsLoading(true); // Show loader

        try {
            const url = `${import.meta.env.VITE_API_URL}/studentAuth/signup`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentSignupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handelSuccess(message); // Notify successful signup
                setIsLoading(false); // Hide loader
                setTimeout(() => {
                    navigate('/mainLogin')
                }, 3000)
            } else if (error) {
                handelError(error.message || 'An error occurred');
                setIsLoading(false); // Hide loader
            } else {
                setIsLoading(false); // Hide loader
                handelError(message);
            }
            console.log(result);
        } catch (error) {
            handelError('Internal server error');
            setIsLoading(false); // Hide loader
        }
    }

    const teacherHandleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        const copySignupInfo = { ...teacherSignupInfo };
        console.log(copySignupInfo);
        copySignupInfo[name] = value;
        setTeacherSignupInfo(copySignupInfo);

    }

    const handleTeacherIdChange = (e) => {
        setTeacherId(e.target.value);
    };

    const handleTeacherIdVerification = async (e) => {
        e.preventDefault();
        if (!teacherId) {
            return handelError('Teacher ID is required');
        }

        setIsLoading(true); // Show loader

        try {
            const url = `${import.meta.env.VITE_API_URL}/teacherAuth/verify-teacher-id`; // API to check teacher_id
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ teacher_id: teacherId }),
            });
            const result = await response.json();
            const { success, message, tempToken } = result;

            if (success) {
                setIsLoading(false); // Hide loader
                handelSuccess(message);
                setIsTeacherIdVerified(true); // Allow access to signup form
                localStorage.setItem('temptoken', tempToken);
            } else {
                setIsLoading(false); // Hide loader
                handelError(message);
            }
        } catch (error) {
            setIsLoading(false); // Hide loader
            handelError('Error verifying Teacher ID');
        }
    };

    const teacherHandleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = teacherSignupInfo;
        if (!name || !email || !password || !confirmPassword) {
            return handelError('Name, email, password and confirm password are required')
        }

        if (password !== confirmPassword) {
            return handelError("Passwords do not match");
        }

        const tempToken = localStorage.getItem('temptoken');
        if (!tempToken) {
            return handelError('Teacher ID must be verified before signing up');
        }

        setIsLoading(true); // Show loader

        try {
            const url = `${import.meta.env.VITE_API_URL}/teacherAuth/signup`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tempToken,  // Add the JWT token to the headers
                },
                body: JSON.stringify(
                    teacherSignupInfo,
                ),
            });

            console.log(tempToken)

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handelSuccess(message); // Notify successful signup
                setIsLoading(false); // Hide loader
                setTimeout(() => {
                    navigate('/mainLogin')
                }, 3000)
            } else if (error) {
                handelError(message || 'An error occurred');
                setIsLoading(false); // Hide loader
            } else {
                handelError(message);
                setIsLoading(false); // Hide loader
            }
        } catch (error) {
            handelError('Internal server error');
            setIsLoading(false); // Hide loader
        }
    }

    return (
        <div className=" font-montserrat h-screen w-screen overflow-hidden relative">

            {/* Main Container */}
            <div className="absolute top-0 left-0 flex w-full h-full">

                {/* Left Section */}
                <div className="w-full h-screen flex flex-col justify-center items-center bg-white  md:w-1/2 md:h-full md:bg-[#d7e5f0]">
                    <div className="w-full flex flex-col justify-center items-center max-w-[400px] text-center md:mt-[-40px] lg:mt-[-40px] xl:mt-[-450px]">
                        <div className="w-full md:hidden">
                            <NavbarSimple handleOpenOverlay={handleOpenOverlay} />
                            <div className="pt-10 flex justify-center">
                                <img className="w-[50px] " src={logo} alt="Logo" />
                            </div>
                        </div>
                        {/* Welcome Text */}
                        <p className="font-semibold text-[30px] p-6">Hey, Welcome!</p>

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
                                <form className="flex flex-col space-y-4" onSubmit={studentHandleSignup}>
                                    {/* Name Input */}
                                    <div className="relative">
                                        <input
                                            onChange={studentHandleChange}
                                            type="text"
                                            name="name"
                                            className="w-full border p-3   rounded-[10px] bg-custom-gray-200 text-black shadow-custom-dark-500 md:bg-custom-gray-100 md:p-4"
                                            placeholder="Name"
                                            value={studentSignupInfo.name} />
                                        <img
                                            src={name}
                                            alt="Email Icon"
                                            className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6"
                                        />
                                    </div>

                                    {/* Email Input */}
                                    <div className="relative bottom-[-4px]">
                                        <input
                                            onChange={studentHandleChange}
                                            type="email"
                                            name="email"
                                            className="w-full border p-3 rounded-[10px] bg-custom-gray-200 text-black shadow-custom-dark-500 md:bg-custom-gray-100 md:p-4"
                                            placeholder="Email"
                                            value={studentSignupInfo.email}
                                        />
                                        <img
                                            src={email}
                                            alt="Email Icon"
                                            className="absolute top-1/2 right-4 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
                                        />
                                    </div>

                                    {/* Password Input */}
                                    <div className="relative bottom-[-8px] ">
                                        <input
                                            onChange={studentHandleChange}
                                            type="password"
                                            name="password"
                                            className="w-full border p-3 rounded-[10px] bg-custom-gray-200 text-black shadow-custom-dark-500 md:bg-custom-gray-100 md:p-4"
                                            placeholder="Password"
                                            value={studentSignupInfo.password}
                                        />
                                        {/* <img
                                            src={icon}
                                            alt="Toggle Password Visibility"
                                            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer w-5 h-5"
                                            onClick={handleToggle}
                                        /> */}
                                    </div>
                                    <div className="relative bottom-[-8px] ">
                                        <input
                                            onChange={studentHandleChange}
                                            type="password"
                                            name="confirmPassword"
                                            className="w-full border p-3 rounded-[10px] bg-custom-gray-200 text-black shadow-custom-dark-500 md:bg-custom-gray-100 md:p-4"
                                            placeholder="Confirm Password"
                                            value={studentSignupInfo.confirmPassword}
                                        />
                                        {/* <img
                                            src={icon}
                                            alt="Toggle Password Visibility"
                                            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer w-5 h-5"
                                            onClick={handleToggle}
                                        /> */}
                                    </div>
                                    <br />
                                    {/* Login Button */}
                                    <button
                                        type="submit"
                                        className="text-white mt-4 bg-custom-blue-100 h-[50px] py-2 rounded-lg text-center shadow-custom-dark-500 hover:bg-custom-blue-200 transition md:h-[55px]"
                                    >
                                        Signup
                                    </button>

                                    {/* Sign-Up Prompt */}
                                    <p className="text-center text-sm">
                                        Already have an account?{" "}
                                        <Link to="/mainLogin" className="text-custom-blue-100 font-semibold hover:underline">
                                            Login
                                        </Link>
                                    </p>
                                </form>
                                {/* Show loader */}
                                {isLoading && (
                                    <div className="flex absolute inset-0 z-10 justify-center items-center mt-[20px] md:hidden">
                                        <Circles
                                            height="50"
                                            width="50"
                                            color="#6B46C1"
                                            ariaLabel="loading"
                                        />
                                    </div>
                                )}
                                {/* Show loader */}
                                {isLoading && (
                                    <div className="hidden md:flex justify-center items-center mt-[20px] ">
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
                                {!isTeacherIdVerified ? (
                                    <form className="flex flex-col space-y-4" onSubmit={handleTeacherIdVerification}>
                                        {/* Teacher ID Input */}
                                        <div className="relative mb-[-10px]">
                                            <input
                                                type="text"
                                                className="w-full border p-3 rounded-[10px] bg-custom-gray-200 text-black shadow-custom-dark-500 md:bg-custom-gray-100 md:p-4"
                                                onChange={handleTeacherIdChange}
                                                name="teacher_id"
                                                placeholder="Teacher's Id"
                                                value={teacherId}
                                            />
                                            <img
                                                src={id_card}
                                                alt="Email Icon"
                                                className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6"
                                            />
                                        </div>
                                        <br className="" />
                                        {/* Continue Button */}
                                        <button
                                            type="submit"
                                            className="text-white bg-custom-blue-100 h-[50px] rounded-lg text-center shadow-custom-dark-500 hover:bg-custom-blue-200 transition md:h-[55px]"
                                        >
                                            Continue
                                        </button>
                                        {/* Sign-Up Prompt */}
                                        <p className="text-center text-sm">
                                            Already have an account?{" "}
                                            <Link to="/mainLogin" className="text-custom-blue-100 font-semibold hover:underline">
                                                Login
                                            </Link>
                                        </p>
                                    </form>



                                ) : (
                                    <form className="flex flex-col space-y-4" onSubmit={teacherHandleSignup}>
                                        {/* Teacher Name */}
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full border p-3 rounded-[10px] bg-custom-gray-200 text-black shadow-custom-dark-500 md:bg-custom-gray-100 md:p-4"
                                                onChange={teacherHandleChange}
                                                name="name"
                                                placeholder="Name"
                                                value={teacherSignupInfo.name}
                                            />
                                            <img
                                                src={name}
                                                alt="Email Icon"
                                                className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6"
                                            />
                                        </div>
                                        {/* Email Input */}
                                        <div className="relative bottom-[-4px]">
                                            <input
                                                type="email"
                                                className="w-full border p-3 rounded-[10px] bg-custom-gray-200 text-black shadow-custom-dark-500 md:bg-custom-gray-100 md:p-4"
                                                onChange={teacherHandleChange}
                                                name="email"
                                                placeholder="Email"
                                                value={teacherSignupInfo.email}
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
                                                value={teacherSignupInfo.password}
                                                onChange={teacherHandleChange}
                                            />
                                            {/* <img
                                                src={icon}
                                                alt="Toggle Password"
                                                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer w-5 h-5"
                                                onClick={handleToggle}
                                            /> */}
                                        </div>
                                        <div className="relative bottom-[-8px] ">
                                            <input
                                                onChange={teacherHandleChange}
                                                type="password"
                                                name="confirmPassword"
                                                className="w-full border p-3 rounded-[10px] bg-custom-gray-200 text-black shadow-custom-dark-500 md:bg-custom-gray-100 md:p-4"
                                                placeholder="Confirm Password"
                                                value={teacherSignupInfo.confirmPassword}
                                            />
                                            {/* <img
                                                src={icon}
                                                alt="Toggle Password Visibility"
                                                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer w-5 h-5"
                                                onClick={handleToggle}
                                            /> */}
                                        </div>
                                        <br />
                                        {/* Login Button */}
                                        <button
                                            type="submit"
                                            className="text-white bg-custom-blue-100 h-[50px] py-2 rounded-lg text-center shadow-custom-dark-500 hover:bg-custom-blue-200 transition md:h-[55px]"
                                        >
                                            Signup
                                        </button>

                                        {/* Sign-Up Prompt */}
                                        <p className="text-center text-sm mt-3">
                                            Already have an account?{" "}
                                            <span className="text-custom-blue-100">
                                                <Link to="/mainLogin" className="hover:underline">
                                                    Login
                                                </Link>
                                            </span>
                                        </p>
                                        {/* Show loader */}
                                        {isLoading && (
                                            <div className="flex absolute inset-0 z-10 justify-center items-center mt-[20px] md:hidden">
                                                <Circles
                                                    height="50"
                                                    width="50"
                                                    color="#6B46C1"
                                                    ariaLabel="loading"
                                                />
                                            </div>
                                        )}
                                        {/* Show loader */}
                                        {isLoading && (
                                            <div className="hidden md:flex justify-center items-center mt-[20px] ">
                                                <Circles
                                                    height="50"
                                                    width="50"
                                                    color="#6B46C1"
                                                    ariaLabel="loading"
                                                />
                                            </div>
                                        )}
                                    </form>
                                )}

                            </div>
                        </div>
                    </div>
                </div>


                {/* Right Section */}
                <div className="w-full bg-white z-10 p-5 hidden md:flex md:flex-col md:w-1/2">
                    <NavbarSimple handleOpenOverlay={handleOpenOverlay} />

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

export default Signup;
