import React, { useState } from "react";

const UpdateInfo = ({ user, onClose, onSave }) => {
  // Initialize state for editable fields
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    responsibility: user?.responsibility || "",
    additional_information: user?.additional_information || "",
  });

  if (!user) return null;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Save updated data
  const handleSave = () => {
    onSave(formData); // Call onSave with the updated data
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white text-black rounded-lg p-8 w-96 shadow-lg z-60">
        <h3 className="text-xl font-bold mb-4">Edit User Information</h3>
        
        {/* Editable fields */}
        <div className="mb-3">
          <label className="font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="font-semibold">Responsibility:</label>
          <input
            type="text"
            name="responsibility"
            value={formData.responsibility}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </div>
        <div className="mb-3">
          <label className="font-semibold">Additional Info:</label>
          <input
            type="text"
            name="additional_information"
            value={formData.additional_information}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        {/* Save and Close buttons */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition mr-2"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInfo;
