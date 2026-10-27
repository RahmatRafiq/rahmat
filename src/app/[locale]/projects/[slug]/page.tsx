import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import { Link } from '../../../../i18n/routing';
import { routing } from '../../../../i18n/routing';
import { siteConfig } from '../../../../config/site';
import { getProjectBySlug, getAllSlugs } from '../../../../data/projects';
import ProjectDetail from '../../../../components/projects/ProjectDetail';

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
    const slugs = getAllSlugs();
    return routing.locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { locale, slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return {};

    const t = await getTranslations({ locale, namespace: 'Projects' });
    const title = t(project.titleKey);
    // Meta description uses the plain-text summary, not the Markdown body.
    const description = t(project.summaryKey);
    const url = `${siteConfig.url}/${locale}/projects/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                id: `${siteConfig.url}/id/projects/${slug}`,
                en: `${siteConfig.url}/en/projects/${slug}`,
            },
        },
        openGraph: {
            type: 'article',
            url,
            title,
            description,
            // Projects with a screenshot use it; screenshot-less projects fall
            // back to the generated opengraph-image route automatically (omit images).
            ...(project.image ? { images: [{ url: project.image, alt: title }] } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            ...(project.image ? { images: [project.image] } : {}),
        },
    };
}

export default async function ProjectPage({ params }: { params: Params }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const project = getProjectBySlug(slug);
    if (!project) notFound();

    const t = await getTranslations({ locale, namespace: 'Projects' });

    return (
        <div className="min-h-screen bg-[#060311] relative">
            <Link
                href="/#projects"
                className="absolute top-8 left-8 z-50 flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all text-[10px] font-black tracking-[0.2em] uppercase"
            >
                <ArrowLeft size={16} />
                {t('backToProjects')}
            </Link>
            <div className="max-w-7xl mx-auto">
                <ProjectDetail project={project} variant="page" />
            </div>
        </div>
    );
}
