import { motion } from "framer-motion";
import { useInv } from "../store";
import { rarityVar } from "../lib/rarity";
import { ItemIcon } from "./ItemIcon";
import type { InvSlot } from "../types";

interface Props {
  index: number;        // visual slot number
  item?: InvSlot;
  zone: "inv" | "ground";
  hotkey?: number;      // shows a hotbar number badge
}

export function ItemSlot({ index, item, zone, hotkey }: Props) {
  const { registry, setHover, move, use, openWeapon } = useInv();
  const def = item ? registry[item.name] : null;
  const rgb = rarityVar(def?.rarity);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const from = Number(e.dataTransfer.getData("slot"));
    const fromZone = e.dataTransfer.getData("zone");
    if (fromZone === "inv" && zone === "inv" && from !== index) move(from, index);
  };

  return (
    <motion.div
      className={"slot" + (item ? " is-filled" : "")}
      style={{ ["--rgb" as string]: rgb }}
      draggable={!!item && zone === "inv"}
      onDragStart={(e) => { e.dataTransfer.setData("slot", String(index)); e.dataTransfer.setData("zone", zone); }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onMouseEnter={() => item && setHover(zone === "inv" ? index : -index)}
      onMouseLeave={() => setHover(null)}
      onClick={() => { if (def?.weapon && zone === "inv") openWeapon(index); }}
      onDoubleClick={() => { if (def?.usable && zone === "inv") use(index); }}
      whileHover={{ y: -2 }}
    >
      {hotkey && <span className="slot__hotkey">{hotkey}</span>}
      {item && def ? (
        <>
          <span className="slot__amount">{item.amount}</span>
          <ItemIcon def={def} className="slot__icon" />
          <div className="slot__iconglow" style={{ ["--rgb" as string]: rgb }} />
          <div className="slot__name" style={{ color: rgb }}>{def.label}</div>
          <div className="slot__weight">{(def.weight * item.amount).toFixed(1)}</div>
          <span className="slot__rail" />
        </>
      ) : (
        <span className="slot__empty">{index}</span>
      )}
    </motion.div>
  );
}
