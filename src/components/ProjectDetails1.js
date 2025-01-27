import React from "react";

const ProjectDetails = ({ id, title, description, imageBase64 }) => {
  console.log("Project Details:", { id, title, description, imageBase64 }); // Debugging

  return (
    <div className="modal fade" id={`project-${id}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <img
              src={`data:image/png;base64,${imageBase64}`}
              className="img-fluid"
              alt={title}
            />
            <p className="mt-3">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
