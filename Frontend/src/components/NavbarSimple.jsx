import React from 'react'
import logo from "../assets/Login/idea_lab 1.png";
import { Link } from 'react-router-dom';
const NavbarSimple = () => {
    return (
        <ul className="w-auto flex flex-wrap justify-between list-none font-poppins font-semibold text-slate-500">
            <div className="invisible"></div>
            <li className="pt-6 text-[18px] hover:cursor-pointer">Home</li>
            <li className="pt-6 text-[18px] hover:cursor-pointer"><Link to="/mainLogin">Login</Link> </li>
            <li className="pt-6 text-[18px] hover:cursor-pointer">About</li>
            <li className="pt-6 text-[18px] hover:cursor-pointer">Help</li>
            <div className=" invisible w-0 md:w-auto md:visible md:pr-5">
                <img className="w-[50px] " src={logo} alt="Logo" />
            </div>
        </ul>
    )
}

export default NavbarSimple
