import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import levels from "./conf/levels";

import "./index.css";

ReactDOM.render(<App levelData={levels[0]} />, document.getElementById("root"));
