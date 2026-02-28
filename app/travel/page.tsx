"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const travelCards = [
  {
    id: 1,
    location: "Kyoto, Japan",
    description: "Temples, tea houses, and the quiet magic of ancient streets.",
    image: "https://picsum.photos/seed/t1/800/600",
  },
  {
    id: 2,
    location: "Reykjavik, Iceland",
    description: "Where fire meets ice and the light never quite leaves.",
    image: "https://picsum.photos/seed/t2/800/1000",
  },
  {
    id: 3,
    location: "Lisbon, Portugal",
    description: "Tiled facades, steep hills, and the sound of fado.",
    image: "https://picsum.photos/seed/t3/800/500",
  },
  {
    id: 4,
    location: "Marrakech, Morocco",
    description: "Souks, riads, and the scent of orange blossom.",
    image: "https://picsum.photos/seed/t4/800/700",
  },
  {
    id: 5,
    location: "Patagonia, Argentina",
    description: "Glaciers, peaks, and the end of the world.",
    image: "https://picsum.photos/seed/t5/800/900",
  },
  {
    id: 6,
    location: "Santorini, Greece",
    description: "White walls, blue domes, and sunsets over the caldera.",
    image: "https://picsum.photos/seed/t6/800/600",
  },
  {
    id: 7,
    location: "Hanoi, Vietnam",
    description: "Street food, motorbikes, and the old quarter at dawn.",
    image: "https://picsum.photos/seed/t7/800/550",
  },
  {
    id: 8,
    location: "Edinburgh, Scotland",
    description: "Castles, cobbles, and the mist over the crags.",
    image: "https://picsum.photos/seed/t8/800/650",
  },
  {
    id: 9,
    location: "Cappadocia, Turkey",
    description: "Cave hotels and hot-air balloons at first light.",
    image: "https://picsum.photos/seed/t9/800/800",
  },
];

export default function TravelPage() {
  return (
    <>
      <header className="px-6 pt-20 pb-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-normal text-stone-100 md:text-5xl lg:text-6xl"
          >
            Travel Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl font-sans text-lg text-stone-400"
          >
            A visual diary of places that have stayed with me — from quiet
            temples to busy markets, and everything in between.
          </motion.p>
        </div>
      </header>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {travelCards.map((card, i) => (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href="#" className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone-800">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-stone-950/0 transition duration-300 group-hover:bg-stone-950/70" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition duration-300 group-hover:opacity-100">
                      <h3 className="font-display text-2xl font-normal text-white">
                        {card.location}
                      </h3>
                      <p className="mt-2 font-sans text-sm text-stone-200">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
