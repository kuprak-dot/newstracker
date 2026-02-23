export const fetchRssFeed = async (url, sourceName, sourceId) => {
    try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (!data.contents) return [];

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");

        const parseError = xmlDoc.querySelector("parsererror");
        if (parseError) {
            console.error("XML parse error", parseError.textContent);
            return [];
        }

        const items = Array.from(xmlDoc.querySelectorAll("item"));

        return items.map((item, index) => {
            const getElementContent = (tagName) => {
                const node = item.querySelector(tagName);
                return node ? node.textContent : "";
            };

            const title = getElementContent("title") || "";
            const link = getElementContent("link") || "";
            let description = getElementContent("description") || "";
            const pubDate = getElementContent("pubDate") || "";

            // Temizleme işlemleri
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = description;
            const cleanDescription = tempDiv.textContent || tempDiv.innerText || "";

            return {
                id: `news-${sourceId}-${index}-${Date.now()}`,
                title: title.trim(),
                summary: cleanDescription.trim().substring(0, 200) + (cleanDescription.length > 200 ? "..." : ""),
                detail: cleanDescription.trim() || title.trim(),
                date: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
                source: sourceName,
                link: link.trim(),
                trackableEntities: []
            };
        });
    } catch (error) {
        console.error(`Error fetching RSS from ${url}:`, error);
        return [];
    }
};
