import { useState, useEffect } from "react";
import { glyph } from "../lib/rarity";
import type { ItemDef } from "../types";

// Loads icons/{name}.png (qb naming convention). Falls back to the rarity-tinted
// letter glyph if no PNG exists for that item.
export function ItemIcon({ def, className }: { def?: ItemDef | null; className?: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [def?.name]);

  if (!def || failed) {
    return <span className={className}>{glyph(def)}</span>;
  }
  return (
    <img
      className={className}
      src={`icons/${def.name}.png`}
      alt=""
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}
