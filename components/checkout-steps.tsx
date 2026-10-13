"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { demoPrice, products } from "@/data/catalog";
import { productImage } from "@/lib/assets";
import { readCart, type CartLine } from "@/lib/cart";
import {
  addressReady,
  contactReady,
  emptyDraft,
  methods,
  readDraft,
  writeDraft,
  type CheckoutDraft,
  type MethodId,
} from "@/lib/checkout";
import { lineTotal } from "@/components/cart-lines";

function useDraft() {
  const [draft, setDraft] = useState<CheckoutDraft>(emptyDraft);
  const [lines, setLines] = useState<CartLine[]>([]);
  useEffect(() => {
    setDraft(readDraft());
    setLines(readCart());
  }, []);
  return { draft, setDraft, lines };
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete: string;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function focusFirst(errors: Record<string, string>) {
  const first = Object.keys(errors)[0];
  if (first) document.getElementById(first)?.focus();
}

export function ContactStep() {
  const router = useRouter();
  const { draft, setDraft } = useDraft();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (draft.name.trim().length < 2) next.name = "Enter a name.";
    if (!/.+@.+\..+/.test(draft.email.trim())) next.email = "Enter an email.";
    if (draft.phone.replace(/\D/g, "").length < 7) next.phone = "Enter a phone number.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      focusFirst(next);
      return;
    }
    writeDraft(draft);
    router.push("/checkout/address/");
  }

  return (
    <form onSubmit={submit} noValidate>
      <Field
        id="name"
        label="Name"
        autoComplete="name"
        value={draft.name}
        error={errors.name}
        onChange={(value) => setDraft({ ...draft, name: value })}
      />
      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={draft.email}
        error={errors.email}
        onChange={(value) => setDraft({ ...draft, email: value })}
      />
      <Field
        id="phone"
        label="Phone"
        type="tel"
        autoComplete="tel"
        value={draft.phone}
        error={errors.phone}
        onChange={(value) => setDraft({ ...draft, phone: value })}
      />
      <div className="actions">
        <Link className="btn btn-quiet" href="/cart/">
          Back to cart
        </Link>
        <button className="btn" type="submit">
          Continue
        </button>
      </div>
    </form>
  );
}

export function AddressStep() {
  const router = useRouter();
  const { draft, setDraft } = useDraft();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!contactReady(draft)) {
      router.push("/checkout/contact/");
      return;
    }
    const next: Record<string, string> = {};
    if (draft.street.trim().length < 2) next.street = "Enter a street.";
    if (draft.city.trim().length < 2) next.city = "Enter a city.";
    if (draft.state.trim().length < 2) next.state = "Enter a state.";
    if (draft.postal.trim().length < 3) next.postal = "Enter a postal code.";
    if (draft.country.trim().length < 2) next.country = "Enter a country.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      focusFirst(next);
      return;
    }
    writeDraft(draft);
    router.push("/checkout/method/");
  }

  return (
    <form onSubmit={submit} noValidate>
      <p className="lead">This form does not arrange a shipment.</p>
      <Field
        id="street"
        label="Street"
        autoComplete="street-address"
        value={draft.street}
        error={errors.street}
        onChange={(value) => setDraft({ ...draft, street: value })}
      />
      <Field
        id="city"
        label="City"
        autoComplete="address-level2"
        value={draft.city}
        error={errors.city}
        onChange={(value) => setDraft({ ...draft, city: value })}
      />
      <Field
        id="state"
        label="State"
        autoComplete="address-level1"
        value={draft.state}
        error={errors.state}
        onChange={(value) => setDraft({ ...draft, state: value })}
      />
      <Field
        id="postal"
        label="Postal code"
        autoComplete="postal-code"
        value={draft.postal}
        error={errors.postal}
        onChange={(value) => setDraft({ ...draft, postal: value })}
      />
      <Field
        id="country"
        label="Country"
        autoComplete="country-name"
        value={draft.country}
        error={errors.country}
        onChange={(value) => setDraft({ ...draft, country: value })}
      />
      <div className="actions">
        <Link className="btn btn-quiet" href="/checkout/contact/">
          Back
        </Link>
        <button className="btn" type="submit">
          Continue
        </button>
      </div>
    </form>
  );
}

export function MethodStep() {
  const router = useRouter();
  const { draft, setDraft } = useDraft();
  const [error, setError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!addressReady(draft)) {
      router.push("/checkout/address/");
      return;
    }
    if (draft.method !== "ground" && draft.method !== "parcel") {
      setError("Choose a shipping method.");
      return;
    }
    writeDraft(draft);
    router.push("/checkout/review/");
  }

  function choose(id: MethodId) {
    setError("");
    setDraft({ ...draft, method: id });
  }

  return (
    <form onSubmit={submit} noValidate>
      <fieldset className="method-list">
        <legend>Shipping method</legend>
        {methods.map((method) => (
          <label key={method.id} className="method">
            <input
              type="radio"
              name="method"
              value={method.id}
              checked={draft.method === method.id}
              onChange={() => choose(method.id)}
            />
            <span>{method.label}</span>
            {draft.method === method.id ? <span className="picked">Selected</span> : null}
          </label>
        ))}
      </fieldset>
      {error ? <p className="field-error">{error}</p> : null}
      <div className="actions">
        <Link className="btn btn-quiet" href="/checkout/address/">
          Back
        </Link>
        <button className="btn" type="submit">
          Continue
        </button>
      </div>
    </form>
  );
}

export function OrderSummary() {
  const { draft, lines } = useDraft();
  const method = methods.find((item) => item.id === draft.method);

  return (
    <div className="summary">
      <h2>Order summary</h2>
      {lines.length === 0 ? <p>Nothing in the cart.</p> : null}
      <ul className="cart-lines">
        {lines.map((line) => {
          const item = products.find((product) => product.sku === line.sku);
          if (!item) return null;
          return (
            <li key={item.sku} className="cart-line">
              <img src={productImage(item.sku)} alt="" width={1000} height={1250} />
              <div>
                <p className="line-name">{item.name}</p>
                <p>{item.size}</p>
                <p>
                  {line.qty} × {demoPrice(item.priceCents)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <dl>
        <dt>Address</dt>
        <dd>
          {draft.name ? <span>{draft.name}</span> : <span>No address yet.</span>}
          {draft.street ? (
            <>
              <br />
              {draft.street}
              <br />
              {draft.city}, {draft.state} {draft.postal}
              <br />
              {draft.country}
            </>
          ) : null}
        </dd>
        <dt>Method</dt>
        <dd>{method ? method.label : "No method selected."}</dd>
      </dl>
      <p className="demo-total">
        <span>DEMO total</span>
        <span>{demoPrice(lineTotal(lines))}</span>
      </p>
    </div>
  );
}
