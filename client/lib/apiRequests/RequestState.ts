export const enum RequestStates {
    INITIAL = "initial",
    LOADING = "loading",
    SUCCESS = "success",
    FAILED = "failed"
}

export interface RequestState<Error = RequestError> {
    state: RequestStates;
    error?: Error;
}

export interface RequestStateFailed extends RequestState {
    state: RequestStates.FAILED;
    error: RequestError;
}

type RequestError = {
    message: string;
    info: any;
};

export function createError(error: string, info?: any): RequestStateFailed {
    return {
        state: RequestStates.FAILED,
        error: {
            message: error,
            info
        }
    };
}

export const Loading = Object.freeze({
    state: RequestStates.LOADING
});

export const Initial = Object.freeze({
    state: RequestStates.LOADING
});

export const Success = Object.freeze({
    state: RequestStates.LOADING
});

export function hasFailed(s: RequestState): s is RequestStateFailed {
    return "error" in s && s.state === RequestStates.FAILED;
}
