import React from "react";
import { FaUserPlus, FaUsers, FaChartLine, FaCog } from "react-icons/fa";
import Header from "../Components/Header";
import { TfiWrite } from "react-icons/tfi";
import { AiTwotoneDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate();


    const handleClick = () => {
        navigate("/create"); 
    }
    const handleView = () => {
        navigate("/read"); 
    }
    const handleUpdate = () => {
        navigate("/update"); 
    }
    const handleDelete = () => {
        navigate("/delete"); 
    }
    

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Header />

      {/* Main Content */}
      <main className="p-8 mt-12">
        {/* Welcome Message */}
        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">Welcome to the Employee Management System</h2>
          <p className="text-gray-600">Manage your employees efficiently and effectively with ease.</p>
        </section>

        {/* Quick Access Buttons */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <button className="bg-gray-600 hover:bg-gray-800 text-white rounded-lg p-4 flex flex-col items-center shadow-md transition"
          onClick={handleClick}
          >
          
            <FaUserPlus className="text-3xl mb-2" />
            <span>Add Employee</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-800 text-white rounded-lg p-4 flex flex-col items-center shadow-md transition"
          onClick={handleView}>
            <FaUsers className="text-3xl mb-2" />
            <span>View Employees</span>
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white rounded-lg p-4 flex flex-col items-center shadow-md transition" 
          onClick={handleUpdate}>
            <TfiWrite className="text-3xl mb-2" />
            <span>Update employees</span>
          </button>
          <button className="bg-red-600 hover:bg-red-800 text-white rounded-lg p-4 flex flex-col items-center shadow-md transition"
          onClick={handleDelete}>
            <AiTwotoneDelete className="text-3xl mb-2" />
            <span>Delete employees</span>
          </button>
        </section>

        {/* Dashboard Overview */}
        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Dashboard Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-100 rounded-lg text-center">
              <h4 className="text-lg font-bold">Total Employees</h4>
              <p className="text-2xl font-semibold text-gray-800">125</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg text-center">
              <h4 className="text-lg font-bold">Active Projects</h4>
              <p className="text-2xl font-semibold text-green-800">8</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg text-center">
              <h4 className="text-lg font-bold">Departments</h4>
              <p className="text-2xl font-semibold text-yellow-800">5</p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg text-center">
              <h4 className="text-lg font-bold">Pending Requests</h4>
              <p className="text-2xl font-semibold text-red-800">3</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
