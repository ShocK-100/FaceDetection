import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import brain from "./brain.png";

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
        <div className="pa3">
          <img alt="logo" src={brain} style={{ paddingTop: "32.5px" }} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
