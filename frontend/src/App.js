import "./App.css";
import { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const App = () => {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const calculateFaceLocation = (face) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - face.right_col * width,
      bottomRow: height - face.bottom_row * height,
    };
  };

  const displayFaceBox = (boxes) => {
    setBoxes(boxes);
  };

  const updateBoxes = (regions) => {
    let boxes = [];
    for (let i = 0; i < regions.length; i++) {
      boxes.push(
        calculateFaceLocation(regions[i]["region_info"]["bounding_box"])
      );
    }
    displayFaceBox(boxes);
  };

  const onButtonSubmit = async () => {
    setImageURL(input);
    try {
      const response = await fetch(
        "https://face-detection-talzvi.herokuapp.com/imageurl",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: input,
          }),
        }
      );
      const result = await response.json();
      let data = JSON.parse(result)["outputs"][0]["data"];

      if (Object.keys(data).length === 0) {
        console.log("data is empty");
      } else {
        if (result) {
          handleValidData();
        }
        updateBoxes(data["regions"]);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleValidData = async () => {
    try {
      const response = await fetch(
        "https://face-detection-talzvi.herokuapp.com/image",
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
          }),
        }
      );
      const entriesCount = await response.json();
      setUser({ ...user, entries: entriesCount["entries"] });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const setInitialState = () => {
    setInput("");
    setImageURL("");
    setBoxes([]);
    setRoute("signin");
    setIsSignedIn(false);
    setUser({
      id: "",
      name: "",
      email: "",
      password: "",
      entries: 0,
      joined: "",
    });
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setInitialState();
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <ParticlesBg
        className="particles"
        type="cobweb"
        bg={true}
        num={100}
        color="#ffffff"
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />

      {route === "home" ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition boxes={boxes} imageURL={imageURL} />
        </div>
      ) : route === "signin" || route === "signout" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
};

export default App;
