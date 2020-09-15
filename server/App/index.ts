import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import { PredictiveTextRouter } from "./api/predictiveText/PredictiveTextRouter";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

app.use(express.static(__dirname));
app.use(express.static(path.resolve("./dist-client")));

app.use("/api/predict", PredictiveTextRouter);

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("./dist-client/index.html"));
});

app.listen(port, () => {
    console.log(`Listening on port:${port}`);
});
