import { Action } from "redux";
import { RequestStateFailed } from "../../../lib/apiRequests/RequestState";

export const enum PredictiveTextActionTypes {
    GetPredictionsStart = "PredictiveText.GetPredictionsStart",
    GetPredictionsFailure = "PredictiveText.GetPredictionsFailure",
    GetPredictionsSuccess = "PredictiveText.GetPredictionsSuccess",
    SetCurrentPredictionIndex = "PredictiveText.SetCurrentPredictionIndex"
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

interface SetCurrentPredictionIndex extends Action {
    type: PredictiveTextActionTypes.SetCurrentPredictionIndex;
    keys: string;
    currentPredictionIndex: number;
}
export function setCurrentPredictionIndex(
    keys: string,
    currentPredictionIndex: number
): SetCurrentPredictionIndex {
    return {
        type: PredictiveTextActionTypes.SetCurrentPredictionIndex,
        keys,
        currentPredictionIndex
    };
}

export type PredictiveTextActions =
    | GetPredictionsStart
    | GetPredictionsFailure
    | GetPredictionsSuccess
    | SetCurrentPredictionIndex;
