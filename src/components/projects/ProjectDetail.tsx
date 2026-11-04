'use client';

import React from 'react';
import { m } from 'framer-motion';
import { ArrowUpRight, Github, Package, ChevronRight, Share2, Check } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../lib/utils';
import { Link } from '../../i18n/routing';
import { PROJECT_ICONS, type ProjectMeta } from '../../data/projects';

/** Icon-only share button: copies the project's full-page URL to the clipboard. */
function ShareIconButton({ slug, copiedLabel }: { slug: string; copiedLabel: string }) {
    const locale = useLocale();
    const [copied, setCopied] = React.useState(false);

    const handleShare = async () => {
        const url =
            typeof window !== 'undefined'
                ? `${window.location.origin}/${locale}/projects/${slug}`
                : `/${locale}/projects/${slug}`;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard blocked (e.g. insecure context) — select-free fallback.
            window.prompt(copiedLabel, url);
        }
    };

    return (
        <button
            onClick={handleShare}
            aria-label={copied ? copiedLabel : 'Share'}
            title={copied ? copiedLabel : 'Share'}
            className={cn(iconBtn, copied ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' : 'bg-secondary border-border text-foreground hover:bg-muted')}
        >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
        </button>
    );
}

interface ProjectDetailProps {
    project: ProjectMeta;
    variant: 'page' | 'panel';
}

/** Shared pill-button sizing — compact in the panel, roomy on the full page. */
const btnBase = 'w-full rounded-md font-black tracking-[0.2em] uppercase transition-all flex items-center justify-center';
const btnSize = (compact?: boolean) => (compact ? 'py-3.5 text-[10px] gap-2.5' : 'py-6 text-xs gap-4');

function ActionLinks({ project, t, compact }: { project: ProjectMeta; t: ReturnType<typeof useTranslations>; compact?: boolean }) {
    const iconSize = compact ? 16 : 20;
    return (
        <>
            {project.links.demo && (
                <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(btnBase, btnSize(compact), 'bg-primary text-primary-foreground hover:bg-accent shadow-2xl shadow-black/20 group/btn')}
                >
                    {t('livePreview')}
                    <ArrowUpRight size={iconSize} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
            )}
            {project.links.github && (
                <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(btnBase, btnSize(compact), 'bg-secondary border border-border text-foreground hover:bg-muted')}
                >
                    <Github size={iconSize} />
                    GitHub Repository
                </a>
            )}
            {project.links.npm && (
                <a
                    href={project.links.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(btnBase, btnSize(compact), 'bg-[#CB3837]/20 border border-[#CB3837]/30 text-[#CB3837] hover:bg-[#CB3837]/30')}
                >
                    <Package size={iconSize} />
                    NPM Package
                </a>
            )}
        </>
    );
}

/** Secondary actions as small round icon buttons (used in the compact panel). */
const iconBtn = 'h-12 w-12 rounded-full flex items-center justify-center border transition-all active:scale-95';

function IconActionLinks({ project }: { project: ProjectMeta }) {
    return (
        <>
            {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" aria-label="Live preview"
                    className={cn(iconBtn, 'bg-primary border-primary/40 text-foreground hover:bg-accent')}>
                    <ArrowUpRight size={18} />
                </a>
            )}
            {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository"
                    className={cn(iconBtn, 'bg-secondary border-border text-foreground hover:bg-muted')}>
                    <Github size={18} />
                </a>
            )}
            {project.links.npm && (
                <a href={project.links.npm} target="_blank" rel="noopener noreferrer" aria-label="NPM package"
                    className={cn(iconBtn, 'bg-[#CB3837]/20 border-[#CB3837]/30 text-[#CB3837] hover:bg-[#CB3837]/30')}>
                    <Package size={18} />
                </a>
            )}
        </>
    );
}

/** Markdown renderer styled for the dark theme (paragraphs, bullet lists, bold). */
function MarkdownDescription({ markdown, size }: { markdown: string; size: 'panel' | 'page' }) {
    const base = size === 'page' ? 'text-lg md:text-xl' : 'text-sm';
    return (
        <div className={cn('flex flex-col gap-5 text-muted-foreground font-medium leading-[1.7]', base)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    p: ({ children }) => <p className="text-muted-foreground">{children}</p>,
                    strong: ({ children }) => <strong className="text-foreground font-bold">{children}</strong>,
                    ul: ({ children }) => <ul className="flex flex-col gap-3 list-none">{children}</ul>,
                    ol: ({ children }) => <ol className="flex flex-col gap-3 list-decimal pl-5">{children}</ol>,
                    li: ({ children }) => (
                        <li className="flex gap-3 items-start">
                            <span className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            <span className="flex-1">{children}</span>
                        </li>
                    ),
                    a: ({ children, href }) => (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:text-primary">
                            {children}
                        </a>
                    ),
                    h2: ({ children }) => <h2 className="text-foreground font-black text-2xl mt-4">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-foreground font-black text-xl mt-2">{children}</h3>,
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
}

export default function ProjectDetail({ project, variant }: ProjectDetailProps) {
    const t = useTranslations('Projects');
    const categories = [t('cat1'), t('cat2'), t('cat3'), t('cat4')];
    const Icon = PROJECT_ICONS[project.iconName];
    const title = t(project.titleKey);
    const summary = t(project.summaryKey);
    const description = t(project.descKey);
    const category = categories[project.categoryIndex];

    if (variant === 'panel') {
        // Panel = SUMMARY only, with a CTA to the full detail page.
        return (
            <div className="flex flex-col">
                {/* Hero image */}
                <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-b from-primary/10 to-transparent shrink-0">
                    <div className={cn('absolute inset-0 bg-gradient-to-br opacity-40', project.color)} />
                    {project.image ? (
                        <img src={project.image} alt={title} className="w-full h-full object-cover object-center" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            {Icon && <Icon size={80} className="text-muted-foreground/60" />}
                        </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
                </div>

                <div className="px-8 py-10 flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/20">
                            {category}
                        </span>
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-muted-foreground/60 border-l border-border pl-4">
                            {project.year}
                        </span>
                    </div>

                    <h2 className="text-4xl font-black tracking-tighter leading-none">{title}</h2>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-4 py-2 rounded-full bg-secondary border border-border text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Short summary (plain text) */}
                    <p className="text-base text-muted-foreground leading-[1.7] font-medium">{summary}</p>

                    <div className="flex flex-col gap-3 pt-2">
                        {/* Primary CTA: go to the full detail page (real route w/ URL) */}
                        <Link
                            href={`/projects/${project.slug}`}
                            className={cn(btnBase, btnSize(true), 'bg-primary text-primary-foreground hover:bg-accent shadow-2xl shadow-black/20 group/cta')}
                        >
                            {t('viewDetails')}
                            <ChevronRight size={16} className="group-hover/cta:translate-x-1 transition-transform" />
                        </Link>
                        {/* Secondary actions as small icon buttons */}
                        <div className="flex items-center gap-3">
                            <ShareIconButton slug={project.slug} copiedLabel={t('shareCopied')} />
                            <IconActionLinks project={project} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // variant === 'page' — wide 2-column layout, full Markdown description
    return (
        <div className="flex flex-col">
            <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden bg-gradient-to-b from-primary/10 to-transparent">
                <div className={cn('absolute inset-0 bg-gradient-to-br opacity-40', project.color)} />
                {project.image ? (
                    <m.img
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        src={project.image}
                        alt={title}
                        className="w-full h-full object-cover object-center"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        {Icon && <Icon size={120} className="text-muted-foreground/60" />}
                    </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="px-8 md:px-24 py-20">
                <div className="flex items-center gap-6 mb-10">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase px-6 py-2 rounded-full bg-primary/20 text-primary border border-primary/20">
                        {category}
                    </span>
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground/60 border-l border-border pl-6">
                        {project.year}
                    </span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-none">{title}</h1>

                <div className="flex flex-wrap gap-4 mb-16">
                    {project.tags.map((tag) => (
                        <span key={tag} className="px-6 py-3 rounded-full bg-secondary border border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 max-w-none">
                        <MarkdownDescription markdown={description} size="page" />

                        {project.features && project.features.length > 0 && (
                            <div className="mt-14">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-8">{t('keyFeatures')}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {project.features.map((feat) => {
                                        const FeatIcon = PROJECT_ICONS[feat.iconName];
                                        return (
                                            <div key={feat.titleKey} className="flex gap-4 p-5 rounded-lg bg-secondary border border-border">
                                                <div className="p-3 rounded-xl bg-primary/15 border border-primary/20 h-fit">
                                                    {FeatIcon && <FeatIcon className="w-5 h-5 text-primary" />}
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-foreground font-black text-sm">{t(feat.titleKey)}</span>
                                                    <span className="text-muted-foreground text-sm leading-relaxed">{t(feat.textKey)}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {project.detailImages && project.detailImages.length > 0 && (
                            <div className="flex flex-col gap-8 mt-12 w-full">
                                {project.detailImages.map((img, i) => (
                                    <div key={i} className="rounded-lg overflow-hidden border border-border group bg-secondary relative w-full aspect-video shadow-2xl">
                                        <img src={img} alt={`${title} detailed screenshot ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-4">Project Actions</h4>
                        <ActionLinks project={project} t={t} />
                    </div>
                </div>
            </div>
        </div>
    );
}
