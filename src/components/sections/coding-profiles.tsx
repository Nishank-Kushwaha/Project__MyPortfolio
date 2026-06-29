"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import { ExternalLink } from "lucide-react";

type Stats = {
  codeforces: {
    handle: string;
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
  } | null;
  github: { login: string; repos: number; followers: number } | null;
  leetcode: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
  } | null;
};

function getRankColor(rank: string) {
  if (rank.includes("grandmaster")) return "text-red-500";
  if (rank.includes("master")) return "text-orange-400";
  if (rank.includes("candidate")) return "text-violet-400";
  if (rank.includes("expert")) return "text-blue-400";
  if (rank.includes("specialist")) return "text-cyan-400";
  return "text-muted-foreground";
}

export default function CodingProfiles() {
  const [stats, setStats] = React.useState<Stats | null>(null);

  React.useEffect(() => {
    fetch("/api/coding-stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  return (
    <section id="coding" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Competitive Programming
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Coding Profiles</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Active on competitive programming platforms and open source.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Codeforces */}
          <motion.a
            href="https://codeforces.com/profile/Nishank_kushwaha"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group rounded-xl border border-border bg-card hover:border-foreground/40 transition-all p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SiCodeforces size={28} className="text-blue-400" />
                <span className="font-semibold">Codeforces</span>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            {stats?.codeforces ? (
              <div className="space-y-2">
                <p className="text-2xl font-bold">{stats.codeforces.rating}</p>
                <p
                  className={`text-sm font-medium capitalize ${getRankColor(stats.codeforces.rank)}`}
                >
                  {stats.codeforces.rank}
                </p>
                <p className="text-xs text-muted-foreground">
                  Max: {stats.codeforces.maxRating} ({stats.codeforces.maxRank})
                </p>
                <p className="text-xs text-muted-foreground">
                  @{stats.codeforces.handle}
                </p>
              </div>
            ) : (
              <div className="space-y-2 animate-pulse">
                <div className="h-8 w-20 bg-muted rounded" />
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
            )}
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/Nishank-Kushwaha"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group rounded-xl border border-border bg-card hover:border-foreground/40 transition-all p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaGithub size={28} />
                <span className="font-semibold">GitHub</span>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            {stats?.github ? (
              <div className="space-y-2">
                <p className="text-2xl font-bold">{stats.github.repos}</p>
                <p className="text-sm text-muted-foreground">
                  Public Repositories
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.github.followers} followers
                </p>
                <p className="text-xs text-muted-foreground">
                  @{stats.github.login}
                </p>
              </div>
            ) : (
              <div className="space-y-2 animate-pulse">
                <div className="h-8 w-20 bg-muted rounded" />
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
            )}
          </motion.a>

          {/* LeetCode */}
          <motion.a
            href="https://leetcode.com/Nishank_kushwaha"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="group rounded-xl border border-border bg-card hover:border-foreground/40 transition-all p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SiLeetcode size={28} className="text-orange-400" />
                <span className="font-semibold">LeetCode</span>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            {stats?.leetcode ? (
              <div className="space-y-2">
                <p className="text-2xl font-bold">
                  {stats.leetcode.totalSolved}
                </p>
                <p className="text-sm text-muted-foreground">Problems Solved</p>
                <div className="flex gap-3 text-xs">
                  <span className="text-green-400">
                    E: {stats.leetcode.easySolved}
                  </span>
                  <span className="text-yellow-400">
                    M: {stats.leetcode.mediumSolved}
                  </span>
                  <span className="text-red-400">
                    H: {stats.leetcode.hardSolved}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Rank #{stats.leetcode.ranking?.toLocaleString()}
                </p>
              </div>
            ) : (
              <div className="space-y-2 animate-pulse">
                <div className="h-8 w-20 bg-muted rounded" />
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
            )}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
