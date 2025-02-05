import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EducationDashboard.css"; // Import CSS for styling

function EducationDashboard() {
  const [educationRecords, setEducationRecords] = useState([]);
  const [editingEducation, setEditingEducation] = useState(null);
  const [newDegree, setNewDegree] = useState("");
  const [newInstitution, setNewInstitution] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newLogo, setNewLogo] = useState(null);

  // Fetch education records from backend
  const fetchEducation = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/education");
      setEducationRecords(response.data.response);
    } catch (error) {
      console.error("Error fetching education records:", error);
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
    } catch (error) {
      console.error("Error deleting education record:", error);
    }
  };

  // Handle edit
  const handleEdit = (education) => {
    setEditingEducation(education);
    setNewDegree(education.degree);
    setNewInstitution(education.institution);
    setNewYear(education.year);
    setNewLogo(null); // Reset new image selection
  };

  // Handle update education record
  const handleUpdate = async () => {
    if (!newDegree || !newInstitution || !newYear) return; // Ensure required fields are provided

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
    } catch (error) {
      console.error("Error updating education record:", error);
    }
  };

  // Handle add new education record
  const handleAddEducation = async () => {
    if (!newDegree || !newInstitution || !newYear || !newLogo) return; // Ensure all required fields are provided

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
    } catch (error) {
      console.error("Error adding education record:", error);
    }
  };

  return (
    <div className="education-container">
      <h2>Education Records</h2>

      {/* Add/Edit Form */}
      <div className="add-education-form">
        <input 
          type="text" 
          value={newDegree} 
          onChange={(e) => setNewDegree(e.target.value)} 
          placeholder="Degree" 
        />
        <input 
          type="text" 
          value={newInstitution} 
          onChange={(e) => setNewInstitution(e.target.value)} 
          placeholder="Institution" 
        />
        <input 
          type="text" 
          value={newYear} 
          onChange={(e) => setNewYear(e.target.value)} 
          placeholder="Year" 
        />

        {/* Existing Logo Preview */}
        {editingEducation && editingEducation.logo && (
          <img
            src={`data:image/png;base64,${editingEducation.logo}`}
            alt="Current Logo"
            className="education-logo-preview"
          />
        )}

        {/* New Image Upload */}
        <input 
          type="file" 
          onChange={(e) => setNewLogo(e.target.files[0])} 
          placeholder="Institution Logo" 
        />

        {/* New Image Preview */}
        {newLogo && (
          <img
            src={URL.createObjectURL(newLogo)}
            alt="New Preview"
            className="education-logo-preview"
          />
        )}

        <button onClick={editingEducation ? handleUpdate : handleAddEducation} className="submit-button">
          {editingEducation ? "Update Education" : "Add Education"}
        </button>
      </div>

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
                  <button onClick={() => handleDelete(education.id)} className="delete-button"> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EducationDashboard;
