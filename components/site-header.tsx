import Link from "next/link";

const links = [
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "About" },
  { href: "/research-use", label: "Research use" },
  { href: "/cart", label: "Cart" },
];

export function SiteHeader() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link className="wordmark" href="/">
          Auric Cryo
        </Link>
        <nav className="nav" aria-label="Pages">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
