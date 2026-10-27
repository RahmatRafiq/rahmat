import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { routing } from '../../../../i18n/routing';
import { siteConfig } from '../../../../config/site';
import { getProjectBySlug, getAllSlugs } from '../../../../data/projects';

export const alt = 'Project';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
    const slugs = getAllSlugs();
    return routing.locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}

export default async function Image({
    params,
}: {
    params: { locale: string; slug: string };
}) {
    const { locale, slug } = params;
    const project = getProjectBySlug(slug);
    const t = await getTranslations({ locale, namespace: 'Projects' });
    const title = project ? t(project.titleKey) : siteConfig.name;

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#060311',
                    padding: '80px',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#818cf8',
                        fontSize: 28,
                        fontWeight: 800,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                    }}
                >
                    {siteConfig.name} · {siteConfig.role}
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 24,
                    }}
                >
                    <div
                        style={{
                            fontSize: 84,
                            fontWeight: 900,
                            color: '#ffffff',
                            lineHeight: 1.05,
                            letterSpacing: '-0.03em',
                            maxWidth: 1000,
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            height: 10,
                            width: 220,
                            borderRadius: 999,
                            background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                        }}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: 30,
                        fontWeight: 700,
                    }}
                >
                    Selected Work · {project?.year ?? ''}
                </div>
            </div>
        ),
        { ...size }
    );
}
