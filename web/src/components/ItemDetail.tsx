import { AnimatePresence, motion } from "framer-motion";
import { useInv } from "../store";
import { rarityVar } from "../lib/rarity";
import { ItemIcon } from "./ItemIcon";

export function ItemDetail() {
  const { hover, inventory, ground, registry, use } = useInv();
  const map = hover != null && hover > 0 ? inventory : ground;
  const idx = hover != null ? Math.abs(hover) : 0;
  const item = idx ? map[idx] : undefined;
  const def = item ? registry[item.name] : null;

  return (
    <AnimatePresence>
      {item && def && (
        <motion.div
          className="detail"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{ ["--rgb" as string]: rarityVar(def.rarity) }}
        >
          <div className="detail__head">
            <ItemIcon def={def} className="detail__icon" />
            <div>
              <div className="detail__name">{def.label}</div>
              <div className="detail__rarity">{def.rarity}</div>
            </div>
          </div>
          {def.description && <p className="detail__desc">{def.description}</p>}
          <div className="detail__meta">
            <span>Weight <b>{(def.weight * item.amount).toFixed(2)} kg</b></span>
            <span>Amount <b>{item.amount}</b></span>
          </div>
          {def.usable && hover != null && hover > 0 && (
            <button className="detail__use" onClick={() => use(idx)}>Use</button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
