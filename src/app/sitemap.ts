import { MetadataRoute } from 'next';
import { siteConfig } from '../config/site';

export default function sitemap(): MetadataRoute.Sitemap {
    const appUrl = siteConfig.url;

    return [
        {
            url: `${appUrl}`,
            lastModified: new Date(),
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
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${appUrl}/en`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
    ];
}
