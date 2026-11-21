import PageBanner from '@/components/PageBanner';
import ProjectsSections from '@/components/projects/ProjectsSections';
import { canonical, pageRobots } from '@/lib/seo';

export const metadata = {
  title: 'Projects | Rebuild Constructions',
  description: 'Explore selected construction, front elevation and finishing projects by Rebuild Constructions.',
  robots: pageRobots(),
  alternates: canonical('/projects'),
};

export default function ProjectsPage() {
  return <main id="main-content">
    <PageBanner
      label="PROJECTS / PORTFOLIO"
      title="Projects built with purpose."
      description="A growing portfolio of construction and finishing work across Ayodhya, Delhi and Ghaziabad."
    />
    <ProjectsSections />
  </main>;
}
