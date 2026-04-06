import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteInsights } from "@/components/csi/site-insights";
import { ClickFeedback } from "@/components/ui/click-feedback";
import { SiteAmbientBackground } from "@/components/ui/site-ambient-background";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CSI Smart Tech | Intelligent Systems for Smarter Industry",
  description:
    "CSI Smart Tech delivers premium industrial automation, IoT-based systems, cloud manufacturing, and AI-powered ERP integration solutions for sustainable smart manufacturing.",
  generator: "v0.app",
  keywords: [
    "industrial automation",
    "IoT",
    "smart manufacturing",
    "cloud manufacturing",
    "sustainability",
    "ERP integration",
    "digital transformation",
  ],
  authors: [{ name: "CSI Smart Tech" }],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a3d2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable}`}>
      <body className="font-sans antialiased relative overflow-x-hidden">
        <SiteAmbientBackground />
        <div className="relative z-10">{children}</div>
        <ClickFeedback />
        <SiteInsights />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
