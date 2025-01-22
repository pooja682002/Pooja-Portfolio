import React from "react";
import "./About.css";

function AboutMe() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* About Me Title */}
        <h2 className="about-title">ABOUT ME</h2>

        {/* Animated Details Section */}
        <div className="about-content">
          <p className="about-paragraph">
            Hi! I’m <strong>Pooja Joseph</strong>, an enthusiastic individual with a deep passion for both creative and technical pursuits. My love for journaling allows me to capture thoughts and ideas, swimming keeps me active and refreshed, and quality time with friends helps me stay grounded and inspired.
          </p>
          <p className="about-paragraph">
            On the technical side, I have honed my programming skills in <strong>Python, C, Java,</strong> and <strong>JavaScript</strong>. My analytical abilities are enhanced by my experience with data analysis tools like <strong>SQL</strong>, enabling me to process and interpret data effectively.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="background-animations">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
