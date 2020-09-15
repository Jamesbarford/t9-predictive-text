import thunk, { ThunkDispatch } from "redux-thunk";
import { createStore, combineReducers, AnyAction, applyMiddleware, compose, Action } from "redux";
import { createLogger } from "redux-logger";

import { predictiveTextReducer, PredictiveTextState } from "../App/PredictiveText/reducer";

export type DispatchThunk<E = any> = ThunkDispatch<E, AppState, Action>;

export interface AppState {
    predictiveText: PredictiveTextState;
}

const middleware = applyMiddleware(
    thunk,
    createLogger({
        collapsed(): boolean {
            return true;
        }
    })
);

const reducers = combineReducers<AppState, AnyAction>({
    predictiveText: predictiveTextReducer
});

// === for debugging
const windowObj = window as any;

const enhancers = compose(
    middleware,
    "__REDUX_DEVTOOLS_EXTENSION__" in windowObj ? windowObj.__REDUX_DEVTOOLS_EXTENSION__() : compose
);

export const store = createStore(reducers, enhancers);

if (process.env.NODE_ENV === "development") {
    windowObj.store = store;
    import("lodash").then(_ => (windowObj._ = _));
}
