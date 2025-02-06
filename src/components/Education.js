import React, { useEffect, useState } from "react";
import "./Education.css";
import axios from "axios";

function Education() {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/education"); 
        if (response.data.statusCode === 200) {
          setEducationData(response.data.response);
        } else {
          setError("Failed to fetch education data.");
        }
      } catch (err) {
        setError("Error fetching education data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
  }, []);

  return (
    <section id="education" className="education-section">
      <div className="container">
       
        <div className="header">
          <h2>📘 Education Journey</h2>
        </div>

        
        {loading && <p>Loading...</p>}

       
        {error && <p className="error">{error}</p>}

      
        <div className="education-cards">
          {educationData.map((education) => (
            <div className="education-card" key={education.id}>
              <div className="icon">
                <img
                  src={`data:image/jpeg;base64,${education.logo}`}
                  alt={`${education.degree} Icon`}
                />
              </div>
              <h3>{education.degree}</h3>
              <p><strong>{education.institution}</strong></p>
              <span>{education.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
