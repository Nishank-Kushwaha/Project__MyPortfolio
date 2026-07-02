"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Hey there! 👋 Welcome to my portfolio!",
  "I turn coffee into code ☕→ 💻",
  "Open to internships & opportunities 🚀",
  "My skill globe is interactive, try spinning it! 🌍",
  "I debug at 2am and I'm proud of it 🌙",
  "Clean code is not a luxury, it's a habit ✨",
  "From EE to Full Stack — curiosity drives me 🔌→🌐",
  "Every project here has a story 📖",
  "Let's build something great together! 🤝",
  "Scroll down, there's more cool stuff! 👇",
];

const styles = `
  .mascot-arm {
    transform-box: fill-box;
    transform-origin: 50% 0%;
  }
  @keyframes arm-wave {
    0%   { transform: rotate(0deg); }
    15%  { transform: rotate(-45deg); }
    30%  { transform: rotate(-90deg); }
    45%  { transform: rotate(-140deg); }
    55%  { transform: rotate(-120deg); }
    65%  { transform: rotate(-140deg); }
    75%  { transform: rotate(-120deg); }
    88%  { transform: rotate(-60deg); }
    100% { transform: rotate(0deg); }
  }
  .mascot-arm-wave {
    animation: arm-wave 2.2s ease-in-out forwards;
  }
  @keyframes blink {
    0%, 44%, 56%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(0.05); }
  }
  .mascot-eyes {
    transform-box: fill-box;
    transform-origin: 50% 50%;
    animation: blink 4s ease-in-out infinite;
    animation-delay: 1.5s;
  }
  @keyframes antenna-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.15; }
  }
  .mascot-antenna {
    animation: antenna-pulse 1.5s ease-in-out infinite;
  }
`;

export default function AstronautMascot() {
  const [visible, setVisible] = React.useState(false);
  const [showBubble, setShowBubble] = React.useState(false);
  const [msgIndex, setMsgIndex] = React.useState(0);
  const [isWaving, setIsWaving] = React.useState(false);

  React.useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    function cycle() {
      setVisible(true);
      setIsWaving(true);

      // wave duration 2.2s then show bubble
      t = setTimeout(() => {
        setIsWaving(false);
        setShowBubble(true);
        setMsgIndex((i) => i + 1);

        // hide bubble after 3.5s
        t = setTimeout(() => {
          setShowBubble(false);
          // hide mascot after bubble gone
          t = setTimeout(() => {
            setVisible(false);
            // wait before next cycle
            t = setTimeout(cycle, Math.random() * 7000 + 6000);
          }, 600);
        }, 3500);
      }, 2400);
    }

    const first = setTimeout(cycle, 3000);
    return () => {
      clearTimeout(first);
      clearTimeout(t);
    };
  }, []);

  const handleClick = () => {
    if (!visible) return;
    setShowBubble(false);
    setTimeout(() => {
      setMsgIndex((i) => i + 1);
      setShowBubble(true);
    }, 150);
  };

  return (
    <>
      <style>{styles}</style>
      <div
        className="pointer-events-none"
        style={{
          position: "fixed",
          bottom: 0,
          right: 32,
          zIndex: 9999,
          width: 90,
        }}
      >
        {/* Speech bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              style={{
                position: "absolute",
                bottom: 130,
                right: -7,
                width: 240,
              }}
              className="pointer-events-none"
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
                  borderRadius: 20,
                  padding: "12px 16px",
                  position: "relative",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
                  border: "1.5px solid rgba(255,255,255,0.8)",
                }}
              >
                {/* Fun top accent bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 16,
                    right: 16,
                    height: 3,
                    background:
                      "linear-gradient(90deg, #a0a0a0, #e0e0e0, #a0a0a0)",
                    borderRadius: "0 0 4px 4px",
                    opacity: 0.5,
                  }}
                />

                <p
                  style={{
                    fontFamily: "var(--font-fredoka), sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#111",
                    margin: 0,
                    lineHeight: 1.5,
                    letterSpacing: "0.01em",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {messages[msgIndex % messages.length]}
                </p>

                {/* Bubble tail */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -9,
                    right: 32,
                    width: 18,
                    height: 18,
                    background: "#f0f0f0",
                    border: "1.5px solid rgba(255,255,255,0.8)",
                    borderTop: "none",
                    borderLeft: "none",
                    transform: "rotate(45deg)",
                    boxShadow: "3px 3px 6px rgba(0,0,0,0.08)",
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Astronaut */}
        <motion.div
          animate={{ y: visible ? 0 : 145 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="pointer-events-auto cursor-pointer"
          onClick={handleClick}
          whileHover={{ scale: 1.06 }}
        >
          <motion.div
            animate={visible ? { y: [0, -6, 0] } : { y: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 80 120"
              xmlns="http://www.w3.org/2000/svg"
              width={85}
              style={{ overflow: "visible" }}
            >
              {/* Helmet */}
              <ellipse
                cx="40"
                cy="37"
                rx="26"
                ry="28"
                fill="white"
                stroke="#e0e0e0"
                strokeWidth="1"
              />

              {/* Visor */}
              <ellipse cx="40" cy="39" rx="17" ry="15" fill="#1a1a1a" />
              <ellipse
                cx="33"
                cy="33"
                rx="5"
                ry="4"
                fill="white"
                opacity="0.12"
              />
              <ellipse
                cx="44"
                cy="31"
                rx="2"
                ry="1.5"
                fill="white"
                opacity="0.08"
              />

              {/* Eyes — blink */}
              <g className="mascot-eyes">
                <ellipse
                  cx="34"
                  cy="39"
                  rx="3"
                  ry="3.5"
                  fill="white"
                  opacity="0.85"
                />
                <ellipse
                  cx="46"
                  cy="39"
                  rx="3"
                  ry="3.5"
                  fill="white"
                  opacity="0.85"
                />
                <circle cx="35" cy="39" r="1.5" fill="#333" opacity="0.9" />
                <circle cx="47" cy="39" r="1.5" fill="#333" opacity="0.9" />
                <circle cx="35.5" cy="38" r="0.6" fill="white" opacity="0.8" />
                <circle cx="47.5" cy="38" r="0.6" fill="white" opacity="0.8" />
              </g>

              {/* Helmet ring */}
              <path
                d="M16 37 Q14 18 40 11 Q66 18 64 37"
                fill="none"
                stroke="#ddd"
                strokeWidth="1.5"
              />
              <circle
                cx="16"
                cy="40"
                r="2.5"
                fill="#e8e8e8"
                stroke="#ccc"
                strokeWidth="0.5"
              />
              <circle
                cx="64"
                cy="40"
                r="2.5"
                fill="#e8e8e8"
                stroke="#ccc"
                strokeWidth="0.5"
              />

              {/* Antenna */}
              <line
                x1="40"
                y1="10"
                x2="40"
                y2="4"
                stroke="#ccc"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle
                cx="40"
                cy="3"
                r="2.5"
                fill="#fff"
                stroke="#ddd"
                strokeWidth="0.5"
                className="mascot-antenna"
              />

              {/* Body */}
              <rect
                x="22"
                y="62"
                width="36"
                height="40"
                rx="10"
                fill="white"
                stroke="#e0e0e0"
                strokeWidth="1"
              />

              {/* Chest panel */}
              <rect
                x="29"
                y="70"
                width="22"
                height="14"
                rx="4"
                fill="#f0f0f0"
                stroke="#ccc"
                strokeWidth="0.5"
              />
              <circle cx="35" cy="77" r="2.5" fill="#333" />
              <circle cx="45" cy="77" r="2.5" fill="#333" />
              <rect x="33" y="81" width="14" height="1.5" rx="1" fill="#ccc" />

              {/* Legs */}
              <rect
                x="25"
                y="98"
                width="13"
                height="18"
                rx="6"
                fill="white"
                stroke="#e0e0e0"
                strokeWidth="1"
              />
              <rect
                x="42"
                y="98"
                width="13"
                height="18"
                rx="6"
                fill="white"
                stroke="#e0e0e0"
                strokeWidth="1"
              />

              {/* Boots */}
              <rect
                x="22"
                y="112"
                width="19"
                height="8"
                rx="4"
                fill="#d0d0d0"
              />
              <rect
                x="39"
                y="112"
                width="19"
                height="8"
                rx="4"
                fill="#d0d0d0"
              />

              {/* Right arm — drawn before left so left appears on top */}
              <rect
                x="60"
                y="64"
                width="14"
                height="28"
                rx="7"
                fill="white"
                stroke="#e0e0e0"
                strokeWidth="1"
              />
              <ellipse cx="67" cy="94" rx="7" ry="6" fill="#e8e8e8" />

              {/* Left arm — drawn LAST so it renders on top of body */}
              <g className={`mascot-arm ${isWaving ? "mascot-arm-wave" : ""}`}>
                <rect
                  x="6"
                  y="64"
                  width="14"
                  height="28"
                  rx="7"
                  fill="white"
                  stroke="#e0e0e0"
                  strokeWidth="1"
                />
                <ellipse cx="13" cy="94" rx="7" ry="6" fill="#e8e8e8" />
              </g>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
