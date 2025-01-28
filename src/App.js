import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skill";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <ConditionalNavbar />
        <Routes>
          {/* Main page route with all sections */}
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
          {/* Dynamic project details route */}
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

// Conditional Navbar Component
const ConditionalNavbar = () => {
  const location = useLocation();

  // Hide the Navbar for the ProjectDetails page
  const hideNavbar = location.pathname.includes("/projects/");

  return !hideNavbar && <Navbar />;
};

export default App;
