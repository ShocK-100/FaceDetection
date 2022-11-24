import React from "react";
import Box from "../Box/Box";

const FaceRecognition = ({ boxes, imageURL }) => {
  let boxesDimensionsArr = [];
  for (let i = 0; i < boxes.length; i++) {
    boxesDimensionsArr.push(<Box box={boxes[i]} key={i} />);
  }
  if (boxes)
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
          {boxesDimensionsArr}
        </div>
      </div>
    );
};

export default FaceRecognition;
