import * as React from "react";
import { render } from "react-dom";
import "./style.scss";

const App: React.FC = () => <div className="ex">hello</div>;

const root = document.getElementById("root");

if (!root) throw new Error("no valid root for application");

render(<App />, root);
