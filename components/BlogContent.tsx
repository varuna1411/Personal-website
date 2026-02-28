"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { SubstackPost } from "@/lib/substack";

function formatDate(pubDate: string): string {
  try {
    const d = new Date(pubDate);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return pubDate;
  }
}

export default function BlogContent({ posts }: { posts: SubstackPost[] }) {
  const displayPosts = posts.length > 0 ? posts : [
    { title: "Amin My Head on Substack", link: "https://aminmyhead.substack.com/", pubDate: "", description: "Productivity, technology, careers, and life. Read and subscribe." },
  ];

  return (
    <>
      <header className="px-6 pt-20 pb-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-normal text-stone-100 md:text-5xl lg:text-6xl"
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl font-sans text-lg text-stone-400"
          >
            Essays, travel notes, and reflections on craft and life. Read and subscribe on{" "}
            <a
              href="https://aminmyhead.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 underline"
            >
              Substack
            </a>
            .
          </motion.p>
        </div>
      </header>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((post, i) => (
              <motion.article
                key={post.link + i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-[8/5] overflow-hidden rounded-lg bg-stone-800">
                    <Image
                      src={`https://picsum.photos/seed/sb${i}/800/500`}
                      alt=""
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h2 className="mt-4 font-display text-xl font-normal text-stone-100 transition group-hover:text-amber-400/90 md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 font-sans text-sm text-stone-400">
                    {post.description}
                  </p>
                  {post.pubDate && (
                    <span className="mt-3 inline-block font-sans text-xs text-stone-500">
                      {formatDate(post.pubDate)}
                    </span>
                  )}
                  <span className="mt-2 flex items-center gap-1 font-sans text-sm text-amber-400 group-hover:underline">
                    Read on Substack
                    <span aria-hidden>→</span>
                  </span>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
