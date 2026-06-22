fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'viscosity_inventory'
author 'Viscosity Gaming Studio'
description 'Viscosity Inventory — grid + hotbar + weapon attachments (NUI for viscosity_core).'
version '1.0.0'

server_scripts {
    'server.lua',
}

client_scripts {
    'client/functions.lua',   -- Inventory module (state + logic)
    'client/weaponview.lua',  -- WeaponView module (entity + camera)
    'client/events.lua',      -- wiring: net events, NUI callbacks, keybind
}

ui_page 'web/dist/index.html'

files {
    'web/dist/index.html',
    'web/dist/icons/*.png',
}

dependency 'viscosity_core'
