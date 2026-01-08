export default defineSitemapEventHandler(async () => {
    return [
        {
            loc: "/",
            changefreq: "daily",
            priority: 1.0,
            lastmod: new Date().toISOString(),
        },
        {
            loc: "/chat",
            changefreq: "hourly",
            priority: 0.9,
        },
        {
            loc: "/evidence",
            changefreq: "weekly",
            priority: 0.8,
        },
        {
            loc: "/timeline",
            changefreq: "weekly",
            priority: 0.7,
        },
    ];
});
