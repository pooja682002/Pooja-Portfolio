import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { saveContact } from "../services/api"; 
import "./Contact.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; 

function Contact() {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await saveContact(formData); 
      console.log("Contact saved successfully:", response.data);
      setResponseMessage("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error saving contact:", error);
      setResponseMessage("Failed to send your message. Please try again.");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <Container>
        
        <div className="header text-center">
          <h1>📬 Contact Me</h1>
          <p>Feel free to reach out using the form below or connect with me on social media!</p>
        </div>

        
        <Row className="justify-content-center mt-4">
          <Col lg={8} md={10} sm={12}>
            <div className="social-links text-center">
              <a
                href="https://github.com/pooja682002"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com/in/pooja-joseph"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="mailto:pooja.azhi@gmail.com" className="social-icon">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </Col>
        </Row>

       
        <Row className="justify-content-center mt-4">
          <Col lg={8} md={10} sm={12}>
            <Form className="contact-form" onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-4">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-4">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMessage" className="mb-4">
                <Form.Label>Your Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit" className="btn-custom">
                  Send Message
                </Button>
              </div>
            </Form>
            {responseMessage && (
              <p className="response-message text-center mt-3">{responseMessage}</p>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;
