import { useInv } from "../store";
import { ItemSlot } from "./ItemSlot";

interface Props { zone: "inv" | "ground" }

// Inventory grid renders slots 6..maxSlots (1..5 live in the Hotbar).
// Ground renders a fixed nearby grid.
export function Grid({ zone }: Props) {
  const { inventory, ground, maxSlots } = useInv();
  const map = zone === "inv" ? inventory : ground;
  const start = zone === "inv" ? 6 : 1;
  const count = zone === "inv" ? maxSlots - 5 : 25;
  return (
    <div className="grid">
      {Array.from({ length: count }, (_, i) => start + i).map((n) => (
        <ItemSlot key={n} index={n} item={map[n]} zone={zone} />
      ))}
    </div>
  );
}
