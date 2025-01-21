import React from "react";
import "./About.css";

function AboutMe() {
  return (
    <section id="about" className="about-section">
      <div className="container d-flex align-items-center">
        {/* Image Section */}
        <div className="profile-picture">
          <img
            src="Pooja-img.jpeg"
            alt="Profile"
            className="img-fluid"
          />
        </div>

        {/* About Me Details */}
        <div className="about-details ms-5">
          <h2>ABOUT ME</h2>
          <p>
          Hi! I’m Pooja Joseph, an enthusiastic individual with a deep passion for both creative and technical pursuits. My love for journaling allows me to capture thoughts and ideas, swimming keeps me active and refreshed, and quality time with friends helps me stay grounded and inspired.
          On the technical side, I have honed my programming skills in Python, C, Java, and JavaScript. With a keen interest in circuit design, I am proficient in tools like Proteus and LtSpice. My analytical abilities are enhanced by my experience with data analysis tools like SQL, enabling me to process and interpret data effectively.
          Additionally, I have explored the world of machine learning and am well-versed in architectures like YOLO, empowering me to approach problem-solving with innovative solutions. Combining creativity with technical expertise, I aim to make meaningful contributions to every project I undertake.
            
          </p>
          <ul className="about-list">
            <li><strong>Name:</strong> Pooja Joseph</li>
            <li><strong>Date of Birth:</strong> 6 August 2002</li>
            <li><strong>Nationality:</strong> Indian</li>
            <li><strong>Address:</strong> Azhikkakath House,South Chittoor,Ernakulam</li>
            <li><strong>Phone:</strong> +91 8590130873</li>
            <li><strong>Email:</strong> pooja.azhi@gmail.com</li>
          </ul>
          
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

