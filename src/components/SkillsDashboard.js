import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SkillsDashboard.css"; // Import CSS for styling

function SkillsDashboard() {
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLogo, setNewSkillLogo] = useState(null);
 
  
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
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/skills/${id}`);
      setSkills(skills.filter((skill) => skill.id !== id));
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  // Handle edit skill
  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setNewSkillName(skill.name); // Prepopulate the form with the current skill's name
    setNewSkillLogo(null); // Reset new logo selection
  };

  // Handle update skill
  const handleUpdate = async () => {
    if (!newSkillName) return; // Ensure the name is provided

    const formData = new FormData();
    formData.append("name", newSkillName);

    // If a new logo is uploaded, append it; otherwise, keep the old logo
    if (newSkillLogo) {
      formData.append("logo", newSkillLogo);
    }

    try {
      // PUT request to update the skill
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
                  : skill.logo, // Update logo only if a new one was uploaded
              }
            : skill
        )
      );

      setEditingSkill(null); // Reset editing state
      setNewSkillName(""); // Clear name after update
      setNewSkillLogo(null); // Clear logo input
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  // Handle add new skill
  const handleAddSkill = async () => {
    if (!newSkillName || !newSkillLogo) return; // Ensure name and logo are provided

    const formData = new FormData();
    formData.append("name", newSkillName);
    formData.append("logo", newSkillLogo);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/skills",
        formData
      );
      setSkills([...skills, response.data.response]);
      setNewSkillName(""); // Reset the name
      setNewSkillLogo(null); // Reset the logo
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  return (
    <div className="skills-container">
      <h2>Skills Records</h2>

      {/* Add/Edit Form */}
      <div className="add-project-form">
        <input
          type="text"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          placeholder="Skill Name"
        />
      
        {/* Show current logo if editing */}
        {editingSkill && editingSkill.logo && !newSkillLogo && (
          <div className="current-logo">
            <img
              src={`data:image/png;base64,${editingSkill.logo}`}
              alt="Current Logo"
              className="current-logo-img"
            />
          </div>
        )}

        <input
          type="file"
          onChange={(e) => setNewSkillLogo(e.target.files[0])}
          placeholder="Skill Logo"
        />

        <button
          onClick={editingSkill ? handleUpdate : handleAddSkill}
          className="submit-button"
        >
          {editingSkill ? "Update Skill" : "Add Skill"}
        </button>
      </div>

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
                  onClick={() => handleDelete(skill.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SkillsDashboard;
