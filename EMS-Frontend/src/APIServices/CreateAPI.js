import axios from 'axios';

const API_BASE_URL = "http://192.168.23.109:8000"; // Update this if your FastAPI server is hosted elsewhere

export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create_employee`, employeeData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.detail : "Error occurred";
  }
};

// export default createEmployee;


