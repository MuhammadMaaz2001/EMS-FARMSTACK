import React, { useState, useEffect } from "react";
import { fetchAllEmployees } from "../APIServices/ReadAPI";  // Update path to match your structure
import UserInfoModal from "../Components/Modal/additionalInfo";
import Header from "../Components/Header";

const Read = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;  // Define how many users per page

  useEffect(() => {
    const getAllUserData = async () => {
      try {
        const allEmployees = await fetchAllEmployees();
        setUsers(allEmployees.employee_data); // Set all employee data in state
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
  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Handle modal closing
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Pagination: Get users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <UserInfoModal user={selectedUser} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default Read;
