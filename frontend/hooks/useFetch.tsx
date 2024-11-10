export default async function useFetch() {
    const url = process.env.NEXT_PUBLIC_API;

    try {
        const response = await fetch(`${url}`);
        if (!response.ok) {
            throw new Error('Response not ok');
        }
        const result = await response.json();
        return result;
    } catch (e) {
        throw e;
    }
}
