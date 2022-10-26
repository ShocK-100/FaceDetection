import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0 ">
      <Tilt
        tiltMaxAngleX="50"
        tiltMaxAngleY="50"
        className="Tilt br2 shadow-2"
        style={{
          height: "200px",
          width: "200px",
        }}
      >
        <div>
          <h1>React Parallax Tilt 👀</h1>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
