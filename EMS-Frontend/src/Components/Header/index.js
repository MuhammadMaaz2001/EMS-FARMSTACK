import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";


const Header = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/"); // This will only run on button click
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // This navigates to login
    };

    return (
        <div>
            <header className="bg-gray-800 text-white p-3 shadow-md fixed top-0 left-0 w-full flex items-center justify-between pl-6">
                {/* Centered title */}
                <h1 className="flex justify-center w-screen text-2xl font-semibold pl-10">
                    <button onClick={handleNavigation} className="focus:outline-none">
                        Employee Management System
                    </button>
                </h1>


                {/* Logout button aligned to the right */}
                <button
                    onClick={handleLogout}
                    className="text-xl border border-gray-400 px-4 py-2 rounded hover:bg-gray-400 hover:text-white focus:outline-none"
                >
                    <AiOutlineLogout/>
                </button>
            </header>
        </div>
    );
};

export default Header;
