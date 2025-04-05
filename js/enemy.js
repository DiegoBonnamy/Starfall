// Enemies management

const enemies = [];

function spawnEnemy(ships, canvas) {
    let rand = Math.random();
    let enemyShipId = 5; // ID par défaut

    if (rand < 0.85) {
        enemyShipId = 5;
    } else if (rand < 0.95) {
        enemyShipId = 7;
    } else {
        enemyShipId = 6;
    }
    let enemyShip = ships[enemyShipId]

    const enemy = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 30,
        height: 30,
        angle: Math.random() * Math.PI * 2,
        shootAngle: 0,
        speed: enemyShip.maxSpeed,
        bullets: [],
        damage: enemyShip.damage,
        health: enemyShip.maxHealth,
        ship: enemyShipId,
        currentCooldown: 0,
        shootCooldown: enemyShip.shootCooldown,
        rotationSpeed: enemyShip.rotationSpeed,
        reward: enemyShip.reward
    };
    enemies.push(enemy);
}

function moveEnemies(player) {
    enemies.forEach(enemy => {
        // Moving away of 100 unit if to close
        if (!enemy.movingAway && Math.hypot(player.x - enemy.x, player.y - enemy.y) < 50) {
            enemy.movingAway = true;
            enemy.targetX = enemy.x + Math.cos(enemy.angle) * 100;
            enemy.targetY = enemy.y + Math.sin(enemy.angle) * 100;
        }

        if (enemy.movingAway) {
            // Rotate to target
            const angleToTarget = Math.atan2(enemy.targetY - enemy.y, enemy.targetX - enemy.x);
            enemy.angle = smoothRotation(enemy.angle, angleToTarget, enemy.rotationSpeed);
            enemy.x += Math.cos(enemy.angle) * enemy.speed;
            enemy.y += Math.sin(enemy.angle) * enemy.speed;

            if (Math.hypot(enemy.targetX - enemy.x, enemy.targetY - enemy.y) < 10) {
                enemy.movingAway = false;
            }
        } else {
            // Go to target
            const angleToPlayer = Math.atan2(player.y - enemy.y, player.x - enemy.x);
            enemy.angle = smoothRotation(enemy.angle, angleToPlayer, enemy.rotationSpeed);
            enemy.shootAngle = angleToPlayer;
            enemy.x += Math.cos(enemy.angle) * enemy.speed;
            enemy.y += Math.sin(enemy.angle) * enemy.speed;
        }

        // Shoot
        if (enemy.currentCooldown <= 0 && Math.random() < 0.02) {
            tieFireSound.cloneNode(true).play();
            enemy.bullets.push({
                x: enemy.x,
                y: enemy.y,
                angle: enemy.shootAngle,
                speed: 4
            });
            enemy.currentCooldown = enemy.shootCooldown;
        } else {
            enemy.currentCooldown--;
        }
    });
}

function drawEnemies(ctx) {
    enemies.forEach(enemy => {
        drawShip(ctx, enemy.ship, enemy.x, enemy.y, enemy.angle);
    });
}