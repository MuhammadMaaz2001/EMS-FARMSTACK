
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllRoutes from "./AllRoutes/AllRoutes";
import HomePage from "./Pages/Home";
import SideBar from "./Components/Navbar/index";

export default function App() {
  return (
    <BrowserRouter>
    <div className="flex">
      <SideBar />
      <div className="ml-26 flex-1 p-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<AllRoutes />} />
      </Routes>
      </div>
    </div>
      
      {/* <AllRoutes /> */}
    </BrowserRouter>
  );
}
