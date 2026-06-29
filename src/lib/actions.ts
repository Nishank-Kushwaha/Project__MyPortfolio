import { prisma } from "@/lib/prisma";

export async function getAbout() {
  return await prisma.about.findFirst();
}

export async function getSkills() {
  return await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });
}

export async function getProjects() {
  return await prisma.project.findMany({ orderBy: { order: "asc" } });
}

export async function getExperience() {
  return await prisma.experience.findMany({ orderBy: { order: "asc" } });
}

export async function getCertificates() {
  return await prisma.certificate.findMany();
}
