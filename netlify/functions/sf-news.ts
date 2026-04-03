export async function handler() {
  try {
    // Use Google News RSS feed for Salesforce, parsed via a simple fetch
    const rssUrl = 'https://news.google.com/rss/search?q=Salesforce+CRM+when:3d&hl=en-US&gl=US&ceid=US:en';
    const response = await fetch(rssUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const xml = await response.text();

    // Simple XML parsing for RSS items
    const articles: any[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && articles.length < 15) {
      const itemXml = match[1];

      const getTag = (tag: string) => {
        // Handle both CDATA and non-CDATA content
        const cdataMatch = itemXml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
        if (cdataMatch) return cdataMatch[1].trim();
        const simpleMatch = itemXml.match(new RegExp(`<${tag}[^>]*>([^<]*)<\\/${tag}>`));
        return simpleMatch ? simpleMatch[1].trim() : '';
      };

      const decodeEntities = (str: string) =>
        str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

      const title = decodeEntities(getTag('title'));
      const link = getTag('link');
      const pubDate = getTag('pubDate');
      const source = decodeEntities(getTag('source'));

      // Google News descriptions are HTML junk — strip everything aggressively
      const rawDesc = decodeEntities(getTag('description'));
      const description = rawDesc
        .replace(/<[^>]*>/g, ' ')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/href="[^"]*"/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 200) || '';

      if (title && link) {
        articles.push({
          title,
          url: link,
          source: source || 'Google News',
          publishedAt: pubDate || new Date().toISOString(),
          description,
        });
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=600', // Cache 10 min
      },
      body: JSON.stringify({ articles }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message, articles: [] }),
    };
  }
}
