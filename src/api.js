import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Function to get Authorization Header
const getAuthHeader = () => ({
  headers: { Authorization: localStorage.getItem("authToken") },
});

// **User Login using Basic Authentication**
export const loginUser = async (username, password) => {
  try {
    const authHeader = "Basic " + btoa(username + ":" + password);
    const response = await axios.post(
      `${API_BASE_URL}/users/login`,
      {},
      { headers: { Authorization: authHeader } }
    );

    if (response.status === 200) {
      localStorage.setItem("authToken", authHeader); // Store auth token
      return { statusCode: 200, message: "Login Successful" };
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed. Check your username and password.");
  }
};

// **Fetch Data**
export const fetchUsers = async () => (await axios.get(`${API_BASE_URL}/users`, getAuthHeader())).data;
export const fetchSkills = async () => (await axios.get(`${API_BASE_URL}/skills`, getAuthHeader())).data.response;
export const fetchEducation = async () => (await axios.get(`${API_BASE_URL}/education`, getAuthHeader())).data.response;
export const fetchProjects = async () => (await axios.get(`${API_BASE_URL}/projects`, getAuthHeader())).data;

// **Add Data**
export const addSkill = async (skill) => (await axios.post(`${API_BASE_URL}/skills`, skill, getAuthHeader())).data.response;
export const addEducation = async (education) => (await axios.post(`${API_BASE_URL}/education`, education, getAuthHeader())).data.response;
export const addProject = async (project) => (await axios.post(`${API_BASE_URL}/projects`, project, getAuthHeader())).data;

// **Edit Data**
export const editSkill = async (id, skill) => await axios.put(`${API_BASE_URL}/skills/${id}`, skill, getAuthHeader());
export const editEducation = async (id, education) => await axios.put(`${API_BASE_URL}/education/${id}`, education, getAuthHeader());
export const editProject = async (id, project) => await axios.put(`${API_BASE_URL}/projects/${id}`, project, getAuthHeader());

// **Delete Data**
export const deleteSkill = async (id) => await axios.delete(`${API_BASE_URL}/skills/${id}`, getAuthHeader());
export const deleteEducation = async (id) => await axios.delete(`${API_BASE_URL}/education/${id}`, getAuthHeader());
export const deleteProject = async (id) => await axios.delete(`${API_BASE_URL}/projects/${id}`, getAuthHeader());

// **Update Data with FormData (for images)**
export const updateSkill = async (id, formData) => {
  const response = await axios.put(`${API_BASE_URL}/skills/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data", ...getAuthHeader().headers },
  });
  return response.data.response;
};

export const updateEducation = async (id, formData) => {
  const response = await axios.put(`${API_BASE_URL}/education/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data", ...getAuthHeader().headers },
  });
  return response.data.response;
};

export const updateProject = async (id, formData) => {
  const response = await axios.put(`${API_BASE_URL}/projects/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data", ...getAuthHeader().headers },
  });
  return response.data.response;
};
