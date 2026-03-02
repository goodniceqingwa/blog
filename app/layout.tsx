import type { Metadata } from "next";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  Noto_Sans_SC,
} from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QingWaaa | Digital Artist & Fanart Creator",
  description:
    "个人艺术作品集 — Invader Zim, South Park, Stranger Things 同人艺术展示",
  keywords: [
    "fanart",
    "digital art",
    "invader zim",
    "south park",
    "stranger things",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${notoSansSC.variable}`}
    >
      <body className="font-body">
        <ThemeProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
