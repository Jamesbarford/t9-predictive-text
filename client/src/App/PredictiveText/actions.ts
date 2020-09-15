import { Action } from "redux";
import { RequestStateFailed } from "../../../lib/apiRequests/RequestState";

export const enum PredictiveTextActionTypes {
    GetPredictionsStart = "PredictiveText.GetPredictionsStart",
    GetPredictionsFailure = "PredictiveText.GetPredictionsFailure",
    GetPredictionsSuccess = "PredictiveText.GetPredictionsSuccess"
}

interface GetPredictionsStart extends Action {
    type: PredictiveTextActionTypes.GetPredictionsStart;
    keys: string;
}
export function getPredictionsStart(keys: string): GetPredictionsStart {
    return {
        type: PredictiveTextActionTypes.GetPredictionsStart,
        keys
    };
}

interface GetPredictionsFailure extends Action {
    type: PredictiveTextActionTypes.GetPredictionsFailure;
    keys: string;
    state: RequestStateFailed;
}
export function getPredictionsFailure(keys: string, state: RequestStateFailed): GetPredictionsFailure {
    return {
        type: PredictiveTextActionTypes.GetPredictionsFailure,
        keys,
        state
    };
}

interface GetPredictionsSuccess extends Action {
    type: PredictiveTextActionTypes.GetPredictionsSuccess;
    suggestions: string[];
    keys: string;
}
export function getPredictionsSuccess(keys: string, suggestions: string[]): GetPredictionsSuccess {
    return {
        type: PredictiveTextActionTypes.GetPredictionsSuccess,
        keys,
        suggestions
    };
}

export type PredictiveTextActions = GetPredictionsStart | GetPredictionsFailure | GetPredictionsSuccess;
