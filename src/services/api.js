import axios from "axios";

// Define the base URL for your backend API
const API_BASE_URL = "http://localhost:8080/api"; // Ensure this matches your backend URL and port

/**
 * Save contact data (POST request)
 * @param {Object} contactData - The data to save (e.g., { name, email, message })
 * @returns {Promise} - Axios promise resolving to the response from the backend
 */
export const saveContact = (contactData) => {
  return axios.post(`${API_BASE_URL}/contacts`, contactData, {
    headers: {
      "Content-Type": "application/json", // Ensures JSON is sent to the backend
    },
  });
};

/**
 * Retrieve all contact data (GET request)
 * @returns {Promise} - Axios promise resolving to the response from the backend
 */
export const getContacts = () => {
  return axios.get(`${API_BASE_URL}/contacts`);
};
