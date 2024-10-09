import axios from "axios";

const BASE_URL = "https://trailmates-backend.vercel.app/api";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getProfile = async () => {
  const token = getToken();
  if (!token) {
    console.error("No token found, user might not be logged in");
    throw new Error("No token found, user might not be logged in");
  }

  try {
    const response = await axios.get(`${BASE_URL}/profile/get-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Profile response:", response);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Profile error details:", error);
    throw error;
  }
}

export const updateUsername = async (username) => {
  const token = getToken();
  if (!token) {
    console.error("No token found, user might not be logged in");
    throw new Error("No token found, user might not be logged in");
  }

  try {
    const response = await axios.post(`${BASE_URL}/profile/change-username`, {
      username,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Update username response:", response);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Update username error details:", error);
    throw error;
  }
}

export const updateEmail = async (email) => {
  const token = getToken();
  if (!token) {
    console.error("No token found, user might not be logged in");
    throw new Error("No token found, user might not be logged in");
  }

  try {
    const response = await axios.post(`${BASE_URL}/profile/change-email`, {
      email,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Update email response:", response);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Update email error details:", error);
    throw error;
  }
}
