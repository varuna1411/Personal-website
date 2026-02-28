"use client";

import { motion } from "framer-motion";

const labels = [
  "Writer",
  "Traveler",
  "Martial Artist",
  "Mentor",
  "Photographer",
  "Storyteller",
];

export default function Ticker() {
  const repeated = [...labels, ...labels];
  return (
    <div className="relative overflow-hidden border-y border-stone-700/50 bg-stone-900/50 py-4">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" },
        }}
      >
        {repeated.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="font-display text-lg font-normal tracking-wide text-stone-400 md:text-xl"
          >
            {label}
            {i < repeated.length - 1 && (
              <span className="mx-6 text-stone-600" aria-hidden>
                ·
              </span>
            )}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
