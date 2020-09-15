import { createError } from "../../../lib/apiRequests/RequestState";

export function toSuggestions(apiResponse: any): string[] {
    const suggestions: string[] = [];

    if (!Array.isArray(apiResponse)) {
        throw createError("Invalid response");
    }

    for (const apiSuggestion of apiResponse) {
        try {
            suggestions.push(String(apiSuggestion));
        } catch (e) {
            console.warn(`Invalid suggestion: ${e.message}`);
        }
    }

    return suggestions;
}
