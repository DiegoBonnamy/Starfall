// Player management

// Paramètres de la zone de ralentissement
const slowdownZoneSize = 100;
const minSpeedFactor = 0.1; // Vitesse minimale dans la zone lente

// Player functions

const player = {
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    angle: 0,
    normalizedAngle: 0,
    speed: 0,
    maxSpeed: 3,
    acceleration: 0.05,
    deceleration: 0.08,
    rotationSpeed: 0.03,
    health: 100,
    maxHealth: 100,
    overheat: 0,
    maxOverheat: 100,
    throttle: 0,
    maxThrottle: 100,
    bullets: [],
    ProtonTorpedoes: [],
    score: 0,
    lastShotTime: 0,
    shootCooldown: 300,
    ship: 2,
    damage: 10,
    damageReduction: 1,
    lockOverheat: false,
    defaultShootCooldown: 300,
    maneuverabilityBoost: 1,
    powerup: 0
};

function drawPlayer(ctx, scale = 1) {
    drawShip(ctx, player.ship, player.x, player.y, player.angle, scale);
}

function setThrottle(forward) {
    if (forward) {
        player.throttle = Math.min(player.throttle + (player.acceleration * player.maneuverabilityBoost), player.maxThrottle);
    }
    else {
        player.throttle = Math.max(player.throttle - (player.deceleration * player.maneuverabilityBoost), 0);
    }
}

function movePlayer(canvas, direction = null, forward = null) {
    if (forward == null) {
        if (keys['z'] || keys['arrowup']) {
            setThrottle(true);
        }
        if (keys['s'] || keys['arrowdown']) {
            setThrottle(false);
        }
    }
    else {
        setThrottle(forward);
    }

    player.speed = (player.throttle / player.maxThrottle) * (player.maxSpeed * player.maneuverabilityBoost);

    // Zone de ralentissement proche des bords
    const nearBorderX = player.x < slowdownZoneSize || player.x > canvas.width - slowdownZoneSize;
    const nearBorderY = player.y < slowdownZoneSize || player.y > canvas.height - slowdownZoneSize;

    if (nearBorderX || nearBorderY) {
        const distanceToBorder = Math.min(
            player.x,
            canvas.width - player.x,
            player.y,
            canvas.height - player.y
        );
        const slowdownFactor = Math.max(minSpeedFactor, distanceToBorder / slowdownZoneSize);
        player.speed *= slowdownFactor;
    }

    player.x += Math.cos(player.angle) * player.speed;
    player.y += Math.sin(player.angle) * player.speed;

    if (keys['q'] || keys['arrowleft'] || direction == 'left') player.angle -= (player.rotationSpeed * player.maneuverabilityBoost);
    if (keys['d'] || keys['arrowright'] || direction == 'right') player.angle += (player.rotationSpeed * player.maneuverabilityBoost);
    player.normalizedAngle = radiansToDegrees(player.angle)

    // Empêcher de sortir de la map
    player.x = Math.max(0, Math.min(canvas.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height, player.y));

    throttleBar.style.width = `${(player.throttle / player.maxThrottle) * 100}%`;
}

function shoot(mouseX, mouseY, shotAngle = null) {
    const now = Date.now();
    if ((keys[' '] || shotAngle != null) && now - player.lastShotTime >= player.shootCooldown) {
        if (player.overheat + 10 <= player.maxOverheat || player.lockOverheat) {
            let angleToMouse = 0;
            if (shotAngle == null) {
                angleToMouse = Math.atan2(mouseY - player.y, mouseX - player.x);
            }
            else {
                angleToMouse = degreesToRadians(shotAngle);
            }
            player.bullets.push({
                x: player.x,
                y: player.y,
                angle: angleToMouse,
                speed: 5
            });
            if (!player.lockOverheat) {
                player.overheat += 10;
            }
            player.lastShotTime = now; // Met à jour le dernier tir
            xWingFireSound.cloneNode(true).play();
        }
    }
    if (player.overheat > 0 && !player.lockOverheat) {
        player.overheat -= 0.1;
    }
    overheatBar.style.width = `${(player.overheat / player.maxOverheat) * 100}%`;
    cooldownBar.style.width = `${Math.min((now - player.lastShotTime) / player.shootCooldown, 1) * 100}%`;
}

function updatePlayerShip(canvas, player, ships) {
    const coef = getStatsCoefficient();
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    const shipConfig = ships[player.ship];
    if (shipConfig) {
      player.maxSpeed = shipConfig.maxSpeed * coef;
      player.acceleration = shipConfig.acceleration;
      player.deceleration = shipConfig.deceleration;
      player.rotationSpeed = shipConfig.rotationSpeed * coef;
      player.maxHealth = shipConfig.maxHealth;
      player.maxOverheat = shipConfig.maxOverheat;
      player.maxThrottle = shipConfig.maxThrottle;
      player.shootCooldown = shipConfig.shootCooldown;
      player.defaultShootCooldown = player.shootCooldown;
      player.health = player.maxHealth;
      player.damage = shipConfig.damage;
    }
}

function resetPlayer(player) {
    player.health = player.maxHealth;
    player.speed = 0;
    player.overheat = 0;
    player.x = canvas.width / 2,
    player.y = canvas.height / 2,
    player.angle = 0;
    player.throttle = 0;
    player.score = 0;
    player.bullets = [];
    player.ProtonTorpedoes = [];
}

function heal(player, value) {
    player.health = Math.min(player.health + value, player.maxHealth);
    healthBar.style.width = `${(player.health / player.maxHealth) * 100}%`;
}