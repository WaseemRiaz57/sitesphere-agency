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
  metadataBase: new URL("https://www.sitesphere.me"),
  title: "SiteSphere | Web design, SEO & UGC ads for local businesses",
  description:
    "SiteSphere is a web design and digital marketing agency for local businesses: custom websites, local SEO, Google Business Profile, UGC video ads and paid social campaigns.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SiteSphere | Web design, SEO & UGC ads for local businesses",
    description:
      "Custom websites, local SEO, UGC video ads and paid marketing for businesses that serve their neighbourhood.",
    url: "https://www.sitesphere.me",
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
