import type { Metadata } from "next";
import { Cinzel, Allura, Lato } from "next/font/google";
import "./globals.css";

const fontHeading = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const fontScript = Allura({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
});

const fontSans = Lato({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Gala des 20 Ans | AIESEC in Benin",
  description:
    "Célébrons 20 ans d'impact. Un gala prestigieux réunissant leaders, entrepreneurs et décideurs internationaux — Juin 2026, Cotonou.",
};

import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${fontHeading.variable} ${fontScript.variable} ${fontSans.variable}`}
    >
      <body className="antialiased bg-background font-sans">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
