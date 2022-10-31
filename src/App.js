import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import "./App.css";
import { Component } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const USER_ID = "tal";
const PAT = "830f6947a77f40449fed31e2ca59ef80";
const APP_ID = "my-first-application";
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
const IMAGE_URL = "";
let raw = JSON.stringify({
  user_app_id: {
    user_id: USER_ID,
    app_id: APP_ID,
  },
  inputs: [
    {
      data: {
        image: {
          url: IMAGE_URL,
        },
      },
    },
  ],
});

let requestOptions = {
  method: "POST",
  headers: {
    Accept: "application/json",
    Authorization: "Key " + PAT,
  },
  body: raw,
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
    };
  }

  calculateFaceLocation = (face) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log("leftCol: ", face.left_col);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - face.right_col * width,
      bottomRow: height - face.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    // console.log("box: ", box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input }, () => {
      let obj = JSON.parse(raw);
      obj["inputs"][0]["data"]["image"]["url"] = this.state.imageURL;
      raw = JSON.stringify(obj);

      requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key " + PAT,
        },
        body: raw,
      };

      fetch(
        "https://api.clarifai.com/v2/models/" +
          MODEL_ID +
          "/versions/" +
          MODEL_VERSION_ID +
          "/outputs",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let data = JSON.parse(result)["outputs"][0]["data"];

          if (Object.keys(data).length === 0) {
            console.log("data is empty");
          } else {
            console.log(
              "data: ",
              data["regions"][0]["region_info"]["bounding_box"]
            );
            this.displayFaceBox(
              this.calculateFaceLocation(
                data["regions"][0]["region_info"]["bounding_box"]
              )
            );
          }
        })
        .catch((error) => console.log("error ", error));
    });
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg
          className="particles"
          type="cobweb"
          bg={true}
          num={100}
          color="#ffffff"
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
