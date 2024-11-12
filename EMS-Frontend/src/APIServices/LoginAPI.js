import axios from 'axios';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8000/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response.data);
    throw error.response ? error.response.data : { detail: "An error occurred" };
  }
};
