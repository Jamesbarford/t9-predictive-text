import { createError } from "./RequestState";

export async function makeGetRequest(url: string): Promise<any> {
    const response = await fetch(`/api${url}`);

    try {
        return await response.json();
    } catch (e) {
        createError("Failed to make request");
    }
}
