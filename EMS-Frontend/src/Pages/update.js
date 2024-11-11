import React, { useState, useEffect } from "react";
import { TfiWrite } from "react-icons/tfi";
import UserInfoModal from "../Components/Modal/additionalInfo";
import UpdateInfo from "../Components/Modal/updateInfo"; 
import Header from "../Components/Header";
import { updateEmployeeData } from "../APIServices/UpdateAPI"; 
import { fetchAllEmployees } from "../APIServices/ReadAPI";

const Update = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // To differentiate modals
  const [users, setUsers] = useState([]); // State for storing fetched data
  const [filteredUsers, setFilteredUsers] = useState([]); // For filtered users after search
  const [searchQuery, setSearchQuery] = useState(""); // For search query
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const usersPerPage = 5;  // Number of users to display per page

  // Fetch user data when the modal is opened
  useEffect(() => {
    const getAllUserData = async () => {
      try {
        const allEmployees = await fetchAllEmployees();
        setUsers(allEmployees.employee_data); // Set employee data in state
        setFilteredUsers(allEmployees.employee_data); // Initialize filtered users
      } catch (error) {
        console.error("Error fetching all employee data:", error);
      }
    };

    getAllUserData();
  }, []);

  // Handle search filter
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Handle modal opening
  const openModal = (user, editing = false) => {
    setSelectedUser(user);
    setShowModal(true);
    setIsEditing(editing);
  };

  // Handle modal closing
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setIsEditing(false);
  };

  // Pagination: Get users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Save updated user data
  const handleSave = async (updatedUser) => {
    try {
      const response = await updateEmployeeData(selectedUser.email, updatedUser);
      console.log("Updated User Data:", response);

      const allEmployees = await fetchAllEmployees();
      setUsers(allEmployees.employee_data); // Update state to trigger re-render
      window.location.reload();
      closeModal();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center h-full mt-14 text-white dark:bg-background dark:text-primary">
        
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearch}
          className="mb-4 px-4 py-2 w-1/2 text-black bg-white border border-gray-300 rounded-lg"
        />
        
        {/* Table */}
        <table className="min-w-full divide-y divide-zinc-200 bg-white text-black rounded-lg shadow-lg overflow-hidden">
          <thead className="text-white">
            <tr>
              <th className="px-6 py-3 bg-gray-600 text-left text-xs font-medium uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 bg-gray-600 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 bg-gray-600 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 bg-gray-600 text-left text-xs font-medium uppercase tracking-wider">Responsibility</th>
              <th className="px-6 py-3 bg-gray-600 text-left text-xs font-medium uppercase tracking-wider">Additional Info</th>
              <th className="px-6 py-3 bg-gray-600 text-left text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-zinc-200">
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-no-wrap">{user.id}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{user.responsibility}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <button
                    onClick={() => openModal(user)}
                    className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
                  >
                    More Info
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <button
                    onClick={() => openModal(user, true)} // Open modal for editing
                    className="relative px-3 py-1 rounded text-green-700 text-2xl transition group"
                  >
                    <span className="absolute bottom-full w-[6vw] mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                      Update Information
                    </span>
                    <TfiWrite />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg mr-2 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage * usersPerPage >= filteredUsers.length}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg ml-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Modal */}
        {showModal && selectedUser && (
          isEditing ? (
            <UpdateInfo 
              user={selectedUser} // Pass the fetched data to the modal
              onClose={closeModal} 
              onSave={handleSave} 
            />
          ) : (
            <UserInfoModal user={selectedUser} onClose={closeModal} />
          )
        )}
      </div>
    </div>
  );
};

export default Update;
