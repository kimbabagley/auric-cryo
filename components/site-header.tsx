"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../lib/cart";
import { Icon } from "./icons";
import { SearchDialog } from "./search-dialog";
import { Announce } from "./announce";

const links = [
  { href: "/catalog", label: "Shop" },
  { href: "/research-use", label: "Research use" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Auric Cryo home">
      <svg width="22" height="28" viewBox="0 0 22 28" aria-hidden="true">
        <rect x="3" y="0" width="16" height="6" rx="2" fill="var(--steel)" />
        <rect x="5" y="6" width="12" height="3" fill="var(--ink)" opacity=".35" />
        <path d="M3 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
        <rect x="6" y="15" width="10" height="6" rx="1" fill="var(--ink)" />
      </svg>
      <span>Auric Cryo</span>
    </Link>
  );
}

export function SiteHeader() {
  const { count, bump, setOpen } = useCart();
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [pop, setPop] = useState(false);
  const first = useRef(true);

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setPop(true);
    const t = window.setTimeout(() => setPop(false), 450);
    return () => window.clearTimeout(t);
  }, [bump]);

  return (
    <>
      <Announce />
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <nav className="nav" aria-label="Main">
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={pathname?.startsWith(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button type="button" className="icon-btn" aria-label="Search products" onClick={() => setSearch(true)}>
              <Icon name="search" />
            </button>
            <button
              type="button"
              className="icon-btn cart-btn"
              aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
              onClick={() => setOpen(true)}
            >
              <Icon name="bag" />
              <span className={`badge ${pop ? "is-pop" : ""} ${count === 0 ? "is-empty" : ""}`} aria-hidden="true">
                {count}
              </span>
            </button>
            <button
              type="button"
              className="icon-btn menu-btn"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="mobile-nav"
              onClick={() => setMenu((m) => !m)}
            >
              <Icon name={menu ? "close" : "menu"} />
            </button>
          </div>
        </div>
        <nav id="mobile-nav" className={`mobile-nav ${menu ? "is-open" : ""}`} aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link href="/cart">Cart ({count})</Link>
        </nav>
      </header>
      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </>
  );
}
