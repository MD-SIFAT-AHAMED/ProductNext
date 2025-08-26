import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientNavbar from "./component/ClientNavbar";
import Providers from "./component/Providers";
import GlobalPageLoader from "../components/ui/GlobalPageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gadget Finder - Discover Amazing Tech",
  description:
    "Find the best gadgets and technology products with detailed reviews, comparisons, and expert recommendations.",
  keywords: "gadgets, technology, electronics, smartphones, laptops, reviews",
  authors: [{ name: "Gadget Finder Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <ClientNavbar />
            <main className="flex-1 pt-16 lg:pt-20">{children}</main>
            <GlobalPageLoader />
          </div>
        </Providers>
      </body>
    </html>
  );
}
