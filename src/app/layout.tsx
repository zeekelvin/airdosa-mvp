import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import { PageBackground } from "@/components/ui/PageBackground";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "MVP — Lamborghini Huracán STO · Available Now",
  description:
    "MVP is a curated dealership for the world's most uncompromising machines. Currently on the floor: Lamborghini Huracán STO. Track-bred. Street-legal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable}`}
    >
      <body className="has-cursor min-h-screen bg-bg text-fg">
        <PageBackground />
        <SmoothScroll />
        <MagneticCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
