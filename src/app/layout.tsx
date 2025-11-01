import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
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
  title: "DevArt - Programming Articles & Developer Resources",
  description: "Discover the latest programming articles, coding tutorials, and developer resources from the Dev.to community. Stay updated with trending tech content.",
  keywords: "programming, development, coding, tutorials, javascript, python, react, nextjs, web development, software engineering",
  authors: [{ name: "DevArt Team" }],
  creator: "DevArt",
  publisher: "DevArt",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://devto.30tools.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "DevArt - Programming Articles & Developer Resources",
    description: "Discover the latest programming articles, coding tutorials, and developer resources from the Dev.to community.",
    url: 'https://devto.30tools.com',
    siteName: 'DevArt',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevArt - Programming Articles & Developer Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "DevArt - Programming Articles & Developer Resources",
    description: "Discover the latest programming articles, coding tutorials, and developer resources from the Dev.to community.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
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
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
