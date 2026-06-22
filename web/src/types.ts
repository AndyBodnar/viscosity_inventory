export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface ItemDef {
  name: string;
  label: string;
  description?: string;
  weight: number;
  stackable: boolean;
  max_stack: number;
  usable: boolean;
  rarity: Rarity;
  icon?: string;
  weapon?: boolean;
  category?: string;
  ammo?: string;
}

export interface InvSlot {
  slot: number;
  name: string;
  amount: number;
  metadata?: Record<string, any> & { attachments?: string[]; durability?: number; serial?: string };
}

export type SlotMap = Record<number, InvSlot>;

// Where a weapon attachment slot sits over the centered weapon model (% coords).
export interface AttachPoint {
  id: string;       // e.g. "scope", "suppressor", "grip"
  label: string;
  x: number;        // 0..100 across the weapon stage
  y: number;        // 0..100 down the weapon stage
}
