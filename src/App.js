import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <Router>
      <Routes>
        {/* Main one-page layout */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
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
        {/* Dynamic project details page */}
        <Route
          path="/projects/:projectId"
          element={
            <>
              <Navbar />
              <ProjectDetails />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
