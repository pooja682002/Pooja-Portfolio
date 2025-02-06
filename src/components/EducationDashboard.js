import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./EducationDashboard.css"; // Import CSS for styling

function EducationDashboard() {
  const [educationRecords, setEducationRecords] = useState([]);
  const [editingEducation, setEditingEducation] = useState(null);
  const [newDegree, setNewDegree] = useState("");
  const [newInstitution, setNewInstitution] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newLogo, setNewLogo] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // For modal visibility

  // Fetch education records from backend
  const fetchEducation = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/education");
      setEducationRecords(response.data.response);
    } catch (error) {
      console.error("Error fetching education records:", error);
      setResponseMessage("Error fetching education records.");
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  // Handle delete education record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/education/${id}`);
      setEducationRecords(educationRecords.filter(record => record.id !== id));
      setResponseMessage("Education record deleted successfully!");
    } catch (error) {
      console.error("Error deleting education record:", error);
      setResponseMessage("Error deleting education record.");
    }
  };

  // Handle edit
  const handleEdit = (education) => {
    setEditingEducation(education);
    setNewDegree(education.degree);
    setNewInstitution(education.institution);
    setNewYear(education.year);
    setNewLogo(null); // Reset new image selection
    setResponseMessage(""); // Clear any previous response message
    setShowModal(true); // Show modal for editing
  };

  // Handle update education record
  const handleUpdate = async () => {
    if (!newDegree || !newInstitution || !newYear) {
      setResponseMessage("Please fill out all fields.");
      return; // Ensure required fields are provided
    }

    const formData = new FormData();
    formData.append("degree", newDegree);
    formData.append("institution", newInstitution);
    formData.append("year", newYear);
    if (newLogo) {
      formData.append("logo", newLogo);
    }

    try {
      await axios.put(`http://localhost:8080/api/education/${editingEducation.id}`, formData);
      
      // Re-fetch the updated education list
      fetchEducation();

      // Reset state after successful update
      setEditingEducation(null);
      setNewDegree("");
      setNewInstitution("");
      setNewYear("");
      setNewLogo(null);
      setResponseMessage("Education record updated successfully!");
    } catch (error) {
      setResponseMessage("Error updating education record.");
      console.error("Error updating education record:", error);
    }
  };

  // Handle add new education record
  const handleAddEducation = async () => {
    if (!newDegree || !newInstitution || !newYear || !newLogo) {
      setResponseMessage("Please fill out all fields.");
      return; // Ensure all required fields are provided
    }

    const formData = new FormData();
    formData.append("degree", newDegree);
    formData.append("institution", newInstitution);
    formData.append("year", newYear);
    formData.append("logo", newLogo);

    try {
      await axios.post("http://localhost:8080/api/education", formData);

      // Re-fetch the updated education list
      fetchEducation();

      // Reset fields
      setNewDegree("");
      setNewInstitution("");
      setNewYear("");
      setNewLogo(null);
      setResponseMessage("Education record added successfully!");
    } catch (error) {
      setResponseMessage("Error adding education record.");
      console.error("Error adding education record:", error);
    }
  };

  // Show Add New Modal
  const handleAddNewClick = () => {
    setEditingEducation(null);
    setNewDegree("");
    setNewInstitution("");
    setNewYear("");
    setNewLogo(null);
    setResponseMessage(""); // Clear any previous response message
    setShowModal(true); // Show modal for adding new record
  };

  return (
    <div className="education-container">
      <h2>Education Records</h2>

      {/* Button to trigger Add New Modal */}
      <button className="add-new-button" onClick={handleAddNewClick}>
        Add New Education
      </button>

      {/* Education Table */}
      <div className="table-wrapper">
        <table className="education-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Degree</th>
              <th>Institution</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {educationRecords.map((education) => (
              <tr key={education.id}>
                <td>
                  <img
                    src={`data:image/png;base64,${education.logo}`}
                    alt={education.degree}
                    className="education-logo"
                  />
                </td>
                <td>{education.degree}</td>
                <td>{education.institution}</td>
                <td>{education.year}</td>
                <td>
                  <button onClick={() => handleEdit(education)} className="edit-button">Edit</button>
                  <button onClick={() => handleDelete(education.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Education */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingEducation ? "Edit Education" : "Add Education"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={newDegree}
            onChange={(e) => setNewDegree(e.target.value)}
            placeholder="Degree"
            className="form-control"
          />
          <input
            type="text"
            value={newInstitution}
            onChange={(e) => setNewInstitution(e.target.value)}
            placeholder="Institution"
            className="form-control"
          />
          <input
            type="text"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            placeholder="Year"
            className="form-control"
          />

          {/* Show existing logo when editing */}
          {editingEducation && editingEducation.logo && (
            <div className="logo-preview">
              <p>Current Logo:</p>
              <img
                src={`data:image/png;base64,${editingEducation.logo}`}
                alt="Current Logo"
                className="education-logo-preview"
              />
            </div>
          )}

          {/* File input for new logo */}
          <input
            type="file"
            onChange={(e) => setNewLogo(e.target.files[0])}
            className="form-control"
          />

          {/* Show new logo preview */}
          {newLogo && (
            <div className="logo-preview">
              <p>New Logo Preview:</p>
              <img
                src={URL.createObjectURL(newLogo)}
                alt="New Logo"
                className="education-logo-preview"
              />
            </div>
          )}

          {/* Display Response Message */}
          {responseMessage && (
            <div className="response-message">{responseMessage}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={editingEducation ? handleUpdate : handleAddEducation}
          >
            {editingEducation ? "Update Education" : "Add Education"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EducationDashboard;
