import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'RahmatRafiq';

export async function GET() {
    const WAKA_KEY = process.env.WAKATIME_API_KEY;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // optional but recommended to avoid rate limits

    if (!WAKA_KEY) {
        return NextResponse.json({ error: 'WakaTime API Key not configured' }, { status: 500 });
    }

    const wakaHeaders = {
        Authorization: `Basic ${Buffer.from(WAKA_KEY).toString('base64')}`,
    };
    const wakaOpts = { headers: wakaHeaders, next: { revalidate: 3600 } } as RequestInit;

    const ghHeaders: Record<string, string> = {
        Accept: 'application/vnd.github+json',
    };
    if (GITHUB_TOKEN) ghHeaders['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    const ghOpts = { headers: ghHeaders, next: { revalidate: 3600 } } as RequestInit;

    try {
        // Fetch WakaTime + GitHub data in parallel
        const [statsRes, summariesRes, prRes, contribRes] = await Promise.all([
            fetch('https://api.wakatime.com/api/v1/users/current/stats/last_7_days', wakaOpts),
            fetch('https://api.wakatime.com/api/v1/users/current/summaries?range=last_7_days', wakaOpts),
            fetch(`https://api.github.com/search/issues?q=type:pr+author:${GITHUB_USERNAME}&per_page=1`, ghOpts),
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`, ghOpts),
        ]);

        if (!statsRes.ok) throw new Error('Failed to fetch WakaTime stats');
        if (!summariesRes.ok) throw new Error('Failed to fetch WakaTime summaries');

        const [statsData, summariesData, prData, contribData] = await Promise.all([
            statsRes.json(),
            summariesRes.json(),
            prRes.ok ? prRes.json() : Promise.resolve({ total_count: null }),
            contribRes.ok ? contribRes.json() : Promise.resolve([]),
        ]);

        const s = statsData.data;

        // Bar chart from daily summaries
        const dailyChart: number[] = (summariesData.data ?? []).slice(-7).map(
            (day: { grand_total: { total_seconds: number } }) => day.grand_total.total_seconds
        );
        const maxSeconds = Math.max(...dailyChart, 1);
        const chartPercents = dailyChart.map((sec) => Math.round((sec / maxSeconds) * 100));

        // Count push events as proxy for contributions (last 100 events)
        const pushEvents = Array.isArray(contribData)
            ? contribData.filter((e: { type: string }) => e.type === 'PushEvent').length
            : 0;

        const stats = {
            languages: (s.languages ?? []).slice(0, 5).map((lang: { name: string; percent: number }) => ({
                name: lang.name,
                percent: lang.percent,
                color: getLanguageColor(lang.name),
            })),
            daily_average: s.human_readable_daily_average ?? '—',
            total_time: s.human_readable_total ?? '—',
            best_day_text: s.best_day?.text ?? '—',
            chart: chartPercents,
            chart_hours: dailyChart.map((sec) => (sec / 3600).toFixed(1)),
            // GitHub Stats
            total_prs: prData.total_count !== null ? String(prData.total_count) : null,
            recent_pushes: pushEvents > 0 ? String(pushEvents) : null,
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Stats Error:', error);
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
        'SQL': '#4479A1',
        'Bash': '#4EAA25',
        'Shell': '#4EAA25',
        'Dart': '#00B4AB',
    };
    return colors[name] || '#6366F1';
}
