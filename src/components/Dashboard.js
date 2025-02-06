import React, { useState } from "react";
import { Link, useNavigate, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Users from "./Users";
import "./dashboard.css";
import SkillsDashboard from "./SkillsDashboard";
import EducationDashboard from "./EducationDashboard";
import ProjectDashboard from "./ProjectDashboard";

function Dashboard({ setAuthenticated }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar toggle
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setAuthenticated(false);
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Hamburger Menu */}
      <div className="hamburger" onClick={toggleSidebar}>
        <span className="material-icons">menu</span>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link
              to="/dashboard/users"
              className={location.pathname === "/dashboard/users" ? "active" : ""}
            >
              <span className="material-icons">people</span> Users
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/skills"
              className={location.pathname === "/dashboard/skills" ? "active" : ""}
            >
              <span className="material-icons">build</span> Skills
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/education"
              className={location.pathname === "/dashboard/education" ? "active" : ""}
            >
              <span className="material-icons">school</span> Education
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/projects"
              className={location.pathname === "/dashboard/projects" ? "active" : ""}
            >
              <span className="material-icons">code</span> Projects
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">
              <span className="material-icons">exit_to_app</span> Log Out
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          <Route path="users" element={<Users />} />
          <Route path="skills" element={<SkillsDashboard />} />
          <Route path="education" element={<EducationDashboard />} />
          <Route path="projects" element={<ProjectDashboard />} />

          {/* Default Route - Profile with Cards inside a single big card */}
          <Route
            path="/"
            element={
              <div className="profile-container">
                <div className="big-card">
                  <div className="profile-header">
                    <img
                      src="/pooja bg img.jpeg"
                      alt="Profile"
                      className="profile-img"
                    />
                    <h2 className="profile-name">POOJA JOSEPH</h2>
                    <p className="profile-description">Welcome to your personal dashboard!</p>
                  </div>

                  {/* Dashboard Cards */}
                  <div className="dashboard-cards">
                    <div className="card" onClick={() => navigate("/dashboard/users")}>
                      <span className="material-icons card-icon">people</span>
                      <h3>Manage Users</h3>
                      <p>View and manage user details</p>
                    </div>

                    <div className="card" onClick={() => navigate("/dashboard/education")}>
                      <span className="material-icons card-icon">school</span>
                      <h3>Manage Education</h3>
                      <p>Update your education details</p>
                    </div>

                    <div className="card" onClick={() => navigate("/dashboard/skills")}>
                      <span className="material-icons card-icon">build</span>
                      <h3>Manage Skills</h3>
                      <p>View and manage skills</p>
                    </div>

                    <div className="card" onClick={() => navigate("/dashboard/projects")}>
                      <span className="material-icons card-icon">code</span>
                      <h3>Manage Projects</h3>
                      <p>View and manage project details</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          {/* Redirect invalid paths inside dashboard to welcome screen */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
