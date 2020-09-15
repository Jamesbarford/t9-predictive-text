import { Trie } from "../../lib/Trie";

export interface IPredictiveTextRepository {
    trie: Trie
    getAllPredictions(keys: string): string[];
}

export class PredictiveTextRepository implements IPredictiveTextRepository {
    public constructor(public trie: Trie) {}

    public getAllPredictions(keys: string): string[] {
        return this.trie.getWordsFromNumber(keys);
    }
}
