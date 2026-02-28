"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Ticker from "@/components/Ticker";
import type { SubstackPost } from "@/lib/substack";

const travelItems = [
  { title: "Japan", image: "https://picsum.photos/seed/travel1/600/400" },
  { title: "Iceland", image: "https://picsum.photos/seed/travel2/600/400" },
  { title: "Portugal", image: "https://picsum.photos/seed/travel3/600/400" },
];

function formatDate(pubDate: string): string {
  try {
    const d = new Date(pubDate);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return pubDate;
  }
}

export default function HomeContent({ posts }: { posts: SubstackPost[] }) {
  const displayPosts = posts.length > 0 ? posts.slice(0, 3) : [
    { title: "Latest on Substack", link: "https://aminmyhead.substack.com/", pubDate: "", description: "Read and subscribe on Substack." },
    { title: "Amin My Head", link: "https://aminmyhead.substack.com/", pubDate: "", description: "Productivity, technology, careers, and life." },
    { title: "Subscribe", link: "https://aminmyhead.substack.com/", pubDate: "", description: "Get new posts delivered to your inbox." },
  ];

  return (
    <>
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <h1 className="font-display text-5xl font-normal tracking-tight text-stone-100 sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block">Varun</span>
            <span className="block">Amin</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 font-sans text-lg text-stone-400 md:text-xl"
          >
            Writer · Traveler · Martial Artist · Mentor
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-10"
          >
            <Link
              href="/about"
              className="inline-block rounded-full border border-stone-600 bg-stone-800/50 px-8 py-3.5 font-sans text-sm font-medium text-stone-100 transition hover:border-amber-500/50 hover:bg-stone-800"
            >
              Get to know me
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Ticker />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone-800"
          >
            <Image
              src="https://picsum.photos/seed/portrait/800/1000"
              alt="Portrait"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-sans text-base leading-relaxed text-stone-300 md:text-lg"
            >
              I'm a writer and traveler who believes the best stories come from
              paying attention. When I'm not on the road or at the keyboard, I train
              martial arts and mentor others who want to live with more intention.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-8"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-sans text-sm font-medium text-amber-400 transition hover:text-amber-300"
              >
                Read my full story
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-800 bg-stone-950/30 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex items-end justify-between"
          >
            <h2 className="font-display text-3xl font-normal text-stone-100 md:text-4xl">
              Latest from the Blog
            </h2>
            <a
              href="https://aminmyhead.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-sans text-sm text-amber-400 hover:text-amber-300 md:block"
            >
              View all
            </a>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {displayPosts.map((post, i) => (
              <motion.article
                key={post.link + String(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative aspect-[8/5] overflow-hidden rounded-lg bg-stone-800">
                    <Image
                      src={`https://picsum.photos/seed/${i + 1}/800/500`}
                      alt=""
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-normal text-stone-100 group-hover:text-amber-400/90">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 font-sans text-sm text-stone-400">
                    {post.description}
                  </p>
                  {post.pubDate ? (
                    <span className="mt-2 inline-block font-sans text-xs text-stone-500">
                      {formatDate(post.pubDate)}
                    </span>
                  ) : null}
                </a>
              </motion.article>
            ))}
          </div>
          <div className="mt-8 md:hidden">
            <a
              href="https://aminmyhead.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-amber-400 hover:text-amber-300"
            >
              View all posts →
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-end justify-between"
        >
          <h2 className="font-display text-3xl font-normal text-stone-100 md:text-4xl">
            Travel Portfolio
          </h2>
          <Link
            href="/travel"
            className="hidden font-sans text-sm text-amber-400 hover:text-amber-300 md:block"
          >
            See all
          </Link>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-3">
          {travelItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href="/travel" className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-800">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 font-display text-xl font-normal text-white opacity-0 transition group-hover:opacity-100">
                    {item.title}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 md:hidden">
          <Link
            href="/travel"
            className="font-sans text-sm text-amber-400 hover:text-amber-300"
          >
            See all travel →
          </Link>
        </div>
      </section>
    </>
  );
}
