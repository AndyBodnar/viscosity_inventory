import { useRef } from "react";
import { motion } from "framer-motion";
import { useInv } from "../store";
import type { AttachPoint } from "../types";
import { fetchNui } from "../nui/fetchNui";

// Mount points positioned over the centered weapon stage (% coords).
const POINTS: AttachPoint[] = [
  { id: "scope", label: "Optic", x: 44, y: 20 },
  { id: "suppressor", label: "Muzzle", x: 9, y: 47 },
  { id: "flashlight", label: "Tactical", x: 30, y: 66 },
  { id: "grip", label: "Grip", x: 49, y: 80 },
  { id: "magazine", label: "Magazine", x: 63, y: 76 },
];

export function WeaponView() {
  const { weaponSlot, inventory, registry, closeWeapon } = useInv();
  const item = weaponSlot != null ? inventory[weaponSlot] : null;
  const def = item ? registry[item.name] : null;
  const attached = new Set(item?.metadata?.attachments ?? []);
  const durability = item?.metadata?.durability ?? 100;

  const dragging = useRef(false);

  const toggle = (id: string) => {
    void fetchNui("weapon:attach", { slot: weaponSlot, attachment: id, on: !attached.has(id) });
  };

  const onMove = (e: React.PointerEvent) => {
    if (dragging.current && (e.movementX || e.movementY)) {
      void fetchNui("weapon:rotate", { dx: e.movementX, dy: e.movementY });
    }
  };

  return (
    <motion.div
      className="weapon"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <button className="weapon__back" onClick={closeWeapon}>‹ Back to inventory</button>

      {/* Stage is transparent in-game (the live GTA weapon entity + camera renders
          behind it); the harness shows a placeholder so the layout is visible. */}
      <div
        className="weapon__stage"
        onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerUp={() => { dragging.current = false; }}
        onPointerMove={onMove}
      >
        <div className="weapon__hint">drag to rotate</div>
        <div className="weapon__placeholder" aria-hidden>✦</div>
        {POINTS.map((p) => {
          const on = attached.has(p.id);
          return (
            <motion.button
              key={p.id}
              className={"attach" + (on ? " is-on" : "")}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onClick={() => toggle(p.id)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
            >
              <span className="attach__node" />
              <span className="attach__label">{p.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="weapon__stats">
        <div className="weapon__title">{def?.label ?? "Weapon"}</div>
        <div className="weapon__caliber">{def?.ammo === "rifle_ammo" ? "5.56mm" : def?.ammo === "pistol_ammo" ? "9mm" : "—"}</div>
        <div className="weapon__field"><span>SERIAL</span><b>{item?.metadata?.serial ?? "—"}</b></div>
        <div className="weapon__field"><span>DURABILITY</span><b>{durability}%</b></div>
        <div className="weapon__durability"><div style={{ width: `${durability}%` }} /></div>
      </div>
    </motion.div>
  );
}
