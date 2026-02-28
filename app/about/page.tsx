"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Ticker from "@/components/Ticker";

const galleryImages = [
  "https://picsum.photos/seed/about1/600/400",
  "https://picsum.photos/seed/about2/600/500",
  "https://picsum.photos/seed/about3/600/400",
  "https://picsum.photos/seed/about4/600/500",
  "https://picsum.photos/seed/about5/600/400",
  "https://picsum.photos/seed/about6/600/500",
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pt-20 pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-sm font-medium uppercase tracking-wider text-stone-500"
          >
            About Varun
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 font-display text-4xl font-normal text-stone-100 md:text-5xl lg:text-6xl"
          >
            Hello, I&apos;m Varun Amin 👋
          </motion.h1>

          {/* Decorative background text */}
          <div
            className="pointer-events-none absolute -right-20 top-32 select-none font-display text-[12vw] font-normal leading-none text-stone-800/30 lg:-right-10 lg:text-[10rem]"
            aria-hidden
          >
            Varun Amin
          </div>

          <div className="relative mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 font-sans text-base leading-relaxed text-stone-300 md:text-lg"
              >
                <p>
                  I’m a writer and traveler who believes the best stories come
                  from paying attention — to places, people, and the small
                  moments in between. I’ve spent the last decade moving between
                  cities and continents, always with a notebook and a camera.
                </p>
                <p>
                  When I’m not on the road or at the keyboard, I train martial
                  arts and mentor others who want to live with more intention.
                  I’ve found that the same principles apply everywhere: show up,
                  pay attention, and leave things a little better than you found
                  them.
                </p>
                <p>
                  This site is a place for my essays, travel notes, and the odd
                  reflection on craft and life. Thanks for stopping by.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <Ticker />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative order-1 aspect-[4/5] overflow-hidden rounded-lg bg-stone-800 lg:order-2"
            >
              <Image
                src="https://picsum.photos/seed/portrait-about/800/1000"
                alt="Varun Amin"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="border-t border-stone-800 bg-stone-950/30 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-normal text-stone-100 md:text-4xl"
          >
            Snaps from my Favourite Adventures
          </motion.h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {galleryImages.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-800"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
