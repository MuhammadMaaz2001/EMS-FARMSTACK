// api.js
import axios from "axios";

const API_BASE_URL = "http://192.168.23.109:8000";  // Replace with your FastAPI base URL

// Function to fetch all employee data
export const fetchAllEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/read_all/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all employees:", error);
    throw error;
  }
};
