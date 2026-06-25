-- ============================================================================
--  viscosity_inventory  ·  (c) 2026 AndyBodnar (Viscosity)
--  https://github.com/AndyBodnar/viscosity_inventory
--  Server use only. No resale, repackaging, or credit removal. See LICENSE.
-- ============================================================================
-- ============================================================
--  Viscosity Inventory — server bridge
--  This resource is UI-only; it pulls all data from viscosity_core
--  via exports and hands a snapshot to its own NUI.
-- ============================================================

RegisterNetEvent("viscosity_inventory:server:open", function()
    local src = source
    local core = exports.viscosity_core
    TriggerClientEvent("viscosity_inventory:client:open", src, {
        registry  = core:GetItems() or {},
        inventory = core:GetInventory(src) or {},
        ground    = {},          -- world drops arrive once that system lands
        maxWeight = 30.0,
        maxSlots  = 40,
    })
end)

-- Persist a weapon attachment toggle into the slot's item metadata.
RegisterNetEvent("viscosity_inventory:server:setAttachment", function(slot, attachment, on)
    local src = source
    local inv = exports.viscosity_core:Inventory()
    if inv and inv.SetAttachment then
        inv.SetAttachment(src, slot, attachment, on)
    end
end)
