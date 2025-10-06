import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ModelPreloader } from "@/components/ModelPreloader";
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
  title: "Acheng Restaurant Virtual Museum | Preserving Subang Cuisine Heritage",
  description: "A digital archive preserving the labor-intensive culinary traditions of Acheng Restaurant and authentic Subang cuisine. Explore 26 years of cultural heritage through interactive 3D experiences.",
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
        <ModelPreloader />
        {children}
      </body>
    </html>
  );
}
