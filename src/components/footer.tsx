export default function Footer() {
  return (
    <footer className="border-t border-border py-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>
          © {new Date().getFullYear()} Nishank Kushwaha. All rights reserved.
        </span>
        <span>Built with Next.js · Tailwind · Prisma · Neon</span>
      </div>
    </footer>
  );
}
