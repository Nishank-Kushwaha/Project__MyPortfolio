import { getCertificates } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink } from "lucide-react";

export default async function Certificates() {
  const certs = await getCertificates();
  if (certs.length === 0) return null;

  return (
    <section id="certificates" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Achievements
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
            <Award className="h-8 w-8" />
            Certificates
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="rounded-xl border border-border bg-card p-5 space-y-3 hover:border-foreground/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="p-2 rounded-lg border border-border">
                  <Award className="h-4 w-4" />
                </div>
                {cert.credentialLink && (
                  <a
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{cert.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {cert.issuer}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">{cert.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
