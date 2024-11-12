import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AllRoutes from "./AllRoutes/AllRoutes";
import HomePage from "./Pages/Home";
import SideBar from "./Components/Navbar/index";
import LoginPage from "./Pages/Login";

function App() {
  const location = useLocation();

  return (
    <div className="flex">
      {/* Hide the sidebar if on the login page */}
      {location.pathname !== "/login" && <SideBar />}
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
