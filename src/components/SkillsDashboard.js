import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Alert } from "react-bootstrap"; 
import "./SkillsDashboard.css"; 

function SkillsDashboard() {
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);  
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLogo, setNewSkillLogo] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); // For delete confirmation modal
  const [skillToDelete, setSkillToDelete] = useState(null); // Store skill ID for deletion
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  
  // Handle Edit - Populates the modal with the existing values
  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setNewSkillName(skill.name); // Prepopulate with existing name
    setNewSkillLogo(null); // Reset new logo selection (can edit only name if no new logo selected)
    setSuccessMessage(""); // Clear any previous success message
    setErrorMessage(""); // Clear any previous error message
    setShowModal(true); // Open modal for editing
  };

  // Handle Add New Skill - Resets state to show empty form
  const handleAddNewSkill = () => {
    setEditingSkill(null); // No skill being edited
    setNewSkillName(""); // Reset name
    setNewSkillLogo(null); // Reset logo
    setSuccessMessage(""); // Clear any previous success message
    setErrorMessage(""); // Clear any previous error message
    setShowModal(true); // Open modal
  };

  // Fetch skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/skills");
        setSkills(response.data.response);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  // Handle delete skill
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/skills/${skillToDelete}`);
      setSkills(skills.filter((skill) => skill.id !== skillToDelete));
      setShowDeleteModal(false); // Close delete confirmation modal
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  // Handle update skill
  const handleUpdate = async () => {
    if (!newSkillName) {
      setErrorMessage("Please provide a skill name.");
      return; // Ensure name is provided
    }

    const formData = new FormData();
    formData.append("name", newSkillName);

    // If a new logo is uploaded, append it; otherwise, keep the old logo
    if (newSkillLogo) {
      formData.append("logo", newSkillLogo);
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/skills/${editingSkill.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct content type
          },
        }
      );

      const updatedSkill = response.data.response;

      // Update the skills state after a successful update
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === updatedSkill.id
            ? {
                ...skill,
                name: updatedSkill.name,
                logo: newSkillLogo
                  ? URL.createObjectURL(newSkillLogo)
                  : skill.logo, // Update logo only if a new one is uploaded
              }
            : skill
        )
      );

      setSuccessMessage("Skill updated successfully!");
      setEditingSkill(null); // Reset editing state
      setNewSkillName(""); // Clear name after update
      setNewSkillLogo(null); // Clear logo input
    } catch (error) {
      console.error("Error updating skill:", error);
      setErrorMessage("Error updating the skill.");
    }
  };

  // Handle add new skill
  const handleAddSkill = async () => {
    if (!newSkillName || !newSkillLogo) {
      setErrorMessage("Please provide both skill name and logo.");
      return; // Ensure name and logo are provided
    }

    const formData = new FormData();
    formData.append("name", newSkillName);
    formData.append("logo", newSkillLogo);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/skills",
        formData
      );
      setSkills([...skills, response.data.response]);
      setSuccessMessage("Skill added successfully!");
      setNewSkillName(""); // Reset the name
      setNewSkillLogo(null); // Reset the logo
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Error adding skill:", error);
      setErrorMessage("Error adding the skill.");
    }
  };

  return (
    <div className="skills-container">
      <h2>Skills Records</h2>

      {/* Button to open modal for Add New Skill */}
      <Button variant="primary" onClick={handleAddNewSkill} className="add-new-button">
        Add New Skill
      </Button>

      {/* Skills Table */}
      <table className="skills-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Skill Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id}>
              <td>
                <img
                  src={`data:image/png;base64,${skill.logoBase64}`}
                  alt={skill.name}
                  className="skill-logo"
                />
              </td>
              <td>{skill.name}</td>
              <td>
                <button
                  onClick={() => handleEdit(skill)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => { setSkillToDelete(skill.id); setShowDeleteModal(true); }}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit Skill */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingSkill ? "Edit Skill" : "Add Skill"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Success/Error message inside the modal */}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="Skill Name"
            className="form-control"
          />
          <input
            type="file"
            onChange={(e) => setNewSkillLogo(e.target.files[0])}
            placeholder="Skill Logo"
            className="form-control"
          />

          {/* Display current logo if editing */}
          {editingSkill && editingSkill.logoBase64 && !newSkillLogo && (
            <div className="current-logo">
              <img
                src={`data:image/png;base64,${editingSkill.logoBase64}`}
                alt="Current Logo"
                className="current-logo-img"
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={editingSkill ? handleUpdate : handleAddSkill}
          >
            {editingSkill ? "Update Skill" : "Add Skill"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal for Delete */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you really want to delete this skill? .</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SkillsDashboard;
