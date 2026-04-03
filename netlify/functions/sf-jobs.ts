import type { Handler } from '@netlify/functions';

interface JobItem {
  title: string;
  company: string;
  location: string;
  url: string;
  publishedAt: string;
  source: string;
}

let cache: { data: JobItem[]; timestamp: number } | null = null;
const CACHE_TTL = 1800000; // 30 minutes

const fetchRemotiveJobs = async (): Promise<JobItem[]> => {
  try {
    const res = await fetch('https://remotive.com/api/remote-jobs?search=salesforce&limit=25');
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.jobs || !Array.isArray(data.jobs)) return [];
    return data.jobs.map((job: any) => ({
      title: job.title || '',
      company: job.company_name || '',
      location: job.candidate_required_location || 'Remote',
      url: job.url || '',
      publishedAt: job.publication_date || '',
      source: 'Remotive',
    }));
  } catch {
    return [];
  }
};

const fetchArbeitnowJobs = async (): Promise<JobItem[]> => {
  try {
    const res = await fetch('https://www.arbeitnow.com/api/job-board-api');
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.data || !Array.isArray(data.data)) return [];
    return data.data
      .filter((job: any) => {
        const text = `${job.title} ${job.description} ${job.tags?.join(' ')}`.toLowerCase();
        return text.includes('salesforce');
      })
      .slice(0, 15)
      .map((job: any) => ({
        title: job.title || '',
        company: job.company_name || '',
        location: job.location || job.remote ? 'Remote' : '',
        url: job.url || '',
        publishedAt: job.created_at ? new Date(job.created_at * 1000).toISOString() : '',
        source: 'Arbeitnow',
      }));
  } catch {
    return [];
  }
};

const handler: Handler = async () => {
  try {
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=600' },
        body: JSON.stringify({ jobs: cache.data }),
      };
    }

    const [remotiveJobs, arbeitnowJobs] = await Promise.all([
      fetchRemotiveJobs(),
      fetchArbeitnowJobs(),
    ]);

    // Combine and sort by date (newest first)
    const allJobs = [...remotiveJobs, ...arbeitnowJobs]
      .filter(j => j.title && j.url)
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime() || 0;
        const dateB = new Date(b.publishedAt).getTime() || 0;
        return dateB - dateA;
      })
      .slice(0, 30);

    cache = { data: allJobs, timestamp: Date.now() };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=600' },
      body: JSON.stringify({ jobs: allJobs }),
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
