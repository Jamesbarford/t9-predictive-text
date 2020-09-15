export async function makeGetRequest(url: string): Promise<any> {
    const response = await fetch(`/api${url}`);

    try {
        return await response.json();
    } catch (e) {
        throw e;
    }
}
