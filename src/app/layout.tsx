import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "../components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Japan Starter - Your First Japan Adventure | Complete Travel Guide 2025",
  description: "New to Japan travel? Discover Tokyo, Kyoto, Osaka & more with our interactive map. Essential travel tips, attraction guides, and FAQ for first-time visitors to Japan.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  keywords: [
    "Japan travel guide",
    "first time Japan",
    "Tokyo attractions", 
    "Kyoto travel",
    "Osaka guide",
    "Japan itinerary",
    "Japan travel tips",
    "Japan tourist attractions",
    "visit Japan",
    "Japan travel FAQ",
    "Japan travel beginner",
    "Japan destinations",
    "Hiroshima travel",
    "Mount Fuji guide",
    "Japan cultural tips",
    "Japan transportation guide",
    "JR Pass guide",
    "Japan travel budget",
    "best time visit Japan",
    "Japan travel planning"
  ],
  authors: [{ name: "Japan Starter" }],
  creator: "Japan Starter",
  publisher: "Japan Starter",
  category: "Travel",
  classification: "Travel Guide",
  openGraph: {
    title: "Japan Starter - Your First Japan Adventure | Complete Travel Guide 2025",
    description: "Interactive guide to Japan's top destinations. Discover Tokyo, Kyoto, Osaka & more with detailed city guides, attraction reviews, and essential travel tips for first-time visitors.",
    type: "website",
    siteName: "Japan Starter",
    locale: "en_US",
    url: "https://japan-starter.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Starter - Your First Japan Adventure",
    description: "Interactive guide to Japan's top destinations with city guides and travel tips for first-time visitors.",
    creator: "@japanstarter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token_here", // You'll need to add your Google Search Console verification
  },
  alternates: {
    canonical: "https://japan-starter.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
