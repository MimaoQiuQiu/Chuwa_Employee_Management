// pass
import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Import your application's CSS
// import App from "./App"; // Import the root component of your application
import reportWebVitals from "./reportWebVitals";
import PersonalInfo from "./employeePages/personalinfo";

ReactDOM.render(
  <React.StrictMode>
    <PersonalInfo />
  </React.StrictMode>,
  document.getElementById("root"),
);

reportWebVitals();
