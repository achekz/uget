import type { Metadata } from "next";
import { Tajawal, IBM_Plex_Sans_Arabic } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutWrapper } from "@/components/layout-wrapper";
import "./globals.css";

const tajawal = Tajawal({ subsets: ["arabic", "latin"], weight: ["300", "400", "500", "700", "800", "900"], variable: "--font-tajawal", display: "swap" });
const ibmPlex = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-ibm-plex-sans-arabic", display: "swap" });

export const metadata: Metadata = {
  title: { default: "الاتحاد العام لطلبة تونس | UGET", template: "%s | UGET" },
  description: "الاتحاد العام لطلبة تونس (UGET) - منظمة طلابية نقابية تأسست سنة 1952. الناطق الرسمي باسم الطلبة التونسيين.",
  keywords: ["UGET", "طلبة", "تونس", "نقابي", "جامعة", "توجيه"],
  authors: [{ name: "مكتب تنفيذي وطني" }],
  openGraph: { title: "الاتحاد العام لطلبة تونس | UGET", description: "نضال، استقلالية، صمود، ديمقراطية", type: "website", locale: "ar_TN" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="light">
      <body className={`${tajawal.variable} ${ibmPlex.variable} font-sans antialiased bg-paper text-ink min-h-screen flex flex-col`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
