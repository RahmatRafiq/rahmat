import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Layout from "../../components/Layout";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';

const inter = Inter({ subsets: ["latin"] });

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Rahmat | Full Stack & Golang Backend Engineer",
    template: "%s | Rahmat"
  },
  description: "Portfolio Rahmat, Full-Stack Software Engineer berpengalaman dalam membangun arsitektur backend scalable (Golang, Laravel) & modern frontend Next.js.",
  keywords: [
    "Rahmat",
    "Full Stack Developer Indonesia",
    "Backend Engineer",
    "Golang Developer",
    "Laravel Developer",
    "React Next.js Expert",
    "Clean Architecture",
    "System Design",
    "Software Engineer Portfolio"
  ],
  authors: [{ name: "Rahmat", url: appUrl }],
  creator: "Rahmat",
  publisher: "Rahmat",
  alternates: {
    canonical: "/",
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
    locale: "en_US",
    url: appUrl,
    title: "Rahmat | Full Stack & Backend Engineer",
    description: "Architecting scalable systems with Go, Laravel, and Next.js.",
    siteName: "Rahmat Portfolio",
    images: [
      {
        url: "/rahmat.png",
        width: 800,
        height: 800,
        alt: "Rahmat Profile picture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahmat | Full Stack & Backend Engineer",
    description: "Architecting scalable systems with Go, Laravel, and Next.js.",
    creator: "@rahmatrafiq",
    images: ["/rahmat.png"],
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-primary/30`}>
        <NextIntlClientProvider messages={messages}>
          <Layout>{children}</Layout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
