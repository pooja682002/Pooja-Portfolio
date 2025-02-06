import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Alert } from "react-bootstrap"; // Importing Bootstrap components
import "./ProjectDashboard.css";

function ProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", image: null });
  const [editingProject, setEditingProject] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalSuccessMessage, setModalSuccessMessage] = useState(""); // Success message state
  const [modalErrorMessage, setModalErrorMessage] = useState(""); // Error message state

  // Fetch projects
  useEffect(() => {
    axios.get("http://localhost:8080/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProject({ ...newProject, image: file });

    // Show image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Add a new project
  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description || !newProject.image) {
      setModalErrorMessage("All fields are necessary.");
      setModalSuccessMessage(""); // Clear success message if any
      return;
    }

    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    formData.append("image", newProject.image);

    try {
      await axios.post("http://localhost:8080/api/projects/upload", formData);
      setNewProject({ title: "", description: "", image: null });
      setPreviewImage(null);
      setModalSuccessMessage("Project added successfully!");
      setModalErrorMessage(""); // Clear error message

      setShowModal(false);
      window.location.reload(); // Refresh the list
    } catch (err) {
      console.error("Error adding project:", err);
      setModalErrorMessage("Error adding the project.");
      setModalSuccessMessage(""); // Clear success message if any
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/projects/${id}`);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  // Handle Edit
  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject({ title: project.title, description: project.description, image: null });
    setPreviewImage(`data:image/png;base64,${project.imageBase64}`); // Show existing image
    setShowModal(true); // Open modal for editing
  };

  // Update Project
  const handleUpdateProject = async () => {
    if (!newProject.title || !newProject.description) {
      setModalErrorMessage("All fields are necessary.");
      setModalSuccessMessage(""); // Clear success message if any
      return;
    }

    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    if (newProject.image) formData.append("image", newProject.image);

    try {
      await axios.put(`http://localhost:8080/api/projects/${editingProject.id}`, formData);
      setEditingProject(null);
      setPreviewImage(null);
      setModalSuccessMessage("Project updated successfully!");
      setModalErrorMessage(""); // Clear error message

      setShowModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Error updating project:", err);
      setModalErrorMessage("Error updating the project.");
      setModalSuccessMessage(""); // Clear success message if any
    }
  };

  // Clear messages when closing modal
  const handleCloseModal = () => {
    setShowModal(false);
    setModalSuccessMessage(""); // Clear success message when modal is closed
    setModalErrorMessage(""); // Clear error message when modal is closed
  };

  return (
    <div className="project-dashboard">
      <h2>Projects Records</h2>

      {/* Button to open modal for Add New Project */}
      <Button variant="primary" onClick={() => setShowModal(true)} className="add-new-button">
        Add New Project
      </Button>

      {/* Projects Table */}
      <table className="project-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <img src={`data:image/png;base64,${project.imageBase64}`} alt={project.title} className="project-image" />
              </td>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>
                <button onClick={() => handleEditProject(project)} className="edit-button">Edit</button>
                <button onClick={() => handleDeleteProject(project.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit Project */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProject ? "Edit Project" : "Add Project"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={newProject.title}
            onChange={handleChange}
            className="form-control"
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={newProject.description}
            onChange={handleChange}
            className="form-control"
          />
          
          {/* Show existing image when editing */}
          {editingProject && previewImage && (
            <div className="image-preview">
              <p>Current Image:</p>
              <img src={previewImage} alt="Current project" className="project-image-preview" />
            </div>
          )}

          <input type="file" onChange={handleFileChange} className="form-control" />
          
          {/* Show new preview when a new image is uploaded */}
          {previewImage && newProject.image && (
            <div className="image-preview">
              <p>New Image Preview:</p>
              <img src={previewImage} alt="New project" className="project-image-preview" />
            </div>
          )}

          {/* Display Success/Failure Message Inside Modal */}
          {modalErrorMessage && <Alert variant="danger">{modalErrorMessage}</Alert>}
          {modalSuccessMessage && <Alert variant="success">{modalSuccessMessage}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={editingProject ? handleUpdateProject : handleAddProject}
          >
            {editingProject ? "Update Project" : "Add Project"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProjectDashboard;