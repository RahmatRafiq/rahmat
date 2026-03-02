import { MetadataRoute } from 'next';
import { siteConfig } from '../config/site';

export default function robots(): MetadataRoute.Robots {
    const appUrl = siteConfig.url;

    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${appUrl}/sitemap.xml`,
    };
}
