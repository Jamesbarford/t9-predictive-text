import { isNil, union } from "lodash";
import produce from "immer";

import { Initial, Loading, RequestState, Success } from "../../../lib/apiRequests/RequestState";
import { PredictiveTextActions, PredictiveTextActionTypes } from "./actions";

export interface PredictiveTextState {
    initialRequestState: RequestState;
    byId: Dictionary<Suggestion>;
}

export type Suggestion = {
    predictions: string[];
    currentPredictionIndex: number;
    requestState: RequestState;
};

export function initPredictiveTextState(): PredictiveTextState {
    return {
        initialRequestState: Initial,
        byId: {}
    };
}

export function predictiveTextReducer(
    state = initPredictiveTextState(),
    action: PredictiveTextActions
): PredictiveTextState {
    switch (action.type) {
        case PredictiveTextActionTypes.GetPredictionsStart:
            return produce(state, draftState => {
                const suggestion = getSuggestion(draftState, action.keys);

                if (isNil(suggestion)) {
                    draftState.byId[action.keys] = createSuggestion(Loading);
                } else {
                    suggestion.requestState = Loading;
                }
            });

        case PredictiveTextActionTypes.GetPredictionsFailure:
            return produce(state, draftState => {
                const suggestion = getSuggestion(draftState, action.keys);

                if (isNil(suggestion)) {
                    draftState.byId[action.keys] = createSuggestion(action.state);
                } else {
                    suggestion.requestState = action.state;
                }
            });

        case PredictiveTextActionTypes.GetPredictionsSuccess:
            return produce(state, draftState => {
                const suggestion = getSuggestion(draftState, action.keys);

                if (isNil(suggestion)) {
                    draftState.byId[action.keys] = createSuggestion(Success, action.suggestions);
                } else {
                    suggestion.predictions = union(suggestion.predictions, action.suggestions);
                    suggestion.requestState = Success;
                }
            });

        case PredictiveTextActionTypes.SetCurrentPredictionIndex:
            return produce(state, draftState => {
                const suggestion = getSuggestion(draftState, action.keys);

                if (isNil(suggestion)) return;

                suggestion.currentPredictionIndex = action.currentPredictionIndex;
            });

        case PredictiveTextActionTypes.NextPrediction:
            return produce(state, draftState => {
                const suggestion = getSuggestion(draftState, action.keys);

                if (!suggestion) return;

                const nextIndex = ++suggestion.currentPredictionIndex;

                if (nextIndex > suggestion.predictions.length) {
                    suggestion.currentPredictionIndex = 0;
                } else {
                    suggestion.currentPredictionIndex = nextIndex;
                }
            });

        case PredictiveTextActionTypes.PreviousPrediction:
            return produce(state, draftState => {
                const suggestion = getSuggestion(draftState, action.keys);

                if (!suggestion) return;

                const previousIndex = --suggestion.currentPredictionIndex;

                if (previousIndex < 0) {
                    suggestion.currentPredictionIndex = suggestion.predictions.length - 1;
                } else {
                    suggestion.currentPredictionIndex = previousIndex;
                }
            });

        default:
            return state;
    }
}

function getSuggestion(state: PredictiveTextState, key: string): Suggestion | undefined {
    return state.byId[key];
}

export function createSuggestion(requestState: RequestState, suggestions: string[] = []): Suggestion {
    return {
        predictions: suggestions,
        currentPredictionIndex: 0,
        requestState
    };
}
