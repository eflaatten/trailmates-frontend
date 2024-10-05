import axios from "axios";

const BASE_URL = "https://trailmates-backend.vercel.app/api";

const getToken = () => {
  return localStorage.getItem("token");
};

export const signup = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, {
    username,
    password,
  });
  localStorage.setItem("token", response.data.token);
  window.location.reload();
  return response.data;
};

export const login = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    username,
    password,
  });
  localStorage.setItem("token", response.data.token);
  window.location.reload();
  return response.data;
};

export const logout = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found, user might not be logged in");
  }

  try {
    console.log("Sending logout request with token:", token);
    const response = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Logout response:", response);

    localStorage.removeItem("token");
    window.location.reload();
    return response.data;
  } catch (error) {
    console.error(
      "Logout error details:",
      error.response?.data || error.message
    );
    throw error;
  }
};
