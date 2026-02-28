import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sansFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Varun Amin | Writer · Traveler · Creator",
  description:
    "Personal website of Varun Amin — writer, traveler, martial artist, and mentor. Explore stories, travel adventures, and reflections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sansFont.variable} font-sans antialiased min-h-screen flex`}
      >
        <Navbar />
        <div className="flex-1 flex flex-col min-w-0 md:pl-52">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
