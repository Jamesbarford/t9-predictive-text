import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "./style.scss";
import { store } from "./store/setup";

const App: React.FC = () => (
    <Provider store={store}>
        <div className="ex">hello</div>
    </Provider>
);

const root = document.getElementById("root");

if (!root) throw new Error("no valid root for application");

render(<App />, root);
