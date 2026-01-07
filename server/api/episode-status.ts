export default defineEventHandler(() => {
    // You can change this value manually:
    // - null: Status nicht bekannt (Waiting for Results)
    // - false: Episode 9 gibt es nicht
    // - "https://netflix.com/..." : Episode 9 gibt es (Netflix Link)

    const episodeReleased = null; // Change to false or Netflix link string

    return {
        released: episodeReleased,
        lastChecked: new Date().toISOString(),
    };
});
