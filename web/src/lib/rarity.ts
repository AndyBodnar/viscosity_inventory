import type { ItemDef } from "../types";

export function rarityVar(r: string | undefined) {
  return `var(--r-${r ?? "common"})`;
}

// Until icon art ships, derive a clean glyph from the label.
export function glyph(def?: ItemDef | null) {
  if (!def) return "?";
  if (def.weapon) return "✦";
  return (def.label?.[0] ?? "?").toUpperCase();
}
