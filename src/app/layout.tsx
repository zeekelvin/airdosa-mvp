import type { Metadata } from "next";
import { Montserrat, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import { PageBackground } from "@/components/ui/PageBackground";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MobileNav } from "@/components/ui/MobileNav";
import { SiteNav } from "@/components/ui/SiteNav";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cheche Exotics — Experience Excellence",
  description:
    "Cheche Exotics is a luxury mobility brand delivering premium exotic vehicle experiences — designed for individuals who value prestige, comfort, and excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} ${cinzel.variable}`}
    >
      <body className="has-cursor min-h-screen bg-bg text-fg">
        <PageBackground />
        <SmoothScroll />
        <MagneticCursor />
        <ScrollProgress />
        <SiteNav />
        <MobileNav />
        {children}
      </body>
    </html>
  );
}
