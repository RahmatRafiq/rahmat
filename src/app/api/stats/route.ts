import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'RahmatRafiq';

export async function GET() {
    const WAKA_KEY = process.env.WAKATIME_API_KEY;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

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
        // Fetch all sources in parallel:
        // - WakaTime last_7_days  → time metrics + daily chart
        // - WakaTime all_time     → language distribution (more representative)
        // - GitHub Search         → total PRs authored
        // - GitHub API            → total public contributions via events
        const [weekStatsRes, allTimeLangRes, summariesRes, prRes] = await Promise.all([
            fetch('https://api.wakatime.com/api/v1/users/current/stats/last_7_days', wakaOpts),
            fetch('https://api.wakatime.com/api/v1/users/current/stats/last_6_months', wakaOpts),
            fetch('https://api.wakatime.com/api/v1/users/current/summaries?range=last_7_days', wakaOpts),
            fetch(`https://api.github.com/search/issues?q=type:pr+author:${GITHUB_USERNAME}&per_page=1`, ghOpts),
        ]);

        const [weekData, allTimeData, summariesData, prData] = await Promise.all([
            weekStatsRes.ok ? weekStatsRes.json() : Promise.resolve({ data: {} }),
            allTimeLangRes.ok ? allTimeLangRes.json() : Promise.resolve({ data: {} }),
            summariesRes.ok ? summariesRes.json() : Promise.resolve({ data: [] }),
            prRes.ok ? prRes.json() : Promise.resolve({ total_count: null }),
        ]);

        const weekStats = weekData.data ?? {};
        const allTimeLangs = allTimeData.data?.languages ?? [];

        // Use all_time languages for better representation of the developer's actual stack
        const languages = allTimeLangs.slice(0, 5).map((lang: { name: string; percent: number }) => ({
            name: lang.name,
            percent: lang.percent,
            color: getLanguageColor(lang.name),
        }));

        // Daily chart from last 7 days summaries
        const dailySeconds: number[] = (summariesData.data ?? []).slice(-7).map(
            (day: { grand_total: { total_seconds: number } }) => day.grand_total.total_seconds
        );
        const maxSec = Math.max(...dailySeconds, 1);
        const chartPercents = dailySeconds.map((s) => Math.round((s / maxSec) * 100));

        // GitHub: total contributions from user profile
        let contributions: string | null = null;
        if (GITHUB_TOKEN) {
            // With token: use GraphQL for accurate year contribution count
            const gqlRes = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: { ...ghHeaders, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `query {
                        user(login: "${GITHUB_USERNAME}") {
                            contributionsCollection {
                                contributionCalendar { totalContributions }
                            }
                        }
                    }`
                }),
                next: { revalidate: 3600 },
            });
            if (gqlRes.ok) {
                const gql = await gqlRes.json();
                const total = gql?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;
                if (total != null) contributions = String(total);
            }
        } else {
            // Without token: approximate from public events (last 100)
            const evRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`, {
                headers: ghHeaders,
                next: { revalidate: 3600 },
            } as RequestInit);
            if (evRes.ok) {
                const events = await evRes.json();
                if (Array.isArray(events)) {
                    contributions = String(events.filter((e: { type: string }) =>
                        ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent'].includes(e.type)
                    ).length);
                }
            }
        }

        return NextResponse.json({
            languages,
            daily_average: weekStats.human_readable_daily_average ?? null,
            total_time: weekStats.human_readable_total ?? null,
            best_day_text: weekStats.best_day?.text ?? null,
            chart: chartPercents,
            chart_hours: dailySeconds.map((s) => (s / 3600).toFixed(1)),
            total_prs: prData.total_count != null ? String(prData.total_count) : null,
            recent_pushes: contributions,
        });

    } catch (error) {
        console.error('Stats Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

function getLanguageColor(name: string) {
    const colors: Record<string, string> = {
        'Go': '#00ADD8', 'Golang': '#00ADD8',
        'PHP': '#FF2D20', 'Laravel': '#FF2D20',
        'TypeScript': '#3178C6',
        'JavaScript': '#F7DF1E',
        'React': '#61DAFB',
        'CSS': '#1572B6',
        'HTML': '#E34F26',
        'PostgreSQL': '#336791', 'SQL': '#4479A1', 'MySQL': '#4479A1',
        'Bash': '#4EAA25', 'Shell': '#4EAA25',
        'Dart': '#00B4AB',
        'Blade Template': '#FF2D20',
        'Markdown': '#083FA1',
        'JSON': '#000000',
        'YAML': '#CB171E',
        'Docker': '#2496ED',
    };
    return colors[name] || '#6366F1';
}
