import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skill";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { fetchSkills, fetchEducation, fetchProjects } from "./api";
import "./App.css";

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);

  // Check authentication state from localStorage on mount
  useEffect(() => {
    const authFlag = localStorage.getItem("authFlag");
    if (authFlag === "1") {
      setAuthenticated(true);
      loadData();
    }
  }, []);

  // Fetch data when authenticated
  const loadData = async () => {
    try {
      setSkills(await fetchSkills());
      setEducation(await fetchEducation());
      setProjects(await fetchProjects());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Router>
      <ConditionalNavbar isAuthenticated={isAuthenticated} />
      <Routes>
        {/* Portfolio Home Page */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Education />
              <Skills />
              <Projects />
              <Contact />
            </>
          }
        />

        {/* Project Details Route */}
        <Route path="/projects/:id" element={<ProjectDetails />} />

        {/* Login Page */}
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />

        {/* Admin Dashboard (Protected Route) */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard
                isAuthenticated={isAuthenticated}
                setAuthenticated={setAuthenticated}
                skills={skills}
                education={education}
                projects={projects}
                refreshData={loadData}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

// Conditionally Render Navbar (Hide in Admin Panel)
const ConditionalNavbar = ({ isAuthenticated }) => {
  return !isAuthenticated ? <Navbar /> : null;
};

export default App;
