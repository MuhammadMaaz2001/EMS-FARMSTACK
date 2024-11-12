// DeleteAPI.js
import axios from "axios";

const API_BASE_URL = "http://192.168.23.109:8000";  // Replace with your FastAPI base URL

// Function to delete an employee by email
export const deleteEmployee = async (email) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${email}`);
    return response.data;  // This should return { result: "Data deleted successfully" }
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
