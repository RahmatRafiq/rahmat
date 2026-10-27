import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getProjectBySlug } from '../../../../../data/projects';
import ProjectPanel from '../../../../../components/projects/ProjectPanel';

type Params = Promise<{ locale: string; slug: string }>;

export default async function InterceptedProjectModal({ params }: { params: Params }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const project = getProjectBySlug(slug);
    if (!project) notFound();

    return <ProjectPanel project={project} />;
}
