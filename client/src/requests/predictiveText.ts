import { getRequest } from "../../lib/apiRequests/MakeXMLHttpRequest";

export function getSuggestions(keys: string): Promise<any> {
    return getRequest(`/predict/${keys}`);
}
