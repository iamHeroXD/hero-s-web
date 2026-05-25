import type { Metadata, Viewport } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const siteUrl = "https://hero-s-web.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Hero.X — Interactive Portfolio OS",
    template: "%s | Hero.X OS",
  },
  description:
    "Experience the most immersive developer portfolio ever built. Hero.X Portfolio OS — a fully interactive Windows XP-inspired cyberpunk operating system. Built with Next.js 15, Framer Motion, and TypeScript.",
  keywords: [
    "Hero.X", "portfolio", "developer portfolio", "interactive portfolio",
    "cyberpunk", "Windows XP", "OS portfolio", "Next.js developer",
    "full-stack developer", "Roblox developer", "UI designer", "creative developer",
    "React", "TypeScript", "Framer Motion", "web developer India",
  ],
  authors: [{ name: "Hero.X", url: siteUrl }],
  creator: "Hero.X",
  publisher: "Hero.X",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hero.X — Interactive Portfolio OS",
    description:
      "A portfolio that's actually an OS. Drag windows. Open apps. Hack the terminal. Experience the most cinematic developer portfolio on the web.",
    url: siteUrl,
    siteName: "Hero.X Portfolio OS",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hero.X Portfolio OS — Cyberpunk Windows XP Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hero.X — Interactive Portfolio OS",
    description:
      "A portfolio that's actually an OS. Drag windows. Hack the terminal. Experience the future.",
    creator: "@herox_dev",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  category: "portfolio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#0a0a2e" },
    { media: "(prefers-color-scheme: light)", color: "#0a0a2e" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={pressStart2P.variable}>
      <body className="overflow-hidden bg-black">{children}</body>
    </html>
  );
}
