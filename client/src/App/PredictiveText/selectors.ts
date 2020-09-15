import { AppState } from "../../store/setup";
import { PredictiveTextState, Suggestion } from "./reducer";
import { hasFailed, Initial, RequestState } from "../../../lib/apiRequests/RequestState";

interface SuggestionKeyOwnProp {
    keys: string;
}

export function selectSuggestionFromKeyOwnProp() {
    return function (appState: AppState, ownProp: SuggestionKeyOwnProp): Suggestion | undefined {
        return getSuggestion(appState, ownProp.keys);
    };
}

export function selectPredictionCountFromOwnProp() {
    return function (appState: AppState, ownProp: SuggestionKeyOwnProp): number {
        return selectPredictionsFromKeyOwnProp()(appState, ownProp).length;
    };
}

export function selectPredictionsFromKeyOwnProp() {
    return function (appState: AppState, ownProp: SuggestionKeyOwnProp): string[] {
        return getSuggestion(appState, ownProp.keys)?.predictions || [];
    };
}

export function selectCurrentPredictionFromOwnProp() {
    return function (appState: AppState, ownProp: SuggestionKeyOwnProp): string {
        const suggestion = getSuggestion(appState, ownProp.keys);
        if (!suggestion) return "";

        const currentPrediction = suggestion.predictions[suggestion.currentPredictionIndex] || null;

        return currentPrediction
            ? currentPrediction
            : hasFailed(suggestion.requestState)
            ? "Failed to find suggestion"
            : "";
    };
}

export function selectRequestStateFromOwnProp() {
    return function (appState: AppState, ownProp: SuggestionKeyOwnProp): RequestState {
        return getSuggestion(appState, ownProp.keys)?.requestState || Initial;
    };
}

function getSuggestion(appState: AppState, key: string): Suggestion | undefined {
    return getSuggestionDictionary(appState)[key];
}

function getSuggestionDictionary(appState: AppState): Dictionary<Suggestion> {
    return selectPredictiveTextState(appState).byId;
}

function selectPredictiveTextState(appState: AppState): PredictiveTextState {
    return appState.predictiveText;
}
