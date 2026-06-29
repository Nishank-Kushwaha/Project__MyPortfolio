import { getExperience } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase } from "lucide-react";
import ScrollTimeline, {
  type TimelineEvent,
} from "@/components/scroll-timeline";

const education: TimelineEvent[] = [
  {
    year: "2021 - 2022",
    title: "Class 10",
    subtitle: "ICSE Board",
    description:
      "Completed Class 10 with 88.9% marks, securing a strong academic foundation.",
  },
  {
    year: "2023 - 2024",
    title: "Class 12",
    subtitle: "CBSE Board",
    description: "Completed Class 12 with 88.6% marks in the science stream.",
  },
  {
    year: "2024",
    title: "JEE Main & Advanced Qualified",
    subtitle: "National Testing Agency (NTA)",
    description:
      "Qualified both JEE Main and JEE Advanced with excellent performance.",
  },
  {
    year: "2024 - Present",
    title: "B.Tech Electrical Engineering (IDD)",
    subtitle: "IIT BHU Varanasi",
    description:
      "Pursuing EE with deep interests in software development, competitive programming, and full stack web development.",
  },
];

export default async function EducationExperience() {
  const experiences = await getExperience();

  const experienceEvents: TimelineEvent[] = experiences.map((e) => ({
    year: e.duration,
    title: e.role,
    subtitle: e.company,
    description: e.description,
  }));

  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Education */}
        <div>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Background
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
              <GraduationCap className="h-8 w-8" />
              Education
            </h2>
          </div>
          <ScrollTimeline events={education} />
        </div>

        {/* Experience — only show if data exists */}
        {experienceEvents.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Career
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
                <Briefcase className="h-8 w-8" />
                Experience
              </h2>
            </div>
            <ScrollTimeline events={experienceEvents} />
          </div>
        )}
      </div>
    </section>
  );
}
