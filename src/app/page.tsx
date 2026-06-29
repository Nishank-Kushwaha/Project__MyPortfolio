import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import EducationExperience from "@/components/sections/education-experience";
import Certificates from "@/components/sections/certificates";
import CodingProfiles from "@/components/sections/coding-profiles";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <EducationExperience />
      <Certificates />
      <CodingProfiles />
      <Contact />
    </>
  );
}
