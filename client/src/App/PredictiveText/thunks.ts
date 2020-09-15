import { Dispatch } from "redux";

import { createError } from "../../../lib/apiRequests/RequestState";
import { getPredictionsFailure, getPredictionsStart, getPredictionsSuccess } from "./actions";
import { getSuggestions } from "../../requests/predictiveText";
import { toSuggestions } from "./apiConverter";

export function getPredictionsThunk(keys: string) {
    return async function (dispatch: Dispatch): Promise<void> {

        try {
            const sanitizedKeys = sanitizeKeys(keys);
            dispatch(getPredictionsStart(sanitizedKeys));

            const apiResponse = await getSuggestions(sanitizedKeys);
            const predictions = toSuggestions(apiResponse);
            dispatch(getPredictionsSuccess(sanitizedKeys, predictions));
        } catch (e) {
            dispatch(getPredictionsFailure(keys, createError("Failed to get predictions", e)));
            return;
        }
    };
}

function sanitizeKeys(keys: string | number): string {
    const keyArr = String(keys).split("");

    return String(
        keyArr
            .map(key => {
                const parsed = Number(key);
                if (isNaN(parsed) || !isFinite(parsed)) {
                    throw createError("Keys must be numbers");
                }

                return parsed;
            })
            .join("")
    );
}
