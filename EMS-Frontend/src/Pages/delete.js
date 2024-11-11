import React, { useState, useEffect } from "react";
import UserInfoModal from "../Components/Modal/additionalInfo";
import { AiTwotoneDelete } from "react-icons/ai";
import Header from "../Components/Header";
import { fetchAllEmployees } from "../APIServices/ReadAPI";  // Import the fetch function
import { deleteEmployee } from "../APIServices/DeleteAPI";  // Import the delete function

const DeleteFile = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]); // State to store fetched data
  const [filteredUsers, setFilteredUsers] = useState([]); // State to store filtered data
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [showConfirmDialog, setShowConfirmDialog] = useState(false); // State for confirmation dialog
  const [userToDelete, setUserToDelete] = useState(null); // State to hold user to delete
  const usersPerPage = 5; // Define how many users per page

  // Fetch all users when the component mounts
  useEffect(() => {
    const getAllUserData = async () => {
      try {
        const allEmployees = await fetchAllEmployees(); // Fetch data from API
        setUsers(allEmployees.employee_data); // Set the fetched data in state
        setFilteredUsers(allEmployees.employee_data); // Initialize filtered users
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    getAllUserData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

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

  // Function to handle delete button click
  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowConfirmDialog(true); // Show confirmation dialog
  };

  // Function to handle actual deletion after confirmation
  const handleDelete = async () => {
    if (userToDelete) {
      try {
        const result = await deleteEmployee(userToDelete.email); // Call the delete API
        console.log(result); // Log the success message from the API
        // Remove the user from the users state after deletion
        setUsers(users.filter((user) => user.email !== userToDelete.email));
        setFilteredUsers(filteredUsers.filter((user) => user.email !== userToDelete.email));
        setShowConfirmDialog(false); // Close the confirmation dialog
      } catch (error) {
        console.error("Error deleting the user:", error);
      }
    }
  };

  // Function to cancel the deletion
  const cancelDelete = () => {
    setShowConfirmDialog(false); // Close the confirmation dialog
    setUserToDelete(null); // Clear selected user
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
                    onClick={() => confirmDelete(user)}
                    className="relative px-3 py-1 rounded text-red-600 transition group"
                  >
                    {/* Tooltip */}
                    <span className="absolute bottom-full w-[6vw] mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 text-center">
                      Click here to Delete
                    </span>
                    <AiTwotoneDelete className="text-2xl" />
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

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-amber-700 p-8 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4">Are you sure you want to delete?</h3>
              <div className="flex justify-between">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedUser && (
          <UserInfoModal user={selectedUser} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default DeleteFile;
