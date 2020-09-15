import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "./style.scss";
import { store } from "./store/setup";
import { PredictiveTextConnected } from "./App/PredictiveText";

const App: React.FC = () => (
    <Provider store={store}>
        <PredictiveTextConnected />
    </Provider>
);

const root = document.getElementById("root");

if (!root) throw new Error("no valid root for application");

render(<App />, root);
