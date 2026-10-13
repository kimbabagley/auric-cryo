import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { AgeGate } from "../components/age-gate";
import { CartDrawer } from "../components/cart-drawer";
import { SiteHeader } from "../components/site-header";
import { categories } from "../data/catalog";
import { CartProvider } from "../lib/cart";
import { display, ui } from "../lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Auric Cryo | Research peptide demo store", template: "%s | Auric Cryo" },
  description: "Demo catalog. Not a live store. No orders are placed.",
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${ui.variable}`}>
      <body>
        <CartProvider>
          <a href="#main" className="skip">
            Skip to content
          </a>
          <SiteHeader />
          <div id="main">{children}</div>
          <footer className="footer">
            <div className="container">
              <div className="footer-top">
                <div className="footer-brand">
                  <p className="footer-mark">Auric Cryo</p>
                  <p>Lyophilized research peptides, listed with their vial size, SKU and storage note. A demo storefront.</p>
                </div>
                <div className="footer-col">
                  <h2>Shop</h2>
                  <Link href="/catalog">All products</Link>
                  {categories.map((c) => (
                    <Link key={c.slug} href={`/catalog/?c=${c.slug}`}>
                      {c.label}
                    </Link>
                  ))}
                </div>
                <div className="footer-col">
                  <h2>Information</h2>
                  <Link href="/research-use">Research use</Link>
                  <Link href="/about">About</Link>
                  <Link href="/contact">Contact</Link>
                  <Link href="/cart">Cart</Link>
                </div>
                <div className="footer-col footer-note">
                  <h2>About this demo</h2>
                  <p>Demo catalog. Not a live store. No orders are placed.</p>
                  <p>For laboratory research use only. Not for human consumption.</p>
                </div>
              </div>
              <div className="footer-legal">
                <span>© 2026 Auric Cryo demo. Prices are marked DEMO and are not a quote.</span>
                <span>You must be 21 or older to browse.</span>
              </div>
            </div>
          </footer>
          <CartDrawer />
          <AgeGate />
        </CartProvider>
      </body>
    </html>
  );
}
