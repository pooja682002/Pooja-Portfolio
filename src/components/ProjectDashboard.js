import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectDashboard.css";

function ProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", image: null });
  const [editingProject, setEditingProject] = useState(null);

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
    setNewProject({ ...newProject, image: e.target.files[0] });
  };

  // Add a new project
  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description || !newProject.image) return;

    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    formData.append("image", newProject.image);

    try {
      await axios.post("http://localhost:8080/api/projects/upload", formData);
      setNewProject({ title: "", description: "", image: null });
      window.location.reload(); // Refresh the list
    } catch (err) {
      console.error("Error adding project:", err);
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
  };

  // Update Project
  const handleUpdateProject = async () => {
    if (!newProject.title || !newProject.description) return;

    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    if (newProject.image) formData.append("image", newProject.image);

    try {
      await axios.put(`http://localhost:8080/api/projects/${editingProject.id}`, formData);
      setEditingProject(null);
      window.location.reload();
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  return (
    <div className="project-dashboard">
      <h2>Projects Records</h2>

      {/* Add or Edit Project Form */}
      <div className="add-project-form">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={newProject.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={newProject.description}
          onChange={handleChange}
        />
        <input type="file" onChange={handleFileChange} />
        <button onClick={editingProject ? handleUpdateProject : handleAddProject}>
          {editingProject ? "Update Project" : "Add Project"}
        </button>
      </div>

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
                <button onClick={() => handleEditProject(project)}>Edit</button>
                <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectDashboard;
