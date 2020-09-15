import { flatMap } from "lodash";

import { Trie } from "../../lib/Trie";

export interface IPredictiveTextRepository {
    getAllPredictions(keys: string[]): string[];
}

export class PredictiveTextRepository implements IPredictiveTextRepository {
    public constructor(private trie: Trie) {}

    public getAllPredictions(keys: string[]): string[] {
        return flatMap(keys.join("").split(""), key =>
            this.trie.find(key).filter(t => t.length === keys.length)
        );
    }
}
