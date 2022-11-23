import React from "react";
import Box from "../Box/Box";

const FaceRecognition = ({ box, imageURL }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt=""
          src={imageURL}
          width="500px"
          height="auto"
        />
        <Box box={box} />
      </div>
    </div>
  );
};

export default FaceRecognition;
