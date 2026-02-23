export const fetchRssFeed = async (url, sourceName, sourceId) => {
    try {
        // En istikrarlı RSS parse yöntemi: rss2json API
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.status !== 'ok' || !data.items) {
            console.error(`RSS2JSON Error for ${url}:`, data.message);
            return [];
        }

        return data.items.map((item, index) => {
            const title = item.title || "";
            const link = item.link || "";
            let description = item.description || item.content || "";
            const pubDate = item.pubDate || "";

            // HTML etiketlerini temizleme işlemi
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = description;
            const cleanDescription = tempDiv.textContent || tempDiv.innerText || "";

            const finalTitle = title.trim();
            const finalDesc = cleanDescription.trim();
            const finalLink = link.trim();

            return {
                id: `news-${sourceId}-${index}-${Date.now()}`,
                title: finalTitle,
                summary: finalDesc.substring(0, 200) + (finalDesc.length > 200 ? "..." : ""),
                detail: finalDesc || finalTitle,
                date: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
                source: sourceName,
                link: finalLink,
                trackableEntities: []
            };
        });
    } catch (error) {
        console.error(`Error fetching RSS from ${url}:`, error);
        return [];
    }
};
