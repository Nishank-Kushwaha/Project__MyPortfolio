import { getSkills } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import SkillGlobe from "@/components/skill-globe";

const categoryOrder = ["Languages", "Frontend", "Backend", "Database", "Tools"];

export default async function Skills() {
  const skills = await getSkills();

  const grouped = categoryOrder.reduce(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat).map((s) => s.name);
      return acc;
    },
    {} as Record<string, string[]>,
  );

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Skills
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">What I Work With</h2>
        </div>

        {/* Grid — globe left, categories right */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Globe */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <SkillGlobe skills={skills} />
          </div>

          {/* Categories */}
          <div className="w-full md:w-1/2 space-y-6 self-center">
            {categoryOrder.map((cat) => {
              const items = grouped[cat];
              if (!items || items.length === 0) return null;
              return (
                <div key={cat}>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                    {cat}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((name) => (
                      <span
                        key={name}
                        className="px-3 py-1 text-sm rounded-md border border-border bg-card hover:border-foreground transition-colors"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
