import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Replace with your FastAPI base URL

// Fetch all employee data
export const fetchAllEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/read_all/`);
    return response.data.employees; // Assuming the API returns an array of employees
  } catch (error) {
    console.error("Error fetching all employee data:", error);
    throw error;
  }
};


// Function to update employee data
export const updateEmployeeData = async (email, updateData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update/${email}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating employee data:", error);
    throw error;
  }
};
