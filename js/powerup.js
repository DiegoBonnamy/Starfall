let powerupCharge = 0;
let powerupReady = false;
let powerupActive = false;
let powerupInterval = null;
let powerupEffectInterval = null;
let rechargeInterval = null;
const powerupProgress = document.getElementById("powerup-progress");
const powerupIcon = document.getElementById("powerup-icon");
const powerupIconI = document.getElementById("powerup-icon-i"); 

const powerups = {
    // Nothing
    0: {
        id: 0,
        icon: "fa-ban",
        name: "Nothing"
    },

    // Droid Repair (Restaure une quantité de PV)
    1: {
        id: 1,
        icon: "fa-robot",
        chargeSpeed: 1, // 10 sec
        duration: 0,
        name: "Droid Repair"
    },

    // Deflector Shield (Réduction temporaire des dégâts)
    2: {
        id: 2,
        icon: "fa-shield-halved",
        chargeSpeed: 0.5,
        duration: 8000,
        name: "Deflector Shield"
    },

    // Thermal Surge (Annule temporairement la surchauffe + boost la cadence de tir)
    3: {
        id: 3,
        icon: "fa-temperature-quarter",
        chargeSpeed: 0.25,
        duration: 2500,
        name: "Thermal Surge"
    },

    // Overdrive Boost (Boost vitesse + maniabilité)
    4: {
        id: 4,
        icon: "fa-angles-up",
        chargeSpeed: 0.75,
        duration: 5000,
        name: "Overdrive Boost"
    },

    // Nova Core (Explosion de zone)
    5: {
        id: 5,
        icon: "fa-circle-dot",
        chargeSpeed: 0.15,
        duration: 0,
        name: "Nova Core"
    }
}

function chargePowerup() {
    let powerup = powerups[player.powerup];
    if (powerup.id > 0) {
        if (powerupCharge < 100 && !powerupActive) {
            powerupCharge += powerup.chargeSpeed;
            powerupProgress.style.width = powerupCharge + "%";
        } 
        if (powerupCharge >= 100 && !powerupReady) {
            powerupReady = true;
            powerupIcon.classList.add("powerup-ready");
        }
    }
}

function usePowerup(player) {
    let powerup = powerups[player.powerup];
    if (powerupReady) {
        powerupCharge = 0;
        powerupReady = false;
        powerupIcon.classList.remove("powerup-ready");

        if (!powerup) return;

        applyPowerupEffect(powerup.id, player);

        if (powerup.duration > 0) {
            powerupActive = true;
            let durationLeft = powerup.duration;
            powerupIcon.classList.add("powerup-active");

            powerupEffectInterval = setInterval(() => {
                durationLeft -= 100;
                let progress = (durationLeft / powerup.duration) * 100;
                powerupProgress.style.width = progress + "%";

                if (durationLeft <= 0) {
                    clearInterval(powerupEffectInterval);
                    powerupIcon.classList.remove("powerup-active");
                    endPowerupEffect(powerup.id, player);
                    powerupActive = false;
                }
            }, 100);
        }

        // Attendre la fin du power-up avant de relancer la recharge
        rechargeInterval = setInterval(() => {
            if (!powerupActive) {
                clearInterval(rechargeInterval);
                powerupProgress.style.width = "0%";
                chargePowerup();
            }
        }, 100);
    }
}

function applyPowerupEffect(id, player) {
    switch (id) {
        // Droid Repair
        case 1:
            heal(player, player.maxHealth * 0.25);
            break;

        // Deflector Shield
        case 2:
            player.damageReduction = 0.5; // Réduction des dégâts de 50%
            break;

        // Thermal Surge
        case 3:
            player.lockOverheat = true;
            player.shootCooldown = player.defaultShootCooldown * 0.5;
            break;

        // Overdrive Boost
        case 4:
            player.maneuverabilityBoost = 1.5;
            break;

        // Nova Core
        case 5:
            addProtonExplosion(player.x, player.y, 500, 1000);
            break;
    
        default:
            break;
    }
}

function endPowerupEffect(id, player) {
    switch (id) {
        case 2:
            player.damageReduction = 1;
            break;

        case 3:
            player.lockOverheat = false;
            player.shootCooldown = player.defaultShootCooldown;
            break;

        case 4:
            player.maneuverabilityBoost = 1;
            break;
    
        default:
            break;
    }
}

function clearPowerup() {
    let powerup = powerups[player.powerup];
    clearInterval(powerupInterval);
    clearInterval(powerupEffectInterval);
    clearInterval(rechargeInterval);
    powerupIconI.classList.remove(powerup.icon);
}

function loadPowerup() {
    let powerup = powerups[player.powerup];
    // Simule la recharge toutes les 100ms
    powerupInterval = setInterval(chargePowerup, 100);
    powerupIcon.classList.remove("powerup-ready");
    powerupIcon.classList.remove("powerup-active");
    powerupCharge = 0;
    powerupReady = false;
    powerupActive = false;
    powerupIconI.classList.add(powerup.icon);
}