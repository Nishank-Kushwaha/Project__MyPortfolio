# 🚀 Nishank Kushwaha — Portfolio

A modern, full-stack developer portfolio built with Next.js 15, featuring a 3D interactive skill globe, live coding stats, animated backgrounds, and a friendly astronaut mascot.

**Live:** [nishank-portfolio-alpha.vercel.app](https://nishank-portfolio-alpha.vercel.app)

---

## ✨ Features

- **Hero** — Typing effect cycling through roles, animated entrance
- **About** — Bio, location, social links fetched from DB
- **Skills** — Interactive 3D icon globe built with Three.js (drag to rotate)
- **Projects** — Cards with modal view, tech badges, GitHub & live demo links
- **Education & Experience** — Scroll-driven timeline with animated progress line
- **Certificates** — Achievement cards with credential links
- **Coding Profiles** — Live stats from Codeforces, GitHub & LeetCode APIs
- **Contact** — Form with Zod validation, stored in DB, email via Resend
- **Astronaut Mascot** — Peeks up periodically with fun messages 👨‍🚀
- **Particles + Meteors** — Theme-aware animated background
- **Dark / Light / System** theme toggle

---

## 🛠 Tech Stack

| Layer      | Tech                     |
| ---------- | ------------------------ |
| Framework  | Next.js 15 (App Router)  |
| Language   | TypeScript               |
| Styling    | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion + Magic UI |
| 3D Globe   | Three.js                 |
| Database   | Neon PostgreSQL          |
| ORM        | Prisma 6                 |
| Email      | Resend                   |
| Validation | Zod                      |
| Storage    | Vercel Blob              |
| Deployment | Vercel                   |

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── contact/        # Contact form endpoint
│   │   └── coding-stats/   # CF, GitHub, LeetCode stats
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/           # Hero, About, Skills, Projects, etc.
│   ├── skill-globe.tsx     # Three.js 3D globe
│   ├── astronaut-mascot.tsx
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── particles-wrapper.tsx
│   └── meteors-wrapper.tsx
└── lib/
    ├── prisma.ts
    └── actions.ts          # Server actions for DB queries
prisma/
├── schema.prisma
└── seed.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database
- A [Resend](https://resend.com) API key
- A [Vercel](https://vercel.com) account (for Blob storage)

### Installation

```bash
git clone https://github.com/Nishank-Kushwaha/Project__MyPortfolio.git
cd Project__MyPortfolio
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="your-neon-connection-string"
RESEND_API_KEY="your-resend-api-key"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Database Setup

```bash
npx prisma migrate dev
npx prisma db seed
```

### Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment

Deployed on Vercel. On every `git push` to `main`, Vercel auto-redeploys.

The `postinstall` script runs `prisma generate` automatically during Vercel builds.

---

## 📄 License

MIT — feel free to use this as inspiration for your own portfolio.

---

<p align="center">Built with ❤️ by <a href="https://github.com/Nishank-Kushwaha">Nishank Kushwaha</a></p>
