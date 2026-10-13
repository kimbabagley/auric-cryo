import Link from "next/link";
import { CartButton } from "@/components/cart-button";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-bar">
        <Link href="/" className="wordmark">
          Auric Cryo
        </Link>
        <nav className="header-nav" aria-label="Shop">
          <Link href="/">Shop</Link>
          <Link href="/about/">About</Link>
          <Link href="/research-use/">Research use</Link>
        </nav>
        <CartButton />
      </div>
    </header>
  );
}
