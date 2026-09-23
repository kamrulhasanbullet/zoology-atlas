import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Zoology Atlas",
    template: "%s | Zoology Atlas",
  },
  description:
    "Interactive digital atlas for exploring zoology, anatomy, taxonomy and evolution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050b09] text-white antialiased">
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
