import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { AgeGate } from "@/components/age-gate";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { sans, wordmark } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auric Cryo",
  description: "Demo catalog. Not a live store. No orders are placed.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${wordmark.variable}`} suppressHydrationWarning>
      <body className={sans.className}>
        <Script id="age-state" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem("auric-cryo-age")==="21")document.documentElement.dataset.age="ok"}catch(e){}`}
        </Script>
        <SiteHeader />
        {children}
        <SiteFooter />
        <CartDrawer />
        <AgeGate />
      </body>
    </html>
  );
}
