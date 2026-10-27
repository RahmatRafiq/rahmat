import { MetadataRoute } from 'next';
import { siteConfig } from '../config/site';
import { routing } from '../i18n/routing';
import { getAllSlugs } from '../data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
    const appUrl = siteConfig.url;
    const lastModified = new Date();

    const base: MetadataRoute.Sitemap = [
        {
            url: `${appUrl}`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 1,
            alternates: {
                languages: {
                    id: `${appUrl}/id`,
                    en: `${appUrl}/en`,
                },
            },
        },
        {
            url: `${appUrl}/id`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${appUrl}/en`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
    ];

    const projectPages: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
        getAllSlugs().map((slug) => ({
            url: `${appUrl}/${locale}/projects/${slug}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    );

    return [...base, ...projectPages];
}
