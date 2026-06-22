-- ============================================================
--  Viscosity Inventory — WeaponView module
--  Spawns the real weapon entity, frames a scripted camera on it,
--  and previews attachments live. The NUI drag-rotates the model
--  via weapon:rotate. (Real GTA model, not WebGL.)
-- ============================================================

WeaponView = {}

local cam, obj, weaponHash
local yaw, pitch = 0.0, 0.0

local COMPONENTS = {
    scope      = { `COMPONENT_AT_SCOPE_MEDIUM`, `COMPONENT_AT_SCOPE_MACRO`, `COMPONENT_AT_SCOPE_SMALL`, `COMPONENT_AT_PI_SCOPE` },
    suppressor = { `COMPONENT_AT_AR_SUPP`, `COMPONENT_AT_AR_SUPP_02`, `COMPONENT_AT_PI_SUPP`, `COMPONENT_AT_PI_SUPP_02` },
    flashlight = { `COMPONENT_AT_AR_FLSH`, `COMPONENT_AT_PI_FLSH` },
    grip       = { `COMPONENT_AT_AR_AFGRIP`, `COMPONENT_AT_AR_AFGRIP_02` },
    magazine   = { `COMPONENT_CARBINERIFLE_CLIP_02`, `COMPONENT_ASSAULTRIFLE_CLIP_02`, `COMPONENT_PISTOL_CLIP_02`, `COMPONENT_SMG_CLIP_02` },
}

function WeaponView.preview(attachment, on)
    if not obj then return end
    local candidates = COMPONENTS[attachment]
    if not candidates then return end
    for _, comp in ipairs(candidates) do
        if DoesWeaponTakeWeaponComponent(weaponHash, comp) then
            if on then
                GiveWeaponComponentToWeaponObject(obj, comp)
            else
                RemoveWeaponComponentFromWeaponObject(obj, comp)
            end
        end
    end
end

function WeaponView.open(weaponName, attachments)
    WeaponView.close()
    weaponHash = GetHashKey(weaponName)

    -- CRITICAL: load the weapon model before creating the object, or it's invisible.
    RequestWeaponAsset(weaponHash, 31, 0)
    local tries = 0
    while not HasWeaponAssetLoaded(weaponHash) and tries < 400 do Wait(5); tries = tries + 1 end

    local ped = PlayerPedId()
    local pc = GetEntityCoords(ped)
    local h = GetEntityHeading(ped)
    local rad = math.rad(h)
    -- forward/right unit vectors from heading
    local fx, fy = -math.sin(rad), math.cos(rad)
    local rx, ry = math.cos(rad), math.sin(rad)

    -- spawn the weapon ~1.4m in front of the player, chest height
    local sx, sy, sz = pc.x + fx * 1.4, pc.y + fy * 1.4, pc.z + 0.45
    obj = CreateWeaponObject(weaponHash, 50, sx, sy, sz, true, 1.0, 0)
    SetEntityCollision(obj, false, false)
    FreezeEntityPosition(obj, true)

    -- present it broadside (barrel across the view)
    yaw, pitch = h + 90.0, 0.0
    SetEntityRotation(obj, 0.0, 0.0, yaw, 2, true)

    for _, a in ipairs(attachments or {}) do WeaponView.preview(a, true) end

    -- camera between the player and the weapon, looking at it
    cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
    SetCamCoord(cam, pc.x + fx * 0.45, pc.y + fy * 0.45, sz + 0.03)
    PointCamAtEntity(cam, obj, 0.0, 0.0, 0.0, true)
    SetCamFov(cam, 42.0)
    RenderScriptCams(true, true, 300, true, true)
end

-- Drag-to-rotate from the NUI.
function WeaponView.rotate(dx, dy)
    if not obj then return end
    yaw = (yaw + dx * 0.6) % 360.0
    pitch = math.max(-85.0, math.min(85.0, pitch - dy * 0.4))
    SetEntityRotation(obj, pitch, 0.0, yaw, 2, true)
end

function WeaponView.close()
    if cam then
        RenderScriptCams(false, true, 250, true, true)
        DestroyCam(cam, false)
        cam = nil
    end
    if obj then
        DeleteEntity(obj)
        obj = nil
    end
    if weaponHash then
        RemoveWeaponAsset(weaponHash)
        weaponHash = nil
    end
end
