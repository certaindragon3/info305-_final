import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ModelPreloader } from "@/components/ModelPreloader";
import { HydrationStyleReset } from "@/components/HydrationStyleReset";
import Footer from "@/components/sections/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to optimize external resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <HydrationStyleReset />
        <ModelPreloader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
