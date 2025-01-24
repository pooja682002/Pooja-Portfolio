import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Fetch project details from backend
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
    fetchProject();
  }, [projectId]);

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <div className="project-details">
      <h1>{project.title}</h1>
      <img src={project.image} alt={project.title} className="project-image" />
      <p>{project.description}</p>
      <a href={project.pdf} download className="btn btn-primary">Download PDF</a>
    </div>
  );
}

export default ProjectDetails;
