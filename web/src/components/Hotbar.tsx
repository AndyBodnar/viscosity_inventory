import { useInv } from "../store";
import { ItemSlot } from "./ItemSlot";

// Quick slots 1–5 (the left rail), each with its hotkey badge.
export function Hotbar() {
  const inventory = useInv((s) => s.inventory);
  return (
    <div className="hotbar">
      <span className="hotbar__label">QUICK SLOTS</span>
      <div className="hotbar__slots">
        {[1, 2, 3, 4, 5].map((n) => (
          <ItemSlot key={n} index={n} item={inventory[n]} zone="inv" hotkey={n} />
        ))}
      </div>
    </div>
  );
}
