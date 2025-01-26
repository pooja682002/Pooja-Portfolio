import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Projects.css";

function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="text-center mb-5">
        <h2 className="section-title">My Projects</h2>
      </div>

      <div className="projects-grid">
        {/* Deep Learning based Floating Debris Detection */}
        <div className="project-card">
          <Card className="card-hover">
            <Card.Img
              variant="top"
              src="/ML_IMG.jpg"
              alt="Deep Learning based Floating Debris Detection"
              className="project-image"
            />
            <Card.Body>
              <Card.Title>Deep Learning based Floating Debris Detection</Card.Title>
              <Card.Text>
                A deep learning model using YOLOv3 for floating debris detection. Developed under the guidance of IIT, Palakkad.
              </Card.Text>
              <Link to="/projects/deep-learning-debris">
                <Button  className="btn-custom">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>

        {/* Grievance Management System */}
        <div className="project-card">
          <Card className="card-hover">
            <Card.Img
              variant="top"
              src="/GMPIC.png"
              alt="Grievance Management System"
              className="project-image"
            />
            <Card.Body>
              <Card.Title>Grievance Management System</Card.Title>
              <Card.Text>
                A full-stack application for grievance management using React.js, Spring Boot, and PostgreSQL.
              </Card.Text>
              <Link to="/projects/grievance-management">
                <Button  className="btn-custom">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>

        {/* Her-day: Telegram Bot */}
        <div className="project-card">
          <Card className="card-hover">
            <Card.Img
              variant="top"
              src="/HERDAY.png"
              alt="Her-day: Telegram Bot"
              className="project-image"
            />
            <Card.Body>
              <Card.Title>Her-day: Telegram Bot</Card.Title>
              <Card.Text>
                A menstrual tracker bot built using Python, Git, and GitHub with automatic alert notifications.
              </Card.Text>
              <Link to="/projects/her-day-bot">
                <Button  className="btn-custom">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>

        {/* Thenga-Online website using HTML, CSS, and JavaScript */}
        <div className="project-card">
          <Card className="card-hover">
            <Card.Img
              variant="top"
              src="/THENGA.png"
              alt="THENGA"
              className="project-image"
            />
            <Card.Body>
              <Card.Title>Thenga-Online website using HTML, CSS, and JS</Card.Title>
              <Card.Text>
                An interactive and responsive online showing website for coconut shell products.
              </Card.Text>
              <Link to="/projects/Thnega">
                <Button  className="btn-custom">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Projects