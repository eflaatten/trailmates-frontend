import axios from "axios";

// Base URL for the API
const BASE_URL = "https://trailmates-backend.vercel.app/api";

// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Function to get the user's profile
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

// Function to update the user's username
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

// Function to update the user's email
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

// Function to change the user's profile picture
export const changeProfilePicture = async (profilePicture) => {
  const token = getToken();
  if (!token) {
    console.error("No token found, user might not be logged in");
    throw new Error("No token found, user might not be logged in");
  }

  const formData = new FormData();
  formData.append("profile_picture", profilePicture); // Append the file to the FormData

  try {
    const response = await axios.post(
      `${BASE_URL}/profile/changeProfilePicture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Set content type for FormData
        },
      }
    );

    console.log("Change profile picture response:", response);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error(
      "Change profile picture error details:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// Function to remove the user's profile picture
export const removeProfilePicture = async () => {
  const token = getToken();
  if (!token) {
    console.error("No token found, user might not be logged in");
    throw new Error("No token found, user might not be logged in");
  }

  try {
    const response = await axios.delete(`${BASE_URL}/profile/removeProfilePicture`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Remove profile picture response:", response);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Remove profile picture error details:", error);
    throw error;
  }
}
