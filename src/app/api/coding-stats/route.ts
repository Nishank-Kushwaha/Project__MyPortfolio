import { NextResponse } from "next/server";

async function getCodeforcesStats() {
  try {
    const res = await fetch(
      "https://codeforces.com/api/user.info?handles=Nishank_kushwaha",
      { next: { revalidate: 3600 } },
    );
    const data = await res.json();
    const user = data.result[0];
    return {
      handle: user.handle,
      rating: user.rating ?? 0,
      maxRating: user.maxRating ?? 0,
      rank: user.rank ?? "unrated",
      maxRank: user.maxRank ?? "unrated",
      avatar: user.avatar,
    };
  } catch {
    return null;
  }
}

async function getGithubStats() {
  try {
    const res = await fetch("https://api.github.com/users/Nishank-Kushwaha", {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return {
      login: data.login,
      repos: data.public_repos,
      followers: data.followers,
      avatar: data.avatar_url,
    };
  } catch {
    return null;
  }
}

async function getLeetcodeStats() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              profile {
                ranking
              }
            }
          }
        `,
        variables: { username: "Nishank_kushwaha" },
      }),
      next: { revalidate: 3600 },
    });

    const data = await res.json();
    const user = data?.data?.matchedUser;
    if (!user) return null;

    const stats = user.submitStats.acSubmissionNum;
    const get = (d: string) =>
      stats.find(
        (s: { difficulty: string; count: number }) => s.difficulty === d,
      )?.count ?? 0;

    return {
      totalSolved: get("All"),
      easySolved: get("Easy"),
      mediumSolved: get("Medium"),
      hardSolved: get("Hard"),
      ranking: user.profile.ranking,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const [codeforces, github, leetcode] = await Promise.all([
    getCodeforcesStats(),
    getGithubStats(),
    getLeetcodeStats(),
  ]);
  return NextResponse.json({ codeforces, github, leetcode });
}
