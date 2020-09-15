import { isNil } from "lodash";
import { isEmptyString } from "../../lib/util";
import { IPredictiveTextRepository } from "./PredictiveTextRepository";

export class PredictiveTextService {
    public constructor(private repository: IPredictiveTextRepository) {}

    public getAllPredictions(keys: string): string[] {
        if (isNil(keys) || isEmptyString(keys)) {
            throw new Error("Expected query to contain a string value");
        }

        return this.repository.getAllPredictions(keys)
    }
}
