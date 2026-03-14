import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "SiteSphere | Architecting Digital Excellence",
  description:
    "SiteSphere — Minimalist enterprise-grade digital architecture and web solutions for the modern tech era.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Hum ne yahan se <head> nikal diya hai kyunke ab metadata khud sab handle karega */}
      <body
        className={`${inter.variable} ${fraunces.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}