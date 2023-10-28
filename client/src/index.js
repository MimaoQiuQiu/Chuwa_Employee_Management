// pass
import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Import your application's CSS
// import App from "./App"; // Import the root component of your application
import reportWebVitals from "./reportWebVitals";
import PersonalInfo from "./employeePages/personalinfo";
import Visastatus from "./employeePages/visastatus";

ReactDOM.render(
  <React.StrictMode>
    <Visastatus />
  </React.StrictMode>,
  document.getElementById("root"),
);

reportWebVitals();
