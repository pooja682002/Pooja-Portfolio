import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import About from "./components/About";
import Education from "./components/Education";
import Skill from "./components/Skill";
import Users from "./components/Users";
import SkillsDashboard from "./components/SkillsDashboard";
import EducationDashboard from "./components/EducationDashboard";
import Projects from "./components/Projects";
import ProjectDashboard from "./components/ProjectDashboard";
import ProjectDetails from "./components/ProjectDetails";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import "./App.css";

const App = () => {
  // ✅ Read authentication state from localStorage on first render
  const [isAuthenticated, setAuthenticated] = useState(
    localStorage.getItem("authFlag") === "1"
  );

  // ✅ Update localStorage whenever authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("authFlag", "1");
    } else {
      localStorage.removeItem("authFlag");
    }
  }, [isAuthenticated]);

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

        {/* ✅ Use Nested Routes for Dashboard */}
        <Route
          path="/dashboard/*"
          element={isAuthenticated ? <Dashboard setAuthenticated={setAuthenticated} /> : <Navigate to="/login" />}
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
