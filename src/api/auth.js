import axios from "axios";



const BASE_URL = "https://trailmates-backend.vercel.app/api";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const signup = async (username, email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, {
    username,
    email,
    password,
  });
  localStorage.setItem("token", response.data.token);
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
    console.error("No token found, user might not be logged in");
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

    if (response.status === 200) {
      localStorage.removeItem("token");
      window.location.reload();
      return response.data;
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error(
      "Logout error details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  const token = getToken();
  if (!token) {
    console.error("No token found, user might not be logged in");
    throw new Error("No token found, user might not be logged in");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/auth/change-password`,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Change password response:", response);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Change password error details:", error);
    throw error;
  }
}

export const deleteAccount = async () => {
  const token = getToken();
  if (!token) {
    console.error("No token found, user might not be logged in");
    throw new Error("No token found, user might not be logged in");
  }

  try {
    const response = await axios.delete(`${BASE_URL}/auth/delete-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Delete account response:", response);

    if (response.status === 200) {
      localStorage.removeItem("token");
      window.location.reload();
      return response.data;
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Delete account error details:", error);
    throw error;
  }
};