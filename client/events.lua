-- ============================================================================
--  viscosity_inventory  ·  (c) 2026 AndyBodnar (Viscosity)
--  https://github.com/AndyBodnar/viscosity_inventory
--  Server use only. No resale, repackaging, or credit removal. See LICENSE.
-- ============================================================================
-- ============================================================
--  Viscosity Inventory — events / wiring
--  The only file that registers anything. Routes the UI to the
--  Inventory + WeaponView modules and to viscosity_core.
-- ============================================================

-- ---------------- server -> client ----------------
RegisterNetEvent("viscosity_inventory:client:open", function(payload)
    Inventory.Open(payload)
end)

-- core fired an inventory change (add/remove/move): refresh if we're open so
-- /giveitem and pickups show up live instead of only on reopen.
RegisterNetEvent("viscosity_core:client:inv:changed", function()
    if Inventory.IsOpen() then
        Inventory.Request()
    end
end)

-- ---------------- NUI -> client ----------------
RegisterNUICallback("close", function(_, cb)
    Inventory.Close(); cb(1)
end)

RegisterNUICallback("move", function(d, cb)
    TriggerServerEvent("viscosity_core:server:inv:move", d.from, d.to); cb(1)
end)

RegisterNUICallback("use", function(d, cb)
    TriggerServerEvent("viscosity_core:server:inv:use", d.slot); cb(1)
end)

RegisterNUICallback("drop", function(d, cb)
    TriggerServerEvent("viscosity_core:server:inv:drop", d.slot); cb(1)
end)

RegisterNUICallback("weapon:open", function(d, cb)
    local item = Inventory.GetSlot(d.slot)
    if item then
        WeaponView.open(item.name, item.metadata and item.metadata.attachments or {})
    end
    cb(1)
end)

RegisterNUICallback("weapon:close", function(_, cb)
    WeaponView.close(); cb(1)
end)

RegisterNUICallback("weapon:rotate", function(d, cb)
    WeaponView.rotate(tonumber(d.dx) or 0, tonumber(d.dy) or 0); cb(1)
end)

RegisterNUICallback("weapon:attach", function(d, cb)
    WeaponView.preview(d.attachment, d.on)
    TriggerServerEvent("viscosity_inventory:server:setAttachment", d.slot, d.attachment, d.on)
    cb(1)
end)

-- ---------------- open keybind ----------------
-- F3 during migration so it doesn't fight xmenu's TAB. Rebind to TAB once
-- xmenu is retired (Settings -> Key Bindings -> FiveM).
RegisterCommand("vinventory", function()
    Inventory.Toggle()
end, false)
RegisterKeyMapping("vinventory", "Open Viscosity Inventory", "keyboard", "F3")

-- ---------------- safety ----------------
AddEventHandler("onResourceStop", function(res)
    if res == GetCurrentResourceName() and Inventory.IsOpen() then
        SetNuiFocus(false, false)
        WeaponView.close()
    end
end)
