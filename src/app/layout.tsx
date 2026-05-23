import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hero.X — Developer Portfolio",
  description: "Interactive portfolio OS built by Hero.X — full-stack developer, Roblox creator, UI designer.",
  openGraph: {
    title: "Hero.X Portfolio",
    description: "Experience the most creative developer portfolio OS ever built.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={pressStart2P.variable}>
      <body className="overflow-hidden bg-black">{children}</body>
    </html>
  );
}
