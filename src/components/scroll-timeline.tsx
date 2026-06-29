"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Calendar } from "lucide-react";

export type TimelineEvent = {
  year: string;
  title: string;
  subtitle?: string;
  description?: string;
};

export default function ScrollTimeline({
  events,
}: {
  events: TimelineEvent[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const newIndex = Math.floor(v * events.length);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < events.length
      ) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, events.length, activeIndex]);

  return (
    <div ref={scrollRef} className="relative w-full">
      <div className="relative max-w-4xl mx-auto">
        {/* Background line */}
        <div className="absolute left-1/2 -translate-x-1/2 bg-border w-px h-full z-10" />

        {/* Progress line */}
        <motion.div
          className="absolute top-0 z-10 left-1/2 -translate-x-1/2 w-px rounded-full"
          style={{
            height: progressHeight,
            background: "linear-gradient(to bottom, #ffffff, #888888)",
            boxShadow: "0 0 8px rgba(255,255,255,0.3)",
          }}
        />

        {/* Comet */}
        <motion.div
          className="absolute z-20 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ top: progressHeight }}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-foreground"
            style={{
              boxShadow:
                "0 0 12px 4px rgba(255,255,255,0.4), 0 0 24px 8px rgba(255,255,255,0.15)",
            }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Events */}
        <div className="relative z-20">
          {events.map((event, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-16 py-4 flex-col lg:flex-row ${
                index % 2 === 0
                  ? "lg:justify-start"
                  : "lg:flex-row-reverse lg:justify-start"
              }`}
            >
              {/* Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <motion.div
                  className={`w-5 h-5 rounded-full border-2 bg-background ${
                    index <= activeIndex ? "border-foreground" : "border-border"
                  }`}
                  animate={
                    index <= activeIndex
                      ? {
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            "0 0 0px rgba(255,255,255,0)",
                            "0 0 10px rgba(255,255,255,0.5)",
                            "0 0 0px rgba(255,255,255,0)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Card */}
              <motion.div
                className={`relative z-30 w-full lg:w-[calc(50%-40px)] ${
                  index % 2 === 0
                    ? "lg:mr-[calc(50%+20px)]"
                    : "lg:ml-[calc(50%+20px)]"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-80px" }}
              >
                <div className="rounded-xl border border-border bg-card p-5 space-y-2 hover:border-foreground/40 transition-colors">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <Calendar className="h-3.5 w-3.5" />
                    {event.year}
                  </div>
                  <h3 className="font-semibold text-base">{event.title}</h3>
                  {event.subtitle && (
                    <p className="text-sm text-muted-foreground">
                      {event.subtitle}
                    </p>
                  )}
                  {event.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
