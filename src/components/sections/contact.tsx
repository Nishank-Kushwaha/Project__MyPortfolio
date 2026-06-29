"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiCodeforces, SiLeetcode } from "react-icons/si";

export default function Contact() {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Message sent! I'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Contact
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Have a project in mind or just want to say hi? My inbox is always
            open.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg border border-border">
                  <Mail className="h-4 w-4 text-foreground" />
                </div>
                <span>kushwahanishank01@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg border border-border">
                  <MapPin className="h-4 w-4 text-foreground" />
                </div>
                <span>IIT BHU Varanasi, India</span>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                Find me on
              </p>
              <div className="flex gap-3">
                {[
                  {
                    icon: FaGithub,
                    href: "https://github.com/Nishank-Kushwaha",
                    label: "GitHub",
                  },
                  {
                    icon: FaLinkedin,
                    href: "https://www.linkedin.com/in/nishank-kushwaha-96041a303",
                    label: "LinkedIn",
                  },
                  {
                    icon: SiCodeforces,
                    href: "https://codeforces.com/profile/Nishank_kushwaha",
                    label: "Codeforces",
                  },
                  {
                    icon: SiLeetcode,
                    href: "https://leetcode.com/u/Nishank_kushwaha",
                    label: "LeetCode",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2.5 rounded-full border border-border hover:border-foreground hover:text-foreground transition-colors text-muted-foreground"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your message..."
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
