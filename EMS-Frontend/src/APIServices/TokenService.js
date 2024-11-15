// APIServices/TokenService.js

import axios from "axios";

export const validateToken = async (token) => {
    try {
        const response = await axios.get("http://localhost:8000/api/validate-token", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.isValid;
    } catch (error) {
        console.error("Token validation failed:", error);
        return false;
    }
};
