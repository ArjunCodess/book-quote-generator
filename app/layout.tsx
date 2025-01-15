import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Quote Generator - Make Beautiful Quote Covers",
  description: "Create pretty quote covers. Write your own or let AI help you. Choose book backdrops, change colors, and save as images. It's super easy!",
  keywords: ["book quotes", "quote generator", "AI quotes", "book backgrounds", "quote maker", "quote covers", "book cover generator", "AI book cover generator", "book cover maker", "AI book cover maker"],
  authors: [{ name: "Arjun Vijay Prakash" }],
  openGraph: {
    title: "Book Quote Generator - Make Beautiful Quote Covers",
    description: "Make beautiful quote covers. Super easy!",
    images: ["/public/image.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
