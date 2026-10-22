import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div id="main" className="landingpage">
    
      <h2>音</h2>
  
      <p id="definition">
        yīn (n.)
        sound
        tone
        pitch
        pronunciation
      </p>
      <section className="about">
        <div>
          <h2>About</h2>
          <p>Yin is made for learners of Mandarin Chinese to practice their tones.
            Learn through structured lessons and compare your pronunciation with native speakers!
          </p>
        </div>
        <div id="tutorial">
          {/* reusing previous buttons but need new paths! */}
          <Link to="/tutorial/"> 
            <button type="button">tutorial</button>
          </Link>
        </div>
        <div id="start_home">
          <Link to="/teacherInterface/">
            <button type="button">start</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
