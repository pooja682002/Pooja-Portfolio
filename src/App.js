import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  const location = useLocation();

  // Define paths where the Navbar should not be displayed
  const hideNavbarRoutes = ["/projects/:projectId"];

  // Check if the current path matches any excluded paths
  const isNavbarHidden = hideNavbarRoutes.some((path) =>
    new RegExp(path.replace(":projectId", "[^/]+")).test(location.pathname)
  );

  return (
    <>
      {/* Conditionally render the Navbar */}
      {!isNavbarHidden && <Navbar />}

      <Routes>
        {/* Main page route */}
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
              <Footer />
            </>
          }
        />
        {/* Dynamic project details route */}
        <Route
          path="/projects/:projectId"
          element={
            <>
              <ProjectDetails />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
