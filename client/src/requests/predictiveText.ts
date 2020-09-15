import { makeGetRequest } from "../../lib/apiRequests/request";

export function getSuggestions(keys: string): Promise<any> {
    return makeGetRequest(`/predict/${keys}`);
}
