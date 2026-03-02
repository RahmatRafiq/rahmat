import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Rahmat Rafiq | Full Stack & Golang Backend Engineer",
    template: "%s | Rahmat Rafiq"
  },
  description: "Portfolio Rahmat Rafiq, Full-Stack Software Engineer berpengalaman dalam membangun arsitektur backend scalable (Golang, Laravel) & modern frontend Next.js.",
  keywords: [
    "Rahmat Rafiq",
    "Full Stack Developer Indonesia",
    "Backend Engineer",
    "Golang Developer",
    "Laravel Developer",
    "React Next.js Expert",
    "Clean Architecture",
    "System Design",
    "Software Engineer Portfolio"
  ],
  authors: [{ name: "Rahmat Rafiq", url: appUrl }],
  creator: "Rahmat Rafiq",
  publisher: "Rahmat Rafiq",
  alternates: {
    canonical: "/", // Otomatis tersambung ke metadataBase
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
  openGraph: {
    type: "website",
    locale: "en_US", // Sesuai feedback
    url: appUrl,
    title: "Rahmat Rafiq | Full Stack & Backend Engineer",
    description: "Architecting scalable systems with Go, Laravel, and Next.js.",
    siteName: "Rahmat Rafiq Portfolio",
    images: [
      {
        url: "/rahmat.png", // Next.js otomatis menjadikannya absolut (appUrl + /rahmat.png)
        width: 800,
        height: 800,
        alt: "Rahmat Rafiq Profile picture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahmat Rafiq | Full Stack & Backend Engineer",
    description: "Architecting scalable systems with Go, Laravel, and Next.js.",
    creator: "@rahmatrafiq",
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
