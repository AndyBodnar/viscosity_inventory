import type { ItemDef, SlotMap } from "../types";
import type { OpenPayload } from "../store";

const def = (
  name: string,
  label: string,
  rarity: ItemDef["rarity"],
  weight: number,
  extra: Partial<ItemDef> = {},
): ItemDef => ({
  name, label, rarity, weight,
  stackable: extra.weapon ? false : true,
  max_stack: extra.weapon ? 1 : 100,
  usable: extra.usable ?? false,
  ...extra,
});

export const mockRegistry: Record<string, ItemDef> = {
  water: def("water", "Water Bottle", "common", 0.5, { usable: true, description: "Restores thirst." }),
  bread: def("bread", "Loaf of Bread", "common", 0.3, { usable: true, description: "Restores hunger." }),
  bandage: def("bandage", "Bandage", "common", 0.1, { usable: true, description: "Restores a little health." }),
  medkit: def("medkit", "Medical Kit", "uncommon", 1.5, { usable: true, description: "Restores most health." }),
  phone: def("phone", "Smartphone", "rare", 0.4, { description: "Stay connected." }),
  lockpick: def("lockpick", "Lockpick", "uncommon", 0.2, { usable: true, description: "Open simple locks." }),
  radio: def("radio", "Radio", "rare", 0.6, { description: "Encrypted comms." }),
  pistol_ammo: def("pistol_ammo", "Pistol Ammo", "common", 0.02, { description: "9mm rounds." }),
  rifle_ammo: def("rifle_ammo", "Rifle Ammo", "uncommon", 0.03, { description: "5.56 rounds." }),
  cash: def("cash", "Cash", "common", 0, { description: "Clean money." }),
  goldbar: def("goldbar", "Gold Bar", "legendary", 3.0, { description: "Heavy and very valuable." }),
  weapon_carbinerifle: def("weapon_carbinerifle", "Carbine Rifle", "epic", 1.1, { weapon: true, category: "weapon", ammo: "rifle_ammo" }),
  weapon_pistol: def("weapon_pistol", "Pistol", "rare", 1.1, { weapon: true, category: "weapon", ammo: "pistol_ammo" }),
};

export const mockInventory: SlotMap = {
  1: { slot: 1, name: "weapon_carbinerifle", amount: 1, metadata: { serial: "UG42LCN5V9", durability: 87, attachments: ["scope"] } },
  2: { slot: 2, name: "weapon_pistol", amount: 1, metadata: { serial: "PX10ZQ44A", durability: 100, attachments: [] } },
  3: { slot: 3, name: "water", amount: 6 },
  4: { slot: 4, name: "bread", amount: 3 },
  5: { slot: 5, name: "bandage", amount: 12 },
  6: { slot: 6, name: "medkit", amount: 2 },
  7: { slot: 7, name: "phone", amount: 1 },
  8: { slot: 8, name: "lockpick", amount: 4 },
  9: { slot: 9, name: "rifle_ammo", amount: 90 },
  10: { slot: 10, name: "pistol_ammo", amount: 48 },
  12: { slot: 12, name: "goldbar", amount: 2 },
  14: { slot: 14, name: "radio", amount: 1 },
};

export const mockGround: SlotMap = {
  1: { slot: 1, name: "water", amount: 1 },
  2: { slot: 2, name: "bandage", amount: 2 },
};

export const mockPayload: OpenPayload = {
  registry: mockRegistry,
  inventory: mockInventory,
  ground: mockGround,
  maxWeight: 30,
  maxSlots: 40,
};
