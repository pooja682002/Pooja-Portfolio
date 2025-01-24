import React from "react";
import "./Home.css";

function Home() {
  return (
    <section id="home" className="home">
      <div className="profile">
        <h1>Pooja Joseph</h1>
        <p>
          Associate Software Engineer
          <br />
          Tarento Technologies Pvt Ltd
        </p>
        <a
          href="/POOJA_JOSEPH_RESUME (6).pdf"
          download
          className="btn"
        >
          Download CV
        </a>
      </div>
      <div className="profile-image">
        <img src="/pooja bg img.jpeg" alt="Pooja Joseph" />
      </div>
    </section>
  );
}

export default Home;
