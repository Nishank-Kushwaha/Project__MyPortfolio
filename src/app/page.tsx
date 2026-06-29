import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <section id="skills" className="min-h-screen" />
      <section id="projects" className="min-h-screen" />
      <section id="contact" className="min-h-screen" />
    </>
  );
}
