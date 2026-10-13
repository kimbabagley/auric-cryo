"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { getCategory, getProduct } from "../data/catalog";
import { useCart } from "../lib/cart";
import { Icon } from "./icons";
import { Price } from "./price";
import { Vial } from "./vial";

const steps = ["Contact", "Shipping", "Review", "Payment"] as const;

type Info = { email: string; first: string; last: string; address: string; city: string; region: string; postal: string };
const blank: Info = { email: "", first: "", last: "", address: "", city: "", region: "", postal: "" };

export function CheckoutFlow() {
  const { lines, subtotalCents, count, clear, ready } = useCart();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [info, setInfo] = useState<Info>(blank);
  const [showSummary, setShowSummary] = useState(false);

  const set = (k: keyof Info) => (e: { target: { value: string } }) => setInfo((i) => ({ ...i, [k]: e.target.value }));
  const next = (e?: FormEvent) => {
    e?.preventDefault();
    setStep((s) => Math.min(3, s + 1));
    window.scrollTo({ top: 0 });
  };

  if (done) {
    return (
      <div className="confirm">
        <span className="confirm-icon">
          <Icon name="check" size={32} />
        </span>
        <h1>Demo checkout complete</h1>
        <p className="confirm-lead">No order was placed. No payment was taken.</p>
        <p>The details you typed were never sent anywhere, and your demo cart has been emptied.</p>
        <Link href="/catalog" className="btn btn-primary">
          Back to the shop
        </Link>
      </div>
    );
  }

  if (!ready) return <div className="loading" aria-busy="true" />;

  if (lines.length === 0) {
    return (
      <div className="confirm">
        <h1>Your cart is empty</h1>
        <p>Add a vial or two to walk through the demo checkout.</p>
        <Link href="/catalog" className="btn btn-primary">
          Browse the catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-main">
        <h1 className="checkout-title">Checkout</h1>
        <ol className="steps" aria-label="Checkout steps">
          {steps.map((s, i) => (
            <li key={s} className={i < step ? "is-done" : i === step ? "is-current" : ""} aria-current={i === step ? "step" : undefined}>
              <button type="button" disabled={i > step} onClick={() => setStep(i)}>
                <span className="step-dot">{i < step ? <Icon name="check" size={14} /> : i + 1}</span>
                <span className="step-label">{s}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="fine">Nothing you type here leaves this browser.</p>

        {step === 0 ? (
          <form className="panel" onSubmit={next}>
            <h2>Contact</h2>
            <label className="field">
              <span>Email</span>
              <input type="email" required autoComplete="email" value={info.email} onChange={set("email")} />
            </label>
            <button className="btn btn-primary btn-block" type="submit">
              Continue to shipping
            </button>
          </form>
        ) : null}

        {step === 1 ? (
          <form className="panel" onSubmit={next}>
            <h2>Shipping address</h2>
            <div className="field-row">
              <label className="field">
                <span>First name</span>
                <input required autoComplete="given-name" value={info.first} onChange={set("first")} />
              </label>
              <label className="field">
                <span>Last name</span>
                <input required autoComplete="family-name" value={info.last} onChange={set("last")} />
              </label>
            </div>
            <label className="field">
              <span>Street address</span>
              <input required autoComplete="street-address" value={info.address} onChange={set("address")} />
            </label>
            <div className="field-row field-row-3">
              <label className="field">
                <span>City</span>
                <input required autoComplete="address-level2" value={info.city} onChange={set("city")} />
              </label>
              <label className="field">
                <span>State</span>
                <input required autoComplete="address-level1" value={info.region} onChange={set("region")} />
              </label>
              <label className="field">
                <span>ZIP</span>
                <input required autoComplete="postal-code" inputMode="numeric" value={info.postal} onChange={set("postal")} />
              </label>
            </div>
            <div className="ship-option">
              <Icon name="box" />
              <div>
                <strong>Demo warehouse</strong>
                <span>Not a real warehouse. Nothing ships from this demo.</span>
              </div>
            </div>
            <button className="btn btn-primary btn-block" type="submit">
              Continue to review
            </button>
          </form>
        ) : null}

        {step === 2 ? (
          <div className="panel">
            <h2>Review</h2>
            <dl className="review">
              <div>
                <dt>Contact</dt>
                <dd>{info.email}</dd>
                <button type="button" className="link-btn" onClick={() => setStep(0)}>
                  Edit
                </button>
              </div>
              <div>
                <dt>Ship to</dt>
                <dd>
                  {info.first} {info.last}, {info.address}, {info.city}, {info.region} {info.postal}
                </dd>
                <button type="button" className="link-btn" onClick={() => setStep(1)}>
                  Edit
                </button>
              </div>
              <div>
                <dt>Items</dt>
                <dd>
                  {count} {count === 1 ? "vial" : "vials"}
                </dd>
              </div>
            </dl>
            <button className="btn btn-primary btn-block" type="button" onClick={() => next()}>
              Continue to payment
            </button>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="panel">
            <h2>Payment</h2>
            <div className="pay-off">
              <Icon name="lock" size={22} />
              <div>
                <strong>Payment is not connected on this demo.</strong>
                <span>There is no card form and no processor. Nothing can be charged.</span>
              </div>
            </div>
            <button className="btn btn-primary btn-block" type="button" disabled>
              Pay now (not connected)
            </button>
            <button
              className="btn btn-ghost btn-block"
              type="button"
              onClick={() => {
                clear();
                setInfo(blank);
                setDone(true);
                window.scrollTo({ top: 0 });
              }}
            >
              Finish the demo without paying
            </button>
          </div>
        ) : null}
      </div>

      <aside className={`summary summary-collapsible ${showSummary ? "is-expanded" : ""}`} aria-label="Order summary">
        <button
          type="button"
          className="summary-toggle"
          aria-expanded={showSummary}
          onClick={() => setShowSummary((v) => !v)}
        >
          <span>
            {showSummary ? "Hide" : "Show"} order summary <Icon name="chevron" size={16} />
          </span>
          <Price cents={subtotalCents} />
        </button>
        <h2>Order summary</h2>
        <ul className="summary-lines">
          {lines.map((l) => {
            const p = getProduct(l.sku);
            if (!p) return null;
            return (
              <li key={l.sku}>
                <span className="thumb" style={{ background: getCategory(p.category).tint }}>
                  <Vial sku={p.sku} name={p.name} />
                  <span className="thumb-qty">{l.qty}</span>
                </span>
                <span className="summary-name">
                  {p.name}
                  <small>{p.size} vial</small>
                </span>
                <Price cents={p.priceCents * l.qty} />
              </li>
            );
          })}
        </ul>
        <div className="sum-row">
          <span>Subtotal</span>
          <Price cents={subtotalCents} />
        </div>
        <div className="sum-row muted">
          <span>Shipping</span>
          <span>None, demo only</span>
        </div>
        <div className="sum-row sum-total">
          <span>Total</span>
          <Price cents={subtotalCents} className="price-lg" />
        </div>
      </aside>
    </div>
  );
}
