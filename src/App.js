import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import About from "./components/About";
import Education from "./components/Education";
import Skill from "./components/Skill";
import SkillsDashboard from "./components/SkillsDashboard";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";


import "./App.css";

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem("authFlag") === "1");
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]); // Watch for auth changes

  const loadData = async () => {
    try {
      const skillsData = await fetch("http://localhost:8080/api/skills");
      const skillsJson = await skillsData.json();
      setSkills(skillsJson);
      
      const educationData = await fetch("http://localhost:8080/api/education");
      const educationJson = await educationData.json();
      setEducation(educationJson);

      const projectsData = await fetch("http://localhost:8080/api/projects");
      const projectsJson = await projectsData.json();
      setProjects(projectsJson);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Router>
      <ConditionalNavbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Education />
              <Skill/>
              <Projects />
              <Contact />
            </>
          }
        />

        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />

        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <Dashboard setAuthenticated={setAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/skills" element={isAuthenticated ? <SkillsDashboard /> : <Navigate to="/login" />} />
      </Routes>
      
    </Router>
  );
};

const ConditionalNavbar = ({ isAuthenticated }) => {
  const location = useLocation();
  return location.pathname.startsWith("/dashboard") ? null : <Navbar />;
};

export default App;
