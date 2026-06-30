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

  // Skills — clear and reseed
  await prisma.skill.deleteMany();

  // Skills
  const skills = [
    { name: "C", category: "Languages", order: 1 },
    { name: "C++", category: "Languages", order: 2 },
    { name: "Python", category: "Languages", order: 3 },
    { name: "JavaScript", category: "Languages", order: 4 },
    { name: "TypeScript", category: "Languages", order: 5 },
    { name: "HTML5", category: "Frontend", order: 1 },
    { name: "CSS3", category: "Frontend", order: 2 },
    { name: "React", category: "Frontend", order: 3 },
    { name: "Next.js", category: "Frontend", order: 4 },
    { name: "TailwindCSS", category: "Frontend", order: 5 },
    { name: "Node.js", category: "Backend", order: 1 },
    { name: "Nodemon", category: "Backend", order: 2 },
    { name: "Express.js", category: "Backend", order: 3 },
    { name: "Appwrite", category: "Backend", order: 4 },
    { name: "MongoDB", category: "Database", order: 1 },
    { name: "Mongoose.js", category: "Database", order: 2 },
    { name: "MySQL", category: "Database", order: 3 },
    { name: "PostgreSQL", category: "Database", order: 4 },
    { name: "Prisma", category: "Database", order: 5 },
    { name: "NumPy", category: "Data Science", order: 1 },
    { name: "Pandas", category: "Data Science", order: 2 },
    { name: "Seaborn", category: "Data Science", order: 3 },
    { name: "Matplotlib", category: "Data Science", order: 4 },
    { name: "Git", category: "Tools", order: 1 },
    { name: "GitHub", category: "Tools", order: 2 },
    { name: "Docker", category: "Tools", order: 3 },
    { name: "MATLAB", category: "Tools", order: 4 },
    { name: "VS Code", category: "Tools", order: 5 },
    { name: "Jupyter", category: "Tools", order: 6 },
    { name: "Linux", category: "Tools", order: 7 },
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
