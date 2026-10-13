import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>For laboratory research use only. Not for human consumption.</p>
        <p>Demo catalog. Not a live store. No orders are placed.</p>
        <nav aria-label="Footer">
          <Link href="/">Shop</Link>
          <Link href="/about/">About</Link>
          <Link href="/research-use/">Research use</Link>
        </nav>
      </div>
    </footer>
  );
}
