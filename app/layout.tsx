import type { ReactNode } from "react";
import type { Metadata } from "next";
import { AgeGate } from "../components/age-gate";
import { SiteHeader } from "../components/site-header";
import { fraunces, plex } from "../lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auric Cryo",
  description: "Demo catalog. Not a live store. No orders are placed.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${plex.variable}`}>
        <div className="bar">Research use only. Not for human consumption.</div>
        <SiteHeader />
        {children}
        <p className="notice" style={{ padding: "0 1rem 2rem" }}>
          For laboratory research use only. Not for human consumption.
        </p>
        <AgeGate />
      </body>
    </html>
  );
}
