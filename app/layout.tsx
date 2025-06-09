// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/app/providers";
import { Toaster } from 'react-hot-toast';
import { Analytics } from "@vercel/analytics/react"
import { UserProvider } from "./hooks/useLogged";

import '@/app/ui/globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GeTaPro",
  description: "Web App to manage investigation proyects",
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
        <UserProvider>
          <Providers>
            {children}
            <Toaster position="top-right" />
          </Providers>
          <Analytics />
        </UserProvider>
      </body>
    </html>
  );
}