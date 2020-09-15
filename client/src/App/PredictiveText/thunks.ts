import { Dispatch } from "redux";
import { createError } from "../../../lib/apiRequests/RequestState";
import { getPredictionsFailure, getPredictionsStart, getPredictionsSuccess } from "./actions";
import { getSuggestions } from "../../requests/predictiveText";
import { toSuggestions } from "./apiConverter";

export function getSuggestionsThunk(keys: string) {
    return async function (dispatch: Dispatch): Promise<void> {
        try {
            const sanitizedKeys = sanitizeKeys(keys);
            dispatch(getPredictionsStart(sanitizedKeys));

            const apiResponse = await getSuggestions(sanitizedKeys);
            const suggestions = toSuggestions(apiResponse);
            dispatch(getPredictionsSuccess(sanitizedKeys, suggestions));
        } catch (e) {
            dispatch(getPredictionsFailure(keys, e));
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
