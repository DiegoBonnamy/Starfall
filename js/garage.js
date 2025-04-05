// Garage management

const shipCanvas = document.getElementById('shipCanvas');
const shipCtx = shipCanvas.getContext('2d');

function updateStats(ship) {
    document.getElementById('speed').style.width = `${ship.maxSpeed * 100 / 5}%`;
    document.getElementById('acceleration').style.width = `${ship.acceleration * 100 / 0.2}%`;
    document.getElementById('health').style.width = `${ship.maxHealth * 100 / 1500}%`;
}

function renderShip(ship) {
    shipCtx.clearRect(0, 0, shipCanvas.width, shipCanvas.height);
    drawShip(shipCtx, ship.id, 100, 50, 0);
    updateStats(ship);
}

// Power-Ups

function updatePowerupDisplay(powerups, selectedPowerupIndex) {
    const powerup = powerups[selectedPowerupIndex];
    const powerupDisplay = document.getElementById("powerupDisplay");

    // Mise à jour de l'icône et du nom
    document.getElementById("powerupIcon").className = `fa-solid ${powerup.icon}`;
    document.getElementById("powerupName").innerText = powerup.name;

    // Vérifie si c'est le power-up actuellement sélectionné
    if (player.powerup === powerup.id) {
        powerupDisplay.classList.add("selected-powerup");
        document.getElementById("selectPowerupButton").innerText = "Active";
    } else {
        powerupDisplay.classList.remove("selected-powerup");
        document.getElementById("selectPowerupButton").innerText = "Select";
    }
}