import React, { useState } from "react";
import Header from "../Components/Header";
import { createEmployee } from "../APIServices/CreateAPI";

const Create = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    responsibility: "",
    additional_information: "",
  });

  // Loading, success, and error states
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading state to true
    setLoading(true);

    try {
      await createEmployee({
        name: formData.name,
        email: formData.email,
        responsibility: formData.responsibility,
        additional_information: formData.additional_information,
      });

      // Simulate a delay for the success message
      setTimeout(() => {
        setLoading(false); // Stop loader
        setShowSuccessDialog(true); // Show success dialog
        setTimeout(() => {
          setShowSuccessDialog(false); // Hide success dialog after 3 seconds
        }, 3000); // Hide after 3 seconds
      }, 2000); // Simulate a 2-second delay before showing success message
    } catch (error) {
      setLoading(false);
      setShowErrorDialog(true); // Show error dialog
      setTimeout(() => {
        setShowErrorDialog(false); // Hide error dialog after 3 seconds
      }, 3000); // Hide after 3 seconds
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-full bg-gray-100 p-4">
        <div className="w-full max-w-md bg-gradient-to-b from-gray-600 to-gray-400 p-8 rounded-xl shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-center text-white">User Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="name" className="text-lg font-medium text-white">Name:</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-lg font-medium text-white">Email:</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="responsibility" className="text-lg font-medium text-white">Responsibility:</label>
              <input
                type="text"
                id="responsibility"
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
                placeholder="Enter Responsibility"
                value={formData.responsibility}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="additional_information" className="text-lg font-medium text-white">Additional Information:</label>
              <textarea
                id="additional_information"
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
                placeholder="Enter Additional info"
                rows="3"
                value={formData.additional_information}
                onChange={handleChange}
              />
            </div>

            <div className="py-2">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
              >
                Submit Information
              </button>
            </div>

            {/* Show loading spinner */}
            {loading && (
              <div className="flex justify-center py-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 animate-spin"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke-width="10"
                    stroke-linecap="round"
                    className="stroke-white"
                    stroke-dasharray="283"
                    stroke-dashoffset="75"
                  ></circle>
                </svg>
              </div>
            )}
          </form>

          {/* Success Dialog */}
          {showSuccessDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-center text-green-600">User Created Successfully!</h3>
              </div>
            </div>
          )}

          {/* Error Dialog */}
          {showErrorDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-center text-red-600">User Already Existed</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
