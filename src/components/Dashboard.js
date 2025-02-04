import React, { useState, useEffect } from "react";
import { fetchSkills, fetchEducation, fetchProjects, deleteSkill, deleteEducation, deleteProject, addSkill, addEducation, addProject, updateSkill, updateEducation, updateProject } from "../api";
import "./dashboard.css";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("skills");
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);

  const [newSkill, setNewSkill] = useState({ name: "", logo: null });
  const [newEducation, setNewEducation] = useState({ degree: "", institution: "", year: "", logo: null });
  const [newProject, setNewProject] = useState({ title: "", description: "", image: null });

  const [editSkill, setEditSkill] = useState(null);
  const [editEducation, setEditEducation] = useState(null);
  const [editProject, setEditProject] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const loadedSkills = await fetchSkills();
      const loadedEducation = await fetchEducation();
      const loadedProjects = await fetchProjects();
      setSkills(loadedSkills);
      setEducation(loadedEducation);
      setProjects(loadedProjects);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === "skills") await deleteSkill(id);
      if (type === "education") await deleteEducation(id);
      if (type === "projects") await deleteProject(id);
      loadData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleAdd = async (type) => {
    try {
      const formData = new FormData();
      if (type === "skills") {
        formData.append("name", newSkill.name);
        formData.append("logo", newSkill.logo);
        await addSkill(formData);
      } else if (type === "education") {
        formData.append("degree", newEducation.degree);
        formData.append("institution", newEducation.institution);
        formData.append("year", newEducation.year);
        formData.append("logo", newEducation.logo);
        await addEducation(formData);
      } else if (type === "projects") {
        formData.append("title", newProject.title);
        formData.append("description", newProject.description);
        formData.append("image", newProject.image);
        await addProject(formData);
      }
      loadData();
      resetNewItemState();  // Reset input fields after adding
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleEdit = async (type) => {
    try {
      const formData = new FormData();
      if (type === "skills" && editSkill) {
        formData.append("name", editSkill.name);
        formData.append("logo", editSkill.logo);
        await updateSkill(editSkill.id, formData);
      } else if (type === "education" && editEducation) {
        formData.append("degree", editEducation.degree);
        formData.append("institution", editEducation.institution);
        formData.append("year", editEducation.year);
        formData.append("logo", editEducation.logo);
        await updateEducation(editEducation.id, formData);
      } else if (type === "projects" && editProject) {
        formData.append("title", editProject.title);
        formData.append("description", editProject.description);
        formData.append("image", editProject.image);
        await updateProject(editProject.id, formData);
      }
      loadData();
      resetEditState();
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const resetEditState = () => {
    setEditSkill(null);
    setEditEducation(null);
    setEditProject(null);
  };

  const resetNewItemState = () => {
    setNewSkill({ name: "", logo: null });
    setNewEducation({ degree: "", institution: "", year: "", logo: null });
    setNewProject({ title: "", description: "", image: null });
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login flag
    window.location.reload(); // Reload page to redirect to login
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>My Dashboard</h2>
        <ul>
          <li onClick={() => setActiveSection("skills")} className={activeSection === "skills" ? "active" : ""}>Skills</li>
          <li onClick={() => setActiveSection("education")} className={activeSection === "education" ? "active" : ""}>Education</li>
          <li onClick={() => setActiveSection("projects")} className={activeSection === "projects" ? "active" : ""}>Projects</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="main-content">
        <h2>{activeSection.toUpperCase()}</h2>
        <div className="table-container">
          {activeSection === "skills" && (
            <div className="skills-table">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Logo</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((skill) => (
                    <tr key={skill.id}>
                      <td><img src={`data:image/png;base64,${skill.logoBase64}`} alt={skill.name} className="table-img" /></td>
                      <td>{skill.name}</td>
                      <td>
                        <button onClick={() => handleDelete(skill.id, "skills")}>Delete</button>
                        <button onClick={() => setEditSkill(skill)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeSection === "education" && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Degree & Institution</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {education.map((edu) => (
                  <tr key={edu.id}>
                    <td><img src={`data:image/png;base64,${edu.logo}`} alt={edu.institution} className="table-img" /></td>
                    <td>{edu.degree} - {edu.institution}</td>
                    <td>{edu.year}</td>
                    <td>
                      <button onClick={() => handleDelete(edu.id, "education")}>Delete</button>
                      <button onClick={() => setEditEducation(edu)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeSection === "projects" && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj.id}>
                    <td><img src={`data:image/png;base64,${proj.imageBase64}`} alt={proj.title} className="table-img" /></td>
                    <td>{proj.title}</td>
                    <td>{proj.description}</td>
                    <td>
                      <button onClick={() => handleDelete(proj.id, "projects")}>Delete</button>
                      <button onClick={() => setEditProject(proj)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Form */}
      <div className="edit-form">
        {activeSection === "skills" && editSkill && (
          <>
            <input
              type="text"
              value={editSkill.name}
              onChange={(e) => setEditSkill({ ...editSkill, name: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setEditSkill({ ...editSkill, logo: e.target.files[0] })}
            />
            <button onClick={() => handleEdit("skills")}>Save Changes</button>
          </>
        )}
        {activeSection === "education" && editEducation && (
          <>
            <input
              type="text"
              value={editEducation.degree}
              onChange={(e) => setEditEducation({ ...editEducation, degree: e.target.value })}
            />
            <input
              type="text"
              value={editEducation.institution}
              onChange={(e) => setEditEducation({ ...editEducation, institution: e.target.value })}
            />
            <input
              type="text"
              value={editEducation.year}
              onChange={(e) => setEditEducation({ ...editEducation, year: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setEditEducation({ ...editEducation, logo: e.target.files[0] })}
            />
            <button onClick={() => handleEdit("education")}>Save Changes</button>
          </>
        )}
        {activeSection === "projects" && editProject && (
          <>
            <input
              type="text"
              value={editProject.title}
              onChange={(e) => setEditProject({ ...editProject, title: e.target.value })}
            />
            <textarea
              value={editProject.description}
              onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setEditProject({ ...editProject, image: e.target.files[0] })}
            />
            <button onClick={() => handleEdit("projects")}>Save Changes</button>
          </>
        )}
      </div>

      {/* Add New Form */}
      <div className="add-form">
        {activeSection === "skills" && (
          <>
            <input
              type="text"
              placeholder="Skill Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setNewSkill({ ...newSkill, logo: e.target.files[0] })}
            />
            <button onClick={() => handleAdd("skills")}>Add Skill</button>
          </>
        )}

        {activeSection === "education" && (
          <>
            <input
              type="text"
              placeholder="Degree"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
            />
            <input
              type="text"
              placeholder="Institution"
              value={newEducation.institution}
              onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            />
            <input
              type="text"
              placeholder="Year"
              value={newEducation.year}
              onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setNewEducation({ ...newEducation, logo: e.target.files[0] })}
            />
            <button onClick={() => handleAdd("education")}>Add Education</button>
          </>
        )}

        {activeSection === "projects" && (
          <>
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })}
            />
            <button onClick={() => handleAdd("projects")}>Add Project</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
