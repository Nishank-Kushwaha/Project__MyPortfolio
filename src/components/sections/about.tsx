import { getAbout } from "@/lib/actions";
import { MapPin, Mail, Code2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { existsSync } from "fs";
import path from "path";

export default async function About() {
  const about = await getAbout();
  const hasProfileImage = existsSync(
    path.join(process.cwd(), "public", "profile.jpg"),
  );

  if (!about) return null;

  const socialLinks = [
    { icon: FaGithub, href: about.github, label: "GitHub" },
    { icon: FaLinkedin, href: about.linkedin, label: "LinkedIn" },
    { icon: SiCodeforces, href: about.codeforces, label: "Codeforces" },
    { icon: SiLeetcode, href: about.leetcode, label: "LeetCode" },
  ].filter((s) => s.href);

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Who I Am</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — avatar */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-2xl bg-primary/10 border border-border flex items-center justify-center overflow-hidden">
              {hasProfileImage ? (
                <img
                  src="/profile.jpg"
                  alt={about.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Code2 className="w-24 h-24 text-primary/40" />
              )}
            </div>
          </div>

          {/* Right — info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold">{about.name}</h3>
              <p className="text-primary font-medium mt-1">{about.title}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">{about.bio}</p>

            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              {about.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {about.location}
                </span>
              )}
              {about.email && (
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  {about.email}
                </span>
              )}
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
