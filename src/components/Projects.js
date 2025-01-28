import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Projects.css";

function Projects() {
  const projects = [
    {
      id: "63cd1cff-295d-431d-b552-60303976f042",
      title: "Deep Learning based Floating Debris Detection",
      description:
        "A deep learning model using YOLOv3 for floating debris detection. Developed under the guidance of IIT, Palakkad.",
      image: "/ML_IMG.jpg",
    },
    {
      id: "3c669798-99cc-408d-b6b3-71bfe678f340",
      title: "Grievance Management System",
      description:
        "A full-stack application for grievance management using React.js, Spring Boot, and PostgreSQL.",
      image: "/GMPIC.png",
    },
    {
      id: "caec6e1f-ab62-4874-8402-03eba8832c93",
      title: "Her-day: Telegram Bot",
      description:
        "A menstrual tracker bot built using Python, Git, and GitHub with automatic alert notifications.",
      image: "/HERDAY.png",
    },
    {
      id: "2b4e8a65-fb5f-41f7-bdc9-387bc0625ff4",
      title: "Thenga-Online website using HTML, CSS, and JavaScript",
      description:
        "An interactive and responsive online showing website for coconut shell products.",
      image: "/THENGA.png",
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="text-center mb-5">
        <h2 className="section-title">My Projects</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <Card className="card-hover">
              <Card.Img
                variant="top"
                src={project.image}
                alt={project.title}
                className="project-image"
              />
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Link to={`/projects/${project.id}`}>
                  <Button className="btn-custom">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
