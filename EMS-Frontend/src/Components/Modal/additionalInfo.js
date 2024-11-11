// UserInfoModal.js
import React from "react";

const UserInfoModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white text-black rounded-lg p-8 w-96 shadow-lg z-60">
        <h3 className="text-xl font-bold mb-4">User Information</h3>
        <p>
          <span className="font-semibold">ID:</span> {user.id}
        </p>
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Responsibility:</span> {user.responsibility}
        </p>
        <p className="mt-3">
          <span className="font-semibold">Additional Info:</span> {user.additional_information}
        </p>

        <button
          onClick={onClose}
          className="mt-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserInfoModal;
