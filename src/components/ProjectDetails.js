import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa"; // Import an arrow icon from react-icons
import "./ProjectDetails.css";

const projectData = {
  "deep-learning-debris": {
    title: "Deep Learning based Floating Debris Detection",
    description:
      " The Deep Learning-Based Floating Debris Detection System aims to identify and track floating debris in bodies of water using real-time video analysis. Leveraging the power of YOLOv3 (You Only Look Once) and deep learning algorithms, this project analyzes video streams to detect floating debris and alerts authorities or relevant bodies for necessary action. The system is built using TensorFlow and Keras, which are used for building and training a convolutional neural network (CNN) model that accurately identifies floating debris in video frames. YOLOv3, a state-of-the-art object detection model, enables real-time detection of debris within video footage with high accuracy. The backend code, deep learning models, and video processing tasks are implemented in Python, while OpenCV is used for image processing, including reading and manipulating video frames and displaying detected objects. The model was trained using a large dataset of annotated video footage, allowing it to recognize and classify floating debris in various environmental conditions. Key features of the system include real-time object detection, which makes it suitable for surveillance applications, high accuracy and precision in debris detection even under challenging conditions like varying lighting and water conditions, and an alert system that triggers notifications when debris is detected, enabling timely responses through integration with monitoring systems.",
    image: "/output ML.png",
    report: "/FINAL_YOLOV3 REPORT.pdf",
  },
  "grievance-management": {
    title: "Grievance Management System",
    description:
      "The Grievance Management System is a comprehensive solution designed to streamline the process of managing and resolving grievances within organizations. It accommodates different user roles such as Users, Assigners, and Supervisors, each with specific functionalities. The platform enables users to submit grievances, assign them to departments, and track their progress through an intuitive interface. Built with React.js for the frontend, the system ensures responsive user interfaces and smooth navigation. The backend is powered by Java (Spring Boot), which implements RESTful APIs for handling backend logic, user authentication, and database interactions. The system uses PostgreSQL for data storage, managing user data, grievance details, assignment records, and status updates. JWT ensures secure user authentication and session management, while Git/GitHub is used for version control and collaboration. Key features include Role-based Access Control for customized permissions, Grievance Tracking for assigning and managing grievances, and robust Data Management for efficient storage and retrieval of information",
    image: "/GMPIC.png",
    report: "/Grievance_Management_Report.pdf",
  },
  "her-day-bot": {
    title: "Her-day: Telegram Bot",
    description:
      "Her-day Telegram Bot is a personal assistant bot designed to help users track their menstrual cycles. It provides users with an intuitive and convenient way to monitor cycle dates, predict upcoming periods, and track symptoms. Built using Python and the python-telegram-bot library, the bot interacts with users via Telegram, allowing them to input data about their cycle and receive updates and predictions. It uses basic algorithms to analyze the input data and provide predictions for period dates, fertile windows, and ovulation. The bot also allows users to track symptoms, providing them with a holistic view of their cycle. The bot is designed to be easy to use, with simple commands for input and retrieval of data. It ensures privacy and security by not storing sensitive data and providing users with the flexibility to delete their entries",
    image: "/HERDAY.png",
    report: "/Her-day_Telegram_Bot_Report.pdf",
  },
  calculator: {
    title: "Thenga-Online website using HTML, CSS, and JS",
    description:
      "Thenga Online is an e-commerce website built to provide users with a platform for buying and selling coconuts and coconut-based products. The website features a user-friendly interface and is designed to handle a range of products including fresh coconuts, coconut oil, and other related items. Developed using HTML, CSS, and JavaScript for the frontend, and a backend built with Node.js and Express.js, the website allows users to browse products, add them to a shopping cart, and make secure payments. The site also provides an administrative panel for sellers to manage their products and orders. Using a relational database like MySQL, Thenga Online efficiently stores and manages product listings, user accounts, and transaction details. With its responsive design, the website ensures a seamless shopping experience across various devices, from desktops to mobile phones. Thenga Online aims to promote the local coconut industry by connecting buyers and sellers, offering high-quality products, and providing secure and convenient online transactions.+",
    image: "/THENGA.png",
    report: "/THENGA.pdf",
  },
};

function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate here
  const project = projectData[projectId];

  if (!project) {
    return (
      <section id="project-details" className="project-details-section">
        <div className="container">
          <h2 className="error-message">Project not found</h2>
          <Button variant="secondary" onClick={() => navigate("/ #Projects")}>
            Back to Projects
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="project-details" className="project-details-section">
      <div className="container">
        {/* Back Arrow */}
        <button
          className="back-arrow"
          onClick={() => navigate("/#Projects")}
          aria-label="Back to Projects"
        >
          <FaArrowLeft size={20} />
        </button>

        <div className="project-details-card">
          <img
            src={project.image}
            alt={project.title}
            className="project-details-image"
          />
          <div className="project-details-content">
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
            <a href={project.report} download className="btn-download">
              Download Report
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;
