import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <section id="projects" className="min-h-screen" />
      <section id="contact" className="min-h-screen" />
    </>
  );
}
