import { create } from "zustand";
import { fetchNui } from "./nui/fetchNui";
import type { ItemDef, SlotMap } from "./types";

export interface OpenPayload {
  registry: Record<string, ItemDef>;
  inventory: SlotMap;
  ground: SlotMap;
  maxWeight: number;
  maxSlots: number;
}

interface State {
  visible: boolean;
  registry: Record<string, ItemDef>;
  inventory: SlotMap;
  ground: SlotMap;
  maxWeight: number;
  maxSlots: number;
  weight: number;
  hover: number | null;
  view: "grid" | "weapon";
  weaponSlot: number | null;

  open: (p: OpenPayload) => void;
  close: () => void;
  setHover: (slot: number | null) => void;
  move: (from: number, to: number) => void;
  use: (slot: number) => void;
  drop: (slot: number) => void;
  openWeapon: (slot: number) => void;
  closeWeapon: () => void;
}

function calcWeight(inv: SlotMap, reg: Record<string, ItemDef>): number {
  let w = 0;
  for (const s of Object.values(inv)) {
    const def = reg[s.name];
    if (def) w += def.weight * s.amount;
  }
  return Math.round(w * 100) / 100;
}

export const useInv = create<State>((set, get) => ({
  visible: false,
  registry: {},
  inventory: {},
  ground: {},
  maxWeight: 30,
  maxSlots: 40,
  weight: 0,
  hover: null,
  view: "grid",
  weaponSlot: null,

  open: (p) =>
    set({
      visible: true,
      registry: p.registry,
      inventory: p.inventory,
      ground: p.ground,
      maxWeight: p.maxWeight,
      maxSlots: p.maxSlots,
      weight: calcWeight(p.inventory, p.registry),
      view: "grid",
      weaponSlot: null,
    }),

  close: () => {
    set({ visible: false, view: "grid", weaponSlot: null });
    void fetchNui("close");
  },

  setHover: (slot) => set({ hover: slot }),

  move: (from, to) => {
    const inv = { ...get().inventory };
    const a = inv[from];
    const b = inv[to];
    if (!a) return;
    if (b) { inv[to] = { ...a, slot: to }; inv[from] = { ...b, slot: from }; }
    else { inv[to] = { ...a, slot: to }; delete inv[from]; }
    set({ inventory: inv, weight: calcWeight(inv, get().registry) });
    void fetchNui("move", { from, to });
  },

  use: (slot) => void fetchNui("use", { slot }),

  drop: (slot) => {
    const inv = { ...get().inventory };
    delete inv[slot];
    set({ inventory: inv, weight: calcWeight(inv, get().registry) });
    void fetchNui("drop", { slot });
  },

  openWeapon: (slot) => {
    set({ view: "weapon", weaponSlot: slot });
    void fetchNui("weapon:open", { slot });
  },

  closeWeapon: () => {
    set({ view: "grid", weaponSlot: null });
    void fetchNui("weapon:close");
  },
}));
