import type { Metadata } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sitesphere.tech"),
  title: "SiteSphere | Web design & local SEO for local businesses",
  description:
    "SiteSphere designs fast, custom websites and runs the local SEO behind them, so clinics, restaurants, law firms and trades get found first and booked more often.",
  openGraph: {
    title: "SiteSphere | Web design & local SEO for local businesses",
    description:
      "Custom websites, local SEO and Google Business Profile management for businesses that serve their neighbourhood.",
    type: "website",
    siteName: "SiteSphere",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable} scroll-smooth`}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
