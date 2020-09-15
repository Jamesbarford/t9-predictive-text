/// <reference types="jest" />

import { flow } from "lodash";

import { initPredictiveTextState, predictiveTextReducer, PredictiveTextState } from "./reducer";
import { getPredictionsFailure, getPredictionsStart, getPredictionsSuccess } from "./actions";
import { createError, hasFailed, Loading, Success } from "../../../lib/apiRequests/RequestState";

describe("predictiveTextReducer", () => {
    let state: PredictiveTextState;
    const KEYS = "5568";
    const SUGGESTIONS = ["hey", "how"];
    const ERROR = "No internet";

    beforeEach(() => {
        state = initPredictiveTextState();
    });

    describe("GetPredictionsStart", () => {
        it("should initialise empty Suggestion", () => {
            const newState = predictiveTextReducer(state, getPredictionsStart(KEYS));

            expect(newState.byId[KEYS].requestState).toEqual(Loading);
            expect(newState.byId[KEYS].suggestions).toEqual([]);
            expect(newState.byId[KEYS].currentSuggestion).toEqual(0);
        });

        it("should only set requestState to Loading", () => {
            const newState = flow(
                s1 => predictiveTextReducer(s1, getPredictionsStart(KEYS)),
                s2 => predictiveTextReducer(s2, getPredictionsSuccess(KEYS, SUGGESTIONS)),
                s3 => predictiveTextReducer(s3, getPredictionsStart(KEYS))
            )(state);

            expect(newState.byId[KEYS].requestState).toEqual(Loading);
            expect(newState.byId[KEYS].suggestions).toEqual(SUGGESTIONS);
        });
    });

    describe("GetPredictionsFailure", () => {
        it("should create a Suggestion with a failed state", () => {
            const newState = predictiveTextReducer(
                state,
                getPredictionsFailure(KEYS, createError(ERROR))
            );

            expect(hasFailed(newState.byId[KEYS].requestState)).toBe(true);
            expect(newState.byId[KEYS].requestState?.error?.message).toBe(ERROR);
        });

        it("should set requestState to Failed if Suggestion exists", () => {
            const newState = flow(
                s1 => predictiveTextReducer(s1, getPredictionsStart(KEYS)),
                s2 => predictiveTextReducer(s2, getPredictionsFailure(KEYS, createError(ERROR)))
            )(state);

            expect(hasFailed(newState.byId[KEYS].requestState)).toBe(true);
            expect(newState.byId[KEYS].requestState?.error?.message).toBe(ERROR);
        });
    });

    describe("GetPredictionsSuccess", () => {
        it("should create a Suggestion with a loaded state", () => {
            const newState = predictiveTextReducer(state, getPredictionsSuccess(KEYS, SUGGESTIONS));

            expect(newState.byId[KEYS].requestState).toEqual(Success);
            expect(newState.byId[KEYS].suggestions).toEqual(SUGGESTIONS);
            expect(newState.byId[KEYS].currentSuggestion).toBe(0);
        });

        it("should set requestState to Success if Suggestion exists", () => {
            const newState = flow(
                s1 => predictiveTextReducer(s1, getPredictionsStart(KEYS)),
                s2 => predictiveTextReducer(s2, getPredictionsSuccess(KEYS, SUGGESTIONS))
            )(state);

            expect(newState.byId[KEYS].requestState).toEqual(Success);
            expect(newState.byId[KEYS].suggestions).toEqual(SUGGESTIONS);
        });
    });
});
