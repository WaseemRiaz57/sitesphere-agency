import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// The dental demo keeps its own clinic typography, separate from the agency site.
export default function DentalDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`${inter.className} bg-white`}>{children}</div>;
}
