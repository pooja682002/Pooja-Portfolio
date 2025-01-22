import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Contact.css";

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <Container>
        {/* Header */}
        <div className="header text-center">
          <h1>📬 Contact Me</h1>
          <p>Feel free to reach out using the form below or connect with me on social media!</p>
        </div>

        {/* Contact Form */}
        <Row className="justify-content-center">
          <Col lg={8} md={10} sm={12}>
            <Form className="contact-form">
              <Form.Group controlId="formName" className="mb-4">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-4">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group controlId="formMessage" className="mb-4">
                <Form.Label>Your Message</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Write your message" />
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit" className="btn-custom">
                  Send Message
                </Button>
              </div>
            </Form>
          </Col>
        </Row>

        {/* Social Icons */}
        <Row className="justify-content-center mt-4">
          <Col lg={8} md={10} sm={12}>
            <div className="social-links text-center">
              <a href="https://github.com/pooja682002" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/pooja-joseph" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="mailto:pooja.azhi@gmail.com" className="social-icon">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;
