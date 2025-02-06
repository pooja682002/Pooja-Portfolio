import React, { useEffect, useState } from "react";
import "./Skills.css";

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/skills")
      .then((response) => response.json())
      .then((data) => setSkills(data.response)) 
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-title">Skills</h2>
      <div className="skills-wrapper">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <img
              src={`data:image/png;base64,${skill.logoBase64}`}
              alt={`${skill.name} logo`}
              className="skill-logo"
              aria-label={skill.name}
            />
            <p className="skill-name">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
