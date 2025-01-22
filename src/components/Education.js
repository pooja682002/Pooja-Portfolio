import React from "react";
import "./Education.css";

function Education() {
  return (
    <section id="education" className="education-section">
      <div className="container">
        {/* Section Header */}
        <div className="header">
          <h2>📘  Education Journey</h2>
          
        </div>

        {/* Education Cards */}
        <div className="education-cards">
          {/* Card 1 */}
          <div className="education-card">
            <div className="icon">
              <img
                src="https://img.icons8.com/color/96/000000/university.png"
                alt="University Icon"
              />
            </div>
            <h3>BTech in Electronics and Communication Engineering</h3>
            <p><strong>NSS College of Engineering, Palakkad</strong></p>
            <span>2020 - 2024</span>
          </div>

          {/* Card 2 */}
          <div className="education-card">
            <div className="icon">
              <img
                src="https://img.icons8.com/color/96/000000/school.png"
                alt="High School Icon"
              />
            </div>
            <h3>Biomaths</h3>
            <p><strong>St Mary's C.G.H.S.S, Ernakulam</strong></p>
            <span>2018 - 2020</span>
          </div>

          {/* Card 3 */}
          <div className="education-card">
            <div className="icon">
              <img
                src="https://img.icons8.com/color/96/000000/class.png"
                alt="School Icon"
              />
            </div>
            <h3>ICSE</h3>
            <p><strong>Don Bosco Senior Secondary School, Vaduthala</strong></p>
            <span>2017 - 2018</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
