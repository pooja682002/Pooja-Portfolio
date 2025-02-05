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
  const [isAuthenticated, setAuthenticated] = useState(false);

  // Check if user is authenticated from localStorage on initial load
  useEffect(() => {
    const authFlag = localStorage.getItem("authFlag");
    if (authFlag === "1") {
      setAuthenticated(true);
    }
  }, []);

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
              <Skill />
              <Projects />
              <Contact />
            </>
          }
        />
        
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        
        {/* Protecting dashboard routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard setAuthenticated={setAuthenticated} /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/skills"
          element={isAuthenticated ? <SkillsDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/education"
          element={isAuthenticated ? <Education /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/projects"
          element={isAuthenticated ? <Projects /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

const ConditionalNavbar = ({ isAuthenticated }) => {
  const location = useLocation();
  return location.pathname.startsWith("/dashboard") ? null : <Navbar />;
};

export default App;
