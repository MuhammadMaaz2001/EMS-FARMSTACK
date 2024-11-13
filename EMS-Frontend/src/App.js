import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AllRoutes from "./AllRoutes/AllRoutes";
import HomePage from "./Pages/Home";
import SideBar from "./Components/Navbar/index";
import LoginPage from "./Pages/Login";
import { validateToken } from "./APIServices/TokenService"; // Import a function to validate the token

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const isValid = await validateToken(token);
                    if (!isValid) {
                        localStorage.removeItem("token"); // Remove invalid token
                        if (location.pathname !== "/login") {
                            navigate("/login"); // Redirect to login if token is invalid and not already on login page
                        }
                    } else if (location.pathname === "/login" || location.pathname === "/Login") {
                        // Redirect to home page if on login page and token is valid
                        navigate("/");
                    }
                } catch (error) {
                    console.error("Token validation error:", error);
                    localStorage.removeItem("token");
                    if (location.pathname !== "/login") {
                        navigate("/login");
                    }
                }
            } else if (location.pathname !== "/login") {
                // Redirect to login if no token exists and not already on login page
                navigate("/login");
            }
        };

        checkToken();
    }, [navigate, location.pathname]);

    return (
        <div className="flex">
            {/* Hide the sidebar if on the login page */}
            {location.pathname !== "/login" && location.pathname !== "/Login" && <SideBar />}
            <div className="ml-26 flex-1 p-4">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/*" element={<AllRoutes />} />
                </Routes>
            </div>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}
