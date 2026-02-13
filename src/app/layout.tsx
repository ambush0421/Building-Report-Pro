import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://building-report.pro"),
  title: {
    default: "BuildingReportPro V3 - AI PDCA Building Reports",
    template: "%s | BuildingReportPro V3",
  },
  description:
    "BuildingReportPro provides AI-assisted PDCA building reports for acquisition and lease decision making.",
  openGraph: {
    title: "BuildingReportPro V3 - AI PDCA Building Reports",
    description:
      "AI-assisted PDCA workflow for faster, clearer building analysis and reporting.",
    url: "https://building-report.pro",
    siteName: "BuildingReportPro V3",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildingReportPro V3 - AI PDCA Building Reports",
    description: "AI-assisted PDCA building reporting platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="canonical" href="https://building-report.pro" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <TooltipProvider>
          <main className="flex-1">{children}</main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
