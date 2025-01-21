import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Education from "./components/Education";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Education />
    </div>
  );
}


export default App;

