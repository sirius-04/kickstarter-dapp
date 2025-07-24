import type { Metadata } from "next";
import { Geist, Geist_Mono, Grenze_Gotisch } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers';
import ContextProvider from '@/context';
import Header from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KickStarter",
  description: "KickStarter clone dapp",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headersObj = await headers();
  const cookies = headersObj.get('cookie');

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ContextProvider cookies={cookies}>
          <Header />
          <main className="px-1 sm:px-2 md:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 md:py-10 lg:py-12 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </ContextProvider>
      </body>
    </html>
  );
}
