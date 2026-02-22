import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aria – FP&A Platform",
  description: "AI-powered financial reporting and planning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-zinc-950 text-zinc-100 font-sans">
        {children}
      </body>
    </html>
  );
}
