import type { Metadata } from "next";
import { Geist, Geist_Mono, Hina_Mincho } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hinaMincho = Hina_Mincho({
  variable: "--font-hina-mincho",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "はこHAKO",
  description:
    "“はこ”ってなんだろう？ 運ぶ、詰める、包む、守る、隠す、贈る… ⠀ 6人のシンガポール発クリエイターが、 アート・料理・インスタレーション・飲み物で それぞれの“はこ”を表現した体感型展示。",
  icons: {
    icon: "/favicon.png",
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
        className={`${geistSans.variable} ${geistMono.variable} ${hinaMincho.variable} antialiased`}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W0S0J1SJ45"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W0S0J1SJ45');
          `}
        </Script>
      </body>
    </html>
  );
}
