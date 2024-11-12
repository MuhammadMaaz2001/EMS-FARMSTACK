// apiService.js
import axios from 'axios';

const API_BASE_URL = "http://localhost:8000";  // Replace with your backend URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { detail: "An error occurred" };
  }
};
