// UI Management

let isMobile = window.matchMedia("(max-height: 720px)").matches;
let scale = 1;
if (isMobile) {
    scale = 0.5;
}

const canvas = document.getElementById("gameCanvas");
const gameMenu = document.getElementById("game-menu");
const gameGarage = document.getElementById("game-garage");
const gameContainer = document.getElementById("game-container");
const playButton = document.getElementById("play-button");
const garageButton = document.getElementById("garage-button");
const selectShipButton = document.getElementById("selectShipButton");
const previousShipButton = document.getElementById("previousShipButton");
const nextShipButton = document.getElementById("nextShipButton");
const bestScoreSpan = document.getElementById("bestScore");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gameContainer.style.width = window.innerWidth + "px";
    gameContainer.style.height = window.innerHeight + "px";
}

// Appeler la fonction de redimensionnement au chargement de la page et lors du redimensionnement de la fenêtre
resizeCanvas(canvas);
window.addEventListener("resize", resizeCanvas);

// Mobile orientaion

// Initial check
handleOrientationChange();

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

// Listen to changes
window.addEventListener("resize", handleOrientationChange);
window.addEventListener("orientationchange", handleOrientationChange);

const overheatBar = document.getElementById("overheat-progress");
const cooldownBar = document.getElementById("cooldown-progress")
const scoreDisplay = document.getElementById("score-display");
const healthBar = document.getElementById("health-progress");
const throttleBar = document.getElementById("throttle-progress");

// Menu management

playButton.addEventListener('click', function() {
    gameMenu.style.display = 'none';
    gameContainer.style.display = 'flex';
    resizeCanvas();
    startGame();
});

garageButton.addEventListener('click', function() {
    gameMenu.style.display = 'none';
    gameGarage.style.display = 'flex';
});

selectShipButton.addEventListener('click', function() {
    player.ship = currentShip;
    gameGarage.style.display = 'none';
    gameMenu.style.display = 'flex';
});

let currentMapIndex = 0;

const mapImage = document.getElementById("map-image");
const mapName = document.getElementById("map-name");
const prevMapButton = document.getElementById("prev-map");
const nextMapButton = document.getElementById("next-map");

function updateMap() {
    mapImage.src = maps[currentMapIndex].image;
    mapName.textContent = maps[currentMapIndex].name;
    bestScoreSpan.innerHTML = maps[currentMapIndex].bestScore;
}

prevMapButton.addEventListener("click", () => {
    currentMapIndex = (currentMapIndex - 1 + Object.keys(maps).length) % Object.keys(maps).length;
    updateMap();
});

nextMapButton.addEventListener("click", () => {
    currentMapIndex = (currentMapIndex + 1) % Object.keys(maps).length;
    updateMap();
});

// Initialisation
updateMap();

// Garage management

let currentShip = 0;
renderShip(ships[currentShip]);
let currentPowerup = player.powerup;
updatePowerupDisplay(powerups, currentPowerup);

nextShipButton.addEventListener('click', function() {
    let ship = ships[currentShip < Object.keys(ships).length - 1 ? currentShip + 1 : 0];
    currentShip = ship.id;
    renderShip(ship);
})

previousShipButton.addEventListener('click', function() {
    let ship = ships[currentShip > 0 ? currentShip - 1 : Object.keys(ships).length - 1];
    currentShip = ship.id;
    renderShip(ship);
})

document.getElementById("previousPowerupButton").addEventListener("click", () => {
    currentPowerup = (currentPowerup - 1 + Object.keys(powerups).length) % Object.keys(powerups).length;
    updatePowerupDisplay(powerups, currentPowerup);
});

document.getElementById("nextPowerupButton").addEventListener("click", () => {
    currentPowerup = (currentPowerup + 1) % Object.keys(powerups).length;
    updatePowerupDisplay(powerups, currentPowerup);
});

document.getElementById("selectPowerupButton").addEventListener("click", () => {
    player.powerup = powerups[currentPowerup].id;
    updatePowerupDisplay(powerups, currentPowerup);
});

// Commands

const keys = {};
window.addEventListener("keydown", (e) => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", (e) => keys[e.key.toLowerCase()] = false);

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

canvas.addEventListener("mousemove", (e) => {
    mouseX = e.clientX - canvas.getBoundingClientRect().left;
    mouseY = e.clientY - canvas.getBoundingClientRect().top;
});

// Power up
document.addEventListener("keydown", (event) => {
    if (event.key === "e") {
        usePowerup(player);
    }
});

// Mobile commands

const leftStick = {
    id: 0,
    direction: null,
    forward: null,
    isDragging: false,
    isActive: false,
    stickContainer: null,
    stickItem: null
}

const rightStick = {
    id: 1,
    angle: null,
    isDragging: false,
    isActive: false,
    stickContainer: null,
    stickItem: null
}

function setLeftStickDirection(direction) {
    if (direction === 1) {
        leftStick.direction = 'right';
    } else if (direction === -1) {
        leftStick.direction = 'left';
    } else {
        leftStick.direction = null;
    }
}

function setLeftStickForward(x, y) {
    if (isMobile) {
        leftStick.forward = x != 0 && y != 0;
    }
    else {
        leftStick.forward = null;
    }
}

function geStickAngle(offsetX, offsetY) {
    let angleRad = Math.atan2(offsetY, offsetX); // Angle en radians
    let angleDeg = angleRad * (180 / Math.PI); // Conversion en degrés

    if (angleDeg < 0) {
        angleDeg += 360; // S'assurer que l'angle est toujours positif (0 à 360°)
    }

    return angleDeg;
}

function getRotationDirection(playerAngle, targetAngle, deadZone = 5) {
    let diff = (targetAngle - playerAngle + 360) % 360;

    if (Math.abs(diff) < deadZone || Math.abs(diff - 360) < deadZone) {
        return 0;
    }

    if (diff > 180) {
        return -1;
    } else {
        return 1;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const leftStickContainer = document.getElementById("left-stick");
    const leftStickItem = leftStickContainer.querySelector(".left-joystick");
    leftStick.container = leftStickContainer
    leftStick.stickItem = leftStickItem;

    const rightStickContainer = document.getElementById("right-stick");
    const rightStickItem = rightStickContainer.querySelector(".right-joystick");
    rightStick.container = rightStickContainer
    rightStick.stickItem = rightStickItem;

    let clientX, clientY = 0;

    function updateJoystickPosition(x, y, stick) {
        let rect = stick.container.getBoundingClientRect();
        let offsetX = x - (rect.left + rect.width / 2);
        let offsetY = y - (rect.top + rect.height / 2);

        let distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        let maxDistance = rect.width / 2;

        if (distance > maxDistance) {
            let angle = Math.atan2(offsetY, offsetX);
            offsetX = Math.cos(angle) * maxDistance;
            offsetY = Math.sin(angle) * maxDistance;
        }

        if (stick.id == 0) {
            let targetAngle = geStickAngle(offsetX, offsetY);
            let direction = getRotationDirection(player.normalizedAngle, targetAngle);

            setLeftStickDirection(direction);
            if (distance > maxDistance / 1.5) {
                setLeftStickForward(offsetX, offsetY);
            }
            else {
                setLeftStickForward(0, 0);
            }
        }
        else {
            if (distance > maxDistance / 1.25) {
                let angle = geStickAngle(offsetX, offsetY);
                stick.angle = angle;
            }
        }

        stick.stickItem.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    function startJoystickControl(event, stick) {
        stick.isDragging = true;
        stick.isActive = true;

        clientX = event.touches ? event.touches[0].clientX : event.clientX;
        clientY = event.touches ? event.touches[0].clientY : event.clientY;

        updateJoystickPosition(clientX, clientY, stick);
    }

    function moveJoystick(event, stick) {
        if (!stick.isDragging) return;

        clientX = event.touches ? event.touches[0].clientX : event.clientX;
        clientY = event.touches ? event.touches[0].clientY : event.clientY;

        updateJoystickPosition(clientX, clientY, stick);
    }

    function stopJoystickControl(stick) {
        stick.isDragging = false;
        stick.isActive = false; // Le joystick n'est plus utilisé
    }

    function updateJoystickLoop() {
        if (isMobile) {
            if (!leftStick.isActive) {
                // Réinitialiser les valeurs si le joystick est inactif
                setLeftStickDirection(0);
                setLeftStickForward(0, 0);
                leftStickItem.style.transform = `translate(-50%, -50%)`;
            }
            else {
                updateJoystickPosition(clientX, clientY, leftStick);
            }
            if (!rightStick.isActive) {
                // Réinitialiser les valeurs si le joystick est inactif
                rightStick.angle = null;
                rightStickItem.style.transform = `translate(-50%, -50%)`;
            }
            else {
                updateJoystickPosition(clientX, clientY, rightStick);
            }
        }
        requestAnimationFrame(updateJoystickLoop);
    }

    leftStickContainer.addEventListener("touchstart", (event) => { startJoystickControl(event, leftStick) });
    leftStickContainer.addEventListener("touchmove", (event) => { moveJoystick(event, leftStick) });
    leftStickContainer.addEventListener("touchend", (event) => { stopJoystickControl(leftStick) });

    rightStickContainer.addEventListener("touchstart", (event) => { startJoystickControl(event, rightStick) });
    rightStickContainer.addEventListener("touchmove", (event) => { moveJoystick(event, rightStick) });
    rightStickContainer.addEventListener("touchend", (event) => { stopJoystickControl(rightStick) });

    powerupIcon.addEventListener("touchstart", () => {
        usePowerup(player);
    });

    updateJoystickLoop();
});


// Game engine

let play = false;
let map = maps[currentMapIndex];

let enemySpawnInterval = 0;
let minEnemySpawnInterval = 0;
let difficultyIncreaseRate = 0;

let enableAsteroids = 0;
let asteroidMinSpawnDuration = 0;
let asteroidMaxSpawnDuration = 0;

function adjustDifficulty(canvas, ships) {
    enemySpawnInterval = Math.max(minEnemySpawnInterval, enemySpawnInterval - difficultyIncreaseRate);
    setTimeout(() => {
        if (play) {
            spawnEnemy(ships, canvas);
            adjustDifficulty(canvas, ships);
        }
    }, enemySpawnInterval);
}

function startGame() {
    let map = maps[currentMapIndex];

    enemySpawnInterval = map.enemySpawnInterval;
    minEnemySpawnInterval = map.minEnemySpawnInterval;
    difficultyIncreaseRate = map.difficultyIncreaseRate;

    enableAsteroids = map.enableAsteroids;
    asteroidMinSpawnDuration = map.asteroidMinSpawnDuration;
    asteroidMaxSpawnDuration = map.asteroidMaxSpawnDuration;

    loadMap(map);
    updatePlayerShip(canvas, player, ships);
    healthBar.style.width = `${(player.health / player.maxHealth) * 100}%`;
    play = true;
    gameLoop();
    loadPowerup();
    enemySpawnInterval = 8000;
    adjustDifficulty(canvas, ships);
    if (enableAsteroids) {
        setTimeout(() => {
            spawnAsteroid(canvas, player, asteroidMinSpawnDuration, asteroidMaxSpawnDuration);
        }, getRandom(asteroidMinSpawnDuration, asteroidMaxSpawnDuration));
    }
}

function gameOver() {
    play = false;
    let map = maps[currentMapIndex];

    if (player.score > map.bestScore) {
        map.bestScore = player.score;
    }
    bestScoreSpan.innerHTML = map.bestScore;

    resetPlayer(player);
    clearPowerup();
    enemies.splice(0, enemies.length);
    asteroids.splice(0, asteroids.length);
    protonExplosions.splice(0, protonExplosions.length);

    gameContainer.style.display = 'none';
    gameMenu.style.display = 'block';
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movements
    movePlayer(canvas, leftStick.direction, leftStick.forward);
    moveEnemies(player);
    moveAsteroids(canvas);
    moveProtonExplosions();

    // Shots
    shoot(mouseX, mouseY, rightStick.angle);

    // Draws
    drawPlayer(ctx, scale);
    drawBullets(ctx, player.bullets, "#ffff00");
    drawEnemies(ctx, scale);
    drawAsteroids(ctx, scale);
    enemies.forEach(enemy => drawBullets(ctx, enemy.bullets, "#ff0000"));
    drawExplosions(ctx);
    drawProtonExplosions(ctx);

    // Checks
    checkCollisions(player, enemies);

    if (play) {
        requestAnimationFrame(gameLoop);
    }
}