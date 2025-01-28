import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { id } = useParams(); // Fetch the project ID from the URL
  const [project, setProject] = useState(null); // Store project data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch project details from the backend
    axios.get(`http://localhost:8080/api/projects/${id}`)
 // Match backend API endpoint
      .then((response) => {
        setProject(response.data); // Assign project details from the backend response
        console.log(response)
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        setError("Failed to fetch project details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="project-details">
      <h1>{project.title}</h1>
      {project.imageBase64 && (
        <img
          src={`data:image/jpeg;base64,${project.imageBase64}`}
          alt={project.title}
          className="project-image"
        />
      )}
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectDetails;
