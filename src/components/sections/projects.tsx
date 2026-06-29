import { getProjects } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import ProjectsClient from "@/components/projects-client";

export default async function Projects() {
  const projects = await getProjects();
  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Projects
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">What I've Built</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            A selection of projects I've worked on — from systems programming to
            full stack web apps.
          </p>
        </div>
        <ProjectsClient projects={projects} />
      </div>
    </section>
  );
}
