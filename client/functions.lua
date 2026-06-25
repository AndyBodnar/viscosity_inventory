-- ============================================================================
--  viscosity_inventory  ·  (c) 2026 AndyBodnar (Viscosity)
--  https://github.com/AndyBodnar/viscosity_inventory
--  Server use only. No resale, repackaging, or credit removal. See LICENSE.
-- ============================================================================
-- ============================================================
--  Viscosity Inventory — Inventory module (functions)
--  Pure logic + state. No event/callback registration here
--  (that lives in events.lua). Exposes the global `Inventory`.
-- ============================================================

Inventory = {}

local isOpen = false
local snapshot = { inventory = {} }

function Inventory.IsOpen()
    return isOpen
end

-- Show the UI with a fresh data snapshot from the server.
function Inventory.Open(payload)
    snapshot = payload or { inventory = {} }
    isOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({ type = "open", payload = snapshot })
end

-- Hide the UI and release focus (also tears down the weapon view).
function Inventory.Close()
    if not isOpen then return end
    isOpen = false
    SetNuiFocus(false, false)
    WeaponView.close()
end

-- Ask the server for the latest snapshot (it answers with the open event).
function Inventory.Request()
    TriggerServerEvent("viscosity_inventory:server:open")
end

function Inventory.Toggle()
    if isOpen then Inventory.Close() else Inventory.Request() end
end

-- Resolve a slot from the last snapshot (used by the weapon view).
function Inventory.GetSlot(slot)
    return snapshot.inventory and snapshot.inventory[slot] or nil
end
