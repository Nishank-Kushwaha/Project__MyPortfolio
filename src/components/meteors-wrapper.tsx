"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Meteors } from "@/components/ui/meteors";

export default function MeteorsWrapper() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <Meteors
        number={12}
        className={resolvedTheme === "dark" ? "bg-zinc-400" : "bg-zinc-600"}
      />
    </div>
  );
}
