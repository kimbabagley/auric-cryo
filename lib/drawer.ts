const listeners = new Set<() => void>();
let open = false;
let note = "";

export function isDrawerOpen(): boolean {
  return open;
}

export function drawerNote(): string {
  return note;
}

function emit(): void {
  listeners.forEach((fn) => fn());
}

export function openDrawer(message = ""): void {
  open = true;
  note = message;
  emit();
}

export function closeDrawer(): void {
  open = false;
  note = "";
  emit();
}

export function onDrawer(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
