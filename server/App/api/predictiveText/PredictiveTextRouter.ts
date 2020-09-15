import { Router } from "express";

import { PredictiveTextService } from "./PredictiveTextService";
import { createTrieAndSeed } from "../../lib/Trie";
import { PredictiveTextRepository } from "./PredictiveTextRepository";

export const PredictiveTextRouter = Router();

const predictiveTextRepository = new PredictiveTextRepository(createTrieAndSeed());
const predictiveTextService = new PredictiveTextService(predictiveTextRepository);

PredictiveTextRouter.get("/:seq", async (req, res) => {
    try {
        const allPermutations = predictiveTextService.getAllPredictions(req.params.seq);

        res.send(allPermutations);
    } catch (e) {
        res.send(e);
    }
});
