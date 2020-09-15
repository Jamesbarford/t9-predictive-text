import { isNil } from "lodash";
import { isEmptyString } from "../../lib/util";
import { IPredictiveTextRepository } from "./PredictiveTextRepository";

export class PredictiveTextService {
    private keyMap: Record<string, string> = {
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz"
    };

    public constructor(private repository: IPredictiveTextRepository) {}

    public getAllPredictions(keys: string): string[] {
        if (isNil(keys) || isEmptyString(keys)) {
            throw new Error("Expected query to contain keys");
        }

        const seq = keys.split("").map(s => {
            return this.keyMap[s];
        });

        return this.repository.getAllPredictions(seq);
    }
}
