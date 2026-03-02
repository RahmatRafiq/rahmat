import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rahmat Rafiq | Full Stack & Backend Engineer",
  description: "Portfolio of Rahmat Rafiq, specializing in scalable backend systems (Golang, Laravel) and modern frontends (React, Next.js). Expertise in Clean Architecture and UML Design.",
  keywords: ["Rahmat Rafiq", "Backend Engineer", "Full Stack Developer", "Golang", "Laravel", "React", "Next.js", "Clean Architecture", "UML Design"],
  authors: [{ name: "Rahmat Rafiq" }],
  openGraph: {
    title: "Rahmat Rafiq | Full Stack & Backend Engineer",
    description: "Architecting scalable systems with Go, Laravel, and Next.js.",
    url: "https://rahmatrafiq.com", // Adjust if actual domain is known
    siteName: "Rahmat Rafiq Portfolio",
    images: [
      {
        url: "/rahmat.png",
        width: 800,
        height: 800,
        alt: "Rahmat Rafiq",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahmat Rafiq | Full Stack & Backend Engineer",
    description: "Architecting scalable systems with Go, Laravel, and Next.js.",
    images: ["/rahmat.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-primary/30`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
