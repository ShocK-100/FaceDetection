import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import "./App.css";
import { Component } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const initialState = {
  input: "",
  imageURL: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (face) => {
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

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  };

  updateBoxes = async (regions) => {
    let boxes = [];
    for (let i = 0; i < regions.length; i++) {
      boxes.push(
        this.calculateFaceLocation(regions[i]["region_info"]["bounding_box"])
      );
    }
    this.displayFaceBox(boxes);
  };

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input }, () => {
      fetch("https://face-detection-talzvi.herokuapp.com/imageurl", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: this.state.input,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          let data = JSON.parse(result)["outputs"][0]["data"];

          if (Object.keys(data).length === 0) {
            console.log("data is empty");
          } else {
            if (result) {
              fetch("https://face-detection-talzvi.herokuapp.com/image", {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: this.state.user.id,
                }),
              })
                .then((response) => response.json())
                .then((entriesCount) => {
                  this.setState(
                    Object.assign(this.state.user, {
                      entries: entriesCount["entries"],
                    })
                  );
                })
                .catch(console.log);
            }
            this.updateBoxes(data["regions"]);
          }
        })
        .catch((error) => console.log("error ", error));
    });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageURL, route, boxes } = this.state;
    return (
      <div className="App">
        <ParticlesBg
          className="particles"
          type="cobweb"
          bg={true}
          num={100}
          color="#ffffff"
        />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageURL={imageURL} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
