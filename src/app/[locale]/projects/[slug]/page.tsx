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
    const name = t(project.titleKey);
    // Richer SEO title: project name + its key tech tags, so with the layout
    // template ("… | Rahmat Rafiq") it fills the 50–60 char SERP title space.
    // The bare name still drives OG/Twitter (cleaner for share cards).
    const title = `${name} · ${project.tags.slice(0, 3).join(', ')}`;
    // Meta description uses the plain-text summary, not the Markdown body.
    const description = t(project.summaryKey);
    const url = `${siteConfig.url}/${locale}/projects/${slug}`;

    // OG/Twitter previews need a JPG/PNG (WhatsApp & others don't render WebP).
    // The page uses the .webp for speed; share previews use a .jpg sibling with
    // an absolute URL and explicit dimensions so crawlers always render it.
    const ogImage = project.image
        ? {
              url: `${siteConfig.url}${project.image.replace(/\.webp$/, '.jpg')}`,
              width: 1200,
              height: 630,
              alt: name,
          }
        : undefined;

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
            // Clean project name for share cards (the SERP title keeps the tags).
            title: name,
            description,
            // Projects with a screenshot use the JPG; screenshot-less projects
            // fall back to the generated opengraph-image route (omit images).
            ...(ogImage ? { images: [ogImage] } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title: name,
            description,
            ...(ogImage ? { images: [ogImage.url] } : {}),
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
