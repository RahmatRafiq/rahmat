import {
    Database,
    Globe,
    Package,
    ShieldCheck,
    Zap,
    ChefHat,
    ShoppingCart,
    Wallet,
    Users,
    type LucideIcon,
} from 'lucide-react';

export type ProjectLinks = { demo?: string; github?: string; npm?: string };

/**
 * A highlighted feature rendered with a lucide icon on the full page.
 * `iconName` keys into PROJECT_ICONS; `titleKey`/`textKey` are i18n keys.
 */
export interface ProjectFeature {
    iconName: string;
    titleKey: string;
    textKey: string;
}

export interface ProjectMeta {
    slug: string;
    titleKey: string;
    /** Short plain-text summary (panel + meta description). */
    summaryKey: string;
    /** Full description in Markdown (full page). */
    descKey: string;
    /** Optional structured feature list (icon + title + text) for the full page. */
    features?: ProjectFeature[];
    categoryIndex: 0 | 1 | 2 | 3;
    year: string;
    tags: string[];
    iconName: string;
    image?: string;
    detailImages?: string[];
    links: ProjectLinks;
    color: string;
    span?: string;
}

/**
 * Icon lookup so project data can stay serialisable (a string name instead
 * of a component reference) and be read by both server and client code.
 */
export const PROJECT_ICONS: Record<string, LucideIcon> = {
    Database,
    Globe,
    Package,
    ShieldCheck,
    Zap,
    ChefHat,
    ShoppingCart,
    Wallet,
    Users,
};

/**
 * Single source of truth for project metadata. Titles/descriptions live in
 * the i18n message catalogues (keys below); everything else is here.
 *
 * Slugs are a permanent public contract — do not change them (shared links
 * would break). Order matches the previous inline list in Projects.tsx.
 */
export const projects: ProjectMeta[] = [
    {
        slug: 'husnul-bakery-erp',
        titleKey: 'p10_title',
        summaryKey: 'p10_summary',
        descKey: 'p10_desc',
        features: [
            { iconName: 'ChefHat', titleKey: 'p10_f1_t', textKey: 'p10_f1_d' },
            { iconName: 'Package', titleKey: 'p10_f2_t', textKey: 'p10_f2_d' },
            { iconName: 'ShoppingCart', titleKey: 'p10_f3_t', textKey: 'p10_f3_d' },
            { iconName: 'Wallet', titleKey: 'p10_f4_t', textKey: 'p10_f4_d' },
            { iconName: 'Users', titleKey: 'p10_f5_t', textKey: 'p10_f5_d' },
            { iconName: 'ShieldCheck', titleKey: 'p10_f6_t', textKey: 'p10_f6_d' },
        ],
        categoryIndex: 0,
        year: '2026',
        tags: ['Laravel 12', 'Inertia', 'React', 'TypeScript', 'Real-time KDS'],
        iconName: 'Database',
        image: '/projects/husnul-dashboard.webp',
        detailImages: ['/projects/husnul-landing.webp'],
        links: { demo: 'https://husnulbakery.id/' },
        color: 'from-amber-600/20 to-orange-700/20',
        span: 'lg:col-span-12 lg:row-span-2',
    },
    {
        slug: 'just-fun-tournament',
        titleKey: 'p9_title',
        summaryKey: 'p9_summary',
        descKey: 'p9_desc',
        categoryIndex: 0,
        year: '2026',
        tags: ['React', 'Next.js', 'Real-time Live Data'],
        iconName: 'Zap',
        image: '/projects/justfun-tactical.webp',
        detailImages: ['/projects/justfungame.webp'],
        links: { demo: 'https://just-fun-makassar.vercel.app/' },
        color: 'from-orange-500/20 to-red-600/20',
        span: 'lg:col-span-8 lg:row-span-2',
    },
    {
        slug: 'bouquet-builder',
        titleKey: 'p7_title',
        summaryKey: 'p7_summary',
        descKey: 'p7_desc',
        categoryIndex: 0,
        year: '2026',
        tags: ['React', 'Next.js', 'Vercel'],
        iconName: 'Package',
        image: '/projects/bouquet.webp',
        links: { demo: 'https://bouquet-builder.vercel.app/bouquet-builder' },
        color: 'from-pink-500/20 to-rose-500/20',
        span: 'lg:col-span-4 lg:row-span-1',
    },
    {
        slug: 'kemafar',
        titleKey: 'p1_title',
        summaryKey: 'p1_summary',
        descKey: 'p1_desc',
        categoryIndex: 0,
        year: '2026',
        tags: ['Supabase', 'Next.js', 'RLS'],
        iconName: 'Globe',
        image: '/projects/kemafar.webp',
        links: { demo: 'http://kemafar.org/' },
        color: 'from-blue-600/20 to-indigo-600/20',
        span: 'lg:col-span-4 lg:row-span-1',
    },
    {
        slug: 'typing-test',
        titleKey: 'p2_title',
        summaryKey: 'p2_summary',
        descKey: 'p2_desc',
        categoryIndex: 0,
        year: '2026',
        tags: ['React', 'Next.js'],
        iconName: 'Zap',
        image: '/projects/typingtest.webp',
        links: { demo: 'https://typingtest-olive.vercel.app/' },
        color: 'from-amber-500/20 to-orange-600/20',
        span: 'lg:col-span-4 lg:row-span-1',
    },
    {
        slug: 'vehicle-seatpicker',
        titleKey: 'p3_title',
        summaryKey: 'p3_summary',
        descKey: 'p3_desc',
        categoryIndex: 2,
        year: '2025',
        tags: ['React', 'TypeScript', 'NPM'],
        iconName: 'ShieldCheck',
        image: '/projects/bangbeli.webp',
        links: {
            github: 'https://github.com/RahmatRafiq/react-vehicle-seatpicker',
            npm: 'https://www.npmjs.com/package/react-vehicle-seatpicker',
        },
        color: 'from-blue-500/20 to-cyan-500/20',
        span: 'lg:col-span-6 lg:row-span-1',
    },
    {
        slug: 'nextjs-supabase-starter',
        titleKey: 'p4_title',
        summaryKey: 'p4_summary',
        descKey: 'p4_desc',
        categoryIndex: 1,
        year: '2026',
        tags: ['Next.js', 'Supabase'],
        iconName: 'Package',
        links: { github: 'https://github.com/RahmatRafiq/nextjs-supabase-starter' },
        color: 'from-emerald-500/20 to-teal-500/20',
        span: 'lg:col-span-6 lg:row-span-1',
    },
    {
        slug: 'laravel-12-starter-kit',
        titleKey: 'p5_title',
        summaryKey: 'p5_summary',
        descKey: 'p5_desc',
        categoryIndex: 1,
        year: '2025',
        tags: ['Laravel 12', 'React 19', 'Inertia'],
        iconName: 'Database',
        links: { github: 'https://github.com/RahmatRafiq/laravel-12-spattie-media-and-roles' },
        color: 'from-orange-500/20 to-red-500/20',
        span: 'lg:col-span-4 lg:row-span-1',
    },
    {
        slug: 'golang-starter-kit',
        titleKey: 'p6_title',
        summaryKey: 'p6_summary',
        descKey: 'p6_desc',
        categoryIndex: 1,
        year: '2025',
        tags: ['Golang', 'Gin', 'GORM'],
        iconName: 'ShieldCheck',
        links: { github: 'https://github.com/RahmatRafiq/golang_strarter_kit_2025' },
        color: 'from-blue-500/20 to-violet-500/20',
        span: 'lg:col-span-8 lg:row-span-1',
    },
    {
        slug: 'comment-spam-detection',
        titleKey: 'p8_title',
        summaryKey: 'p8_summary',
        descKey: 'p8_desc',
        categoryIndex: 3,
        year: '2026',
        tags: ['Laravel', 'React', 'Machine Learning', 'API Safety'],
        iconName: 'ShieldCheck',
        image: '/projects/youtube-guard-2.webp',
        links: {},
        color: 'from-violet-600/20 to-indigo-600/20',
        span: 'lg:col-span-12 lg:row-span-2',
    },
];

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
    return projects.map((p) => p.slug);
}
