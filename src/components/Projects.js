import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/projects")
      .then((response) => {
        setProjects(response.data); // Extract projects from API response
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setError("Failed to fetch projects.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section id="projects" className="projects-section">
      <div className="text-center mb-5">
        <h2 className="section-title">My Projects</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <div className="card-hover">
              <Card.Img
                variant="top"
                src={`data:image/png;base64,${project.imageBase64}`} // Convert Base64 to Image
                alt={project.title}
                className="project-image"
              />
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Link to={`/projects/${project.id}`}>
                  <Button className="btn-custom">View Details</Button>
                </Link>
              </Card.Body>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
