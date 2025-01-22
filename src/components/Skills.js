


import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Skills.css";

function Skills() {
  const skills = [
    { name: "PostgreSQL", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
    { name: "Java", logo: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" },
    { name: "C", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png" },
    { name: "Spring Boot", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Spring_Framework_Logo_2018.svg" },
    { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
    { name: "HTML", logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
    { name: "CSS", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },

  ];

  return (
    <section id="skills" className="skills-section">
      <Container>
        {/* Title */}
        <h2 className="text-center skills-title">Skills</h2>

        {/* Skills Grid */}
        <Row className="justify-content-center">
          {skills.map((skill, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="skill-card animate-card">
                <Card.Img variant="top" src={skill.logo} className="skill-logo" />
                <Card.Body>
                  <Card.Title className="text-center">{skill.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Skills;
