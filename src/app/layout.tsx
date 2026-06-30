import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import MeteorsWrapper from "@/components/meteors-wrapper";
import ParticlesWrapper from "@/components/particles-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nishank Kushwaha | Software Engineer & Competitive Programmer",
  description:
    "Portfolio of Nishank Kushwaha — EE undergrad at IIT BHU Varanasi. Full stack developer, competitive programmer, and open source enthusiast.",
  keywords: [
    "Nishank Kushwaha",
    "IIT BHU",
    "Software Engineer",
    "Competitive Programmer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "C++",
    "Codeforces",
  ],
  authors: [{ name: "Nishank Kushwaha" }],
  creator: "Nishank Kushwaha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://project-my-portfolio-wqu9-nu.vercel.app/",
    title: "Nishank Kushwaha | Software Engineer",
    description:
      "EE undergrad at IIT BHU Varanasi. Full stack developer and competitive programmer.",
    siteName: "Nishank Kushwaha Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ParticlesWrapper />
          <MeteorsWrapper />
          <Navbar />
          <Toaster richColors position="bottom-right" />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
