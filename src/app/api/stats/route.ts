import { NextResponse } from 'next/server';

export async function GET() {
    const API_KEY = process.env.WAKATIME_API_KEY;

    if (!API_KEY) {
        return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
    }

    try {
        // Fetching stats for the last 7 days
        const response = await fetch('https://api.wakatime.com/api/v1/users/current/stats/last_7_days', {
            headers: {
                Authorization: `Basic ${Buffer.from(API_KEY).toString('base64')}`,
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from WakaTime');
        }

        const data = await response.json();

        // Transform data into the format expected by our UI
        const stats = {
            languages: data.data.languages.slice(0, 5).map((lang: any) => ({
                name: lang.name,
                percent: lang.percent,
                color: getLanguageColor(lang.name),
            })),
            daily_average: data.data.human_readable_daily_average,
            total_time: data.data.human_readable_total,
            // Mocking activity pulse for now based on actual stats if not available in this endpoint
            // Usually 'daily_summaries' is better for the graph
            activity: data.data.daily_average_seconds || 0,
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('WakaTime Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

function getLanguageColor(name: string) {
    const colors: Record<string, string> = {
        'Golang': '#00ADD8',
        'Go': '#00ADD8',
        'PHP': '#FF2D20',
        'TypeScript': '#3178C6',
        'React': '#61DAFB',
        'JavaScript': '#F7DF1E',
        'CSS': '#1572B6',
        'HTML': '#E34F26',
        'PostgreSQL': '#336791',
        'MySQL': '#4479A1',
    };
    return colors[name] || '#6366F1';
}
