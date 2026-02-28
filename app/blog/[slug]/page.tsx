"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const posts: Record<
  string,
  { title: string; category: string; date: string; image: string }
> = {
  "finding-silence-in-kyoto": {
    title: "Finding Silence in Kyoto",
    category: "Travel",
    date: "Feb 20, 2025",
    image: "https://picsum.photos/seed/blog1/1200/600",
  },
  "why-i-write": {
    title: "Why I Write",
    category: "Essays",
    date: "Feb 12, 2025",
    image: "https://picsum.photos/seed/blog2/1200/600",
  },
  "morning-routines-that-stick": {
    title: "Morning Routines That Actually Stick",
    category: "Life",
    date: "Feb 5, 2025",
    image: "https://picsum.photos/seed/blog3/1200/600",
  },
  "the-art-of-slow-travel": {
    title: "The Art of Slow Travel",
    category: "Travel",
    date: "Jan 28, 2025",
    image: "https://picsum.photos/seed/b4/1200/600",
  },
  "lessons-from-the-dojo": {
    title: "Lessons from the Dojo",
    category: "Essays",
    date: "Jan 15, 2025",
    image: "https://picsum.photos/seed/b5/1200/600",
  },
  "books-that-shaped-me": {
    title: "Books That Shaped Me",
    category: "Life",
    date: "Jan 3, 2025",
    image: "https://picsum.photos/seed/b6/1200/600",
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts[slug];

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl text-stone-100">Post not found</h1>
        <Link href="/blog" className="mt-4 inline-block text-amber-400 hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="px-6 pb-24 pt-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 font-sans text-sm text-stone-500 hover:text-stone-300"
          >
            ← Back to Blog
          </Link>
          <span className="mt-6 block font-sans text-xs font-medium uppercase tracking-wider text-stone-500">
            {post.category}
          </span>
          <h1 className="mt-2 font-display text-4xl font-normal text-stone-100 md:text-5xl">
            {post.title}
          </h1>
          <time className="mt-4 block font-sans text-sm text-stone-500">
            {post.date}
          </time>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mt-10 aspect-video overflow-hidden rounded-lg bg-stone-800"
        >
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 space-y-6 font-sans text-lg leading-relaxed text-stone-300"
        >
          <p className="text-xl text-stone-200">
            This is placeholder content for the blog post. Replace with your
            actual copy, or connect a CMS to pull in real posts.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </motion.div>
      </div>
    </article>
  );
}
