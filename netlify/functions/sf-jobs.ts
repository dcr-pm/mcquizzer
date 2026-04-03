import type { Handler } from '@netlify/functions';

interface JobItem {
  title: string;
  company: string;
  location: string;
  url: string;
  publishedAt: string;
  source: string;
}

// Cache per query key, TTL 30 minutes
const cache = new Map<string, { data: JobItem[]; timestamp: number }>();
const CACHE_TTL = 1800000;

const handler: Handler = async (event) => {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'RAPIDAPI_KEY not configured', jobs: [] }),
    };
  }

  try {
    const params = event.queryStringParameters || {};
    const cloud = params.cloud || '';
    const role = params.role || '';
    const location = params.location || '';

    // Build search query
    const parts = ['Salesforce'];
    if (cloud) parts.push(cloud);
    if (role && role !== 'Other') parts.push(role);
    const query = parts.join(' ');

    const cacheKey = `${cloud}|${role}|${location}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=600' },
        body: JSON.stringify({ jobs: cached.data }),
      };
    }

    const searchParams = new URLSearchParams({
      query: location ? `${query} ${location}` : query,
      page: '1',
      num_pages: '2',
      date_posted: 'month',
    });

    const res = await fetch(`https://jsearch.p.rapidapi.com/search?${searchParams}`, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      return {
        statusCode: res.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: `JSearch API error: ${res.status}`, jobs: [] }),
      };
    }

    const data = await res.json();
    const jobs: JobItem[] = (data.data || []).map((job: any) => ({
      title: job.job_title || '',
      company: job.employer_name || '',
      location: job.job_city && job.job_state
        ? `${job.job_city}, ${job.job_state}`
        : job.job_city || job.job_state || (job.job_is_remote ? 'Remote' : ''),
      url: job.job_apply_link || job.job_google_link || '',
      publishedAt: job.job_posted_at_datetime_utc || '',
      source: job.job_publisher || 'JSearch',
    })).filter((j: JobItem) => j.title && j.url);

    cache.set(cacheKey, { data: jobs, timestamp: Date.now() });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=600' },
      body: JSON.stringify({ jobs }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'Failed to fetch jobs', jobs: [] }),
    };
  }
};

export { handler };
