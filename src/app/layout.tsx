import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CVAudit — ATS Match Analyzer",
  description: "Analyze your CV against any job posting. Get your ATS match score, keyword gaps, and AI-powered rewrite suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
