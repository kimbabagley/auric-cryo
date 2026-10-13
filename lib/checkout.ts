export type MethodId = "ground" | "parcel";

export type CheckoutDraft = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  method: MethodId | "";
};

export const emptyDraft: CheckoutDraft = {
  name: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  postal: "",
  country: "",
  method: "",
};

export const methods: { id: MethodId; label: string }[] = [
  { id: "ground", label: "Demo ground. Not a real shipment." },
  { id: "parcel", label: "Demo parcel. Not a real shipment." },
];

const KEY = "auric-cryo-checkout";

export function readDraft(): CheckoutDraft {
  if (typeof window === "undefined") return emptyDraft;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return emptyDraft;
    const parsed = JSON.parse(raw) as Partial<CheckoutDraft>;
    return { ...emptyDraft, ...parsed };
  } catch {
    return emptyDraft;
  }
}

export function writeDraft(draft: CheckoutDraft): void {
  window.sessionStorage.setItem(KEY, JSON.stringify(draft));
}

export function contactReady(draft: CheckoutDraft): boolean {
  return (
    draft.name.trim().length >= 2 &&
    /.+@.+\..+/.test(draft.email.trim()) &&
    draft.phone.replace(/\D/g, "").length >= 7
  );
}

export function addressReady(draft: CheckoutDraft): boolean {
  return (
    draft.street.trim().length >= 2 &&
    draft.city.trim().length >= 2 &&
    draft.state.trim().length >= 2 &&
    draft.postal.trim().length >= 3 &&
    draft.country.trim().length >= 2
  );
}
