import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'RahmatRafiq';

export async function GET() {
    const WAKA_KEY = process.env.WAKATIME_API_KEY;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!WAKA_KEY) {
        return NextResponse.json({ error: 'WakaTime API Key not configured' }, { status: 500 });
    }

    const wakaAuth = `Basic ${Buffer.from(WAKA_KEY).toString('base64')}`;
    const ghAuth = GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : undefined;

    try {
        // 3 parallel fetches: 7-day (time metrics + chart), 30-day (languages), GitHub PRs
        const [statsRes, langRes, summariesRes, prRes] = await Promise.all([
            fetch('https://api.wakatime.com/api/v1/users/current/stats/last_7_days', {
                headers: { Authorization: wakaAuth }, next: { revalidate: 3600 },
            } as RequestInit),
            fetch('https://api.wakatime.com/api/v1/users/current/stats/last_30_days', {
                headers: { Authorization: wakaAuth }, next: { revalidate: 3600 },
            } as RequestInit),
            fetch('https://api.wakatime.com/api/v1/users/current/summaries?range=last_7_days', {
                headers: { Authorization: wakaAuth }, next: { revalidate: 3600 },
            } as RequestInit),
            fetch(`https://api.github.com/search/issues?q=type:pr+author:${GITHUB_USERNAME}&per_page=1`, {
                headers: {
                    Accept: 'application/vnd.github+json',
                    ...(ghAuth ? { Authorization: ghAuth } : {}),
                },
                next: { revalidate: 3600 },
            } as RequestInit),
        ]);

        const [statsData, langData, summariesData, prData] = await Promise.all([
            statsRes.ok ? statsRes.json() : null,
            langRes.ok ? langRes.json() : null,
            summariesRes.ok ? summariesRes.json() : null,
            prRes.ok ? prRes.json() : null,
        ]);

        const week = statsData?.data ?? {};
        // Use 30-day for language distribution (more representative); fall back to 7-day
        const rawLangs: Array<{ name: string; percent: number }> =
            langData?.data?.languages?.length
                ? langData.data.languages
                : (week.languages ?? []);

        // GitHub contributions via GraphQL (requires token)
        let totalContributions: string | null = null;
        if (GITHUB_TOKEN) {
            try {
                const gqlRes = await fetch('https://api.github.com/graphql', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: `query { user(login: "${GITHUB_USERNAME}") {
                            contributionsCollection {
                                contributionCalendar { totalContributions }
                            }
                        }}`
                    }),
                    next: { revalidate: 3600 },
                } as RequestInit);
                if (gqlRes.ok) {
                    const gql = await gqlRes.json();
                    const total = gql?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;
                    if (total != null) totalContributions = String(total);
                }
            } catch { /* ignore */ }
        }

        // Bar chart from daily summaries
        const dailySec: number[] = (summariesData?.data ?? []).slice(-7).map(
            (d: { grand_total: { total_seconds: number } }) => d.grand_total.total_seconds
        );
        const maxSec = Math.max(...dailySec, 1);

        return NextResponse.json({
            // Language Pulse (30-day = more representative of actual stack)
            languages: rawLangs.slice(0, 5).map((l) => ({
                name: l.name,
                percent: l.percent,
                color: getColor(l.name),
            })),
            // Time metrics (last 7 days)
            total_time: week.human_readable_total ?? null,
            daily_average: week.human_readable_daily_average ?? null,
            best_day_text: week.best_day?.text ?? null,
            // Bar chart
            chart: dailySec.map((s) => Math.round((s / maxSec) * 100)),
            chart_hours: dailySec.map((s) => (s / 3600).toFixed(1)),
            // GitHub
            total_prs: prData?.total_count != null ? String(prData.total_count) : null,
            contributions: totalContributions,
        });

    } catch (err) {
        console.error('Stats API error:', err);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}

function getColor(name: string): string {
    const map: Record<string, string> = {
        Go: '#00ADD8', Golang: '#00ADD8',
        PHP: '#FF2D20', 'Blade Template': '#FF2D20',
        TypeScript: '#3178C6', JavaScript: '#F7DF1E',
        CSS: '#1572B6', HTML: '#E34F26',
        SQL: '#4479A1', MySQL: '#4479A1', PostgreSQL: '#336791',
        Bash: '#4EAA25', Shell: '#4EAA25',
        Markdown: '#083FA1', JSON: '#6c6c6c',
        Dart: '#00B4AB', YAML: '#CB171E',
    };
    return map[name] ?? '#6366F1';
}
