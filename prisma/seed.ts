import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // About
  await prisma.about.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Nishank Kushwaha",
      title: "Software Engineer & Competitive Programmer",
      bio: "I'm an Electrical Engineering student at IIT BHU Varanasi with a passion for software development, competitive programming, and building real-world projects.",
      email: "kushwahanishank01@gmail.com",
      github: "https://github.com/Nishank-Kushwaha",
      linkedin: "https://www.linkedin.com/in/nishank-kushwaha-96041a303",
      codeforces: "https://codeforces.com/profile/Nishank_kushwaha",
      leetcode: "https://leetcode.com/u/Nishank_kushwaha",
      location: "IIT BHU Varanasi, India",
    },
  });

  // Skills
  const skills = [
    { name: "C++", category: "Languages", order: 1 },
    { name: "Python", category: "Languages", order: 2 },
    { name: "JavaScript", category: "Languages", order: 3 },
    { name: "TypeScript", category: "Languages", order: 4 },
    { name: "React", category: "Frontend", order: 1 },
    { name: "Next.js", category: "Frontend", order: 2 },
    { name: "Tailwind CSS", category: "Frontend", order: 3 },
    { name: "Node.js", category: "Backend", order: 1 },
    { name: "Express", category: "Backend", order: 2 },
    { name: "PostgreSQL", category: "Database", order: 1 },
    { name: "MongoDB", category: "Database", order: 2 },
    { name: "Prisma", category: "Database", order: 3 },
    { name: "Docker", category: "Tools", order: 1 },
    { name: "Git", category: "Tools", order: 2 },
    { name: "Linux", category: "Tools", order: 3 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // Sample Project
  await prisma.project.create({
    data: {
      title: "my_git",
      description:
        "A Git implementation from scratch in C++ covering object storage, branching, merging, diff, and clone.",
      techStack: ["C++", "CMake", "zlib"],
      github: "https://github.com/Nishank-Kushwaha/Project_MyGit",
      featured: true,
      order: 1,
    },
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
