"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, FileText, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { Variants } from "framer-motion";

const roles = [
  "Software Engineer",
  "Competitive Programmer",
  "Full Stack Developer",
  "Open Source Enthusiast",
];

function useTypingEffect(words: string[], speed = 80, pause = 1500) {
  const [display, setDisplay] = React.useState("");
  const [wordIndex, setWordIndex] = React.useState(0);
  const [typing, setTyping] = React.useState(true);

  React.useEffect(() => {
    const current = words[wordIndex];

    if (typing) {
      if (display.length < current.length) {
        const t = setTimeout(
          () => setDisplay(current.slice(0, display.length + 1)),
          speed,
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), pause);
        return () => clearTimeout(t);
      }
    } else {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2);
        return () => clearTimeout(t);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }
  }, [display, typing, wordIndex, words, speed, pause]);

  return display;
}

const socialLinks = [
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
  { icon: Mail, href: "mailto:kushwahanishank01@gmail.com", label: "Email" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Hero() {
  const typedRole = useTypingEffect(roles);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl w-full text-center space-y-6">
        {/* Greeting */}
        <motion.p
          className="text-muted-foreground text-lg tracking-widest uppercase"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Nishank <span className="text-primary">Kushwaha</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          className="h-10 flex items-center justify-center"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <p className="text-xl md:text-2xl text-muted-foreground font-mono">
            {typedRole}
            <span className="animate-pulse ml-0.5">|</span>
          </p>
        </motion.div>

        {/* Bio line */}
        <motion.p
          className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          EE undergrad at IIT BHU · Building things with code · Codeforces rated
          competitive programmer
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Button size="lg" asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </a>
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-4 pt-2"
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
