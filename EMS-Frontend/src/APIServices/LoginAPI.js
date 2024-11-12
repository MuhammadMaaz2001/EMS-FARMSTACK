import axios from 'axios';

export const loginUser = async (email, password) => {
  try {
    // Create a new FormData object and append the email and password fields
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // Send the POST request with form data and set Content-Type to 'multipart/form-data'
    const response = await axios.post("http://192.168.23.109:8000/login", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data);
    throw error.response ? error.response.data : { detail: "An error occurred" };
  }
};
