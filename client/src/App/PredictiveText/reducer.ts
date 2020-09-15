import { Action } from "redux";

import { Initial, RequestState } from "../../../lib/apiRequests/RequestState";

export interface PredictiveTextState {
    initialRequestState: RequestState;
    byId: Dictionary<Suggestion>;
}

type Suggestion = {
    suggestions: string[];
    currentSuggestion: number;
    requestState: RequestState;
};

function initState(): PredictiveTextState {
    return {
        initialRequestState: Initial,
        byId: {}
    };
}

export function predictiveTextReducer(state = initState(), action: Action): PredictiveTextState {
    if (action) return state;
    return state;
}
