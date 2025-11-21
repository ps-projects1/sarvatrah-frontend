import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Roboto } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // optional weights
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarvatrah - Explore Amazing Holiday Packages, Activities & Pilgrimage Tours",
  description: "Discover unforgettable travel experiences with Sarvatrah. Book holiday packages, adventure activities, and pilgrimage tours across India at exclusive deals. Your wanderlust journey begins here!",
  keywords: ["travel", "holiday packages", "adventure activities", "pilgrimage tours", "tours", "vacation", "India travel"],
  authors: [{ name: "Sarvatrah" }],
  openGraph: {
    title: "Sarvatrah - Explore The Wanderer Within",
    description: "Discover amazing places at exclusive deals. Book holidays, activities, and pilgrimages.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
