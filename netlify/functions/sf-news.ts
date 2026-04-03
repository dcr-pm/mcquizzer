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
        const tagMatch = itemXml.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?(.*?)(?:\\]\\]>)?<\\/${tag}>`));
        return tagMatch ? tagMatch[1].trim() : '';
      };

      const title = getTag('title').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
      const link = getTag('link');
      const pubDate = getTag('pubDate');
      const source = getTag('source');
      // Decode entities first, then strip all HTML tags and URLs
      const rawDesc = getTag('description')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      const description = rawDesc
        .replace(/<[^>]*>/g, ' ')
        .replace(/https?:\/\/\S+/g, '')
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
