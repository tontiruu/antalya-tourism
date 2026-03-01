import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Discover Antalya | トルコの楽園リゾート",
  description:
    "トルコ南西部に位置する地中海の宝石、アンタルヤ。美しいビーチ、古代遺跡、豊かな文化が織りなす楽園リゾートを発見しましょう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
