// Bullets management, as shots, asterorids, ...

const explosions = [];
const asteroids = [];
const protonExplosions = [];

function drawBullets(ctx, bullets, color) {
    bullets.forEach((bullet, index) => {
        bullet.x += Math.cos(bullet.angle) * bullet.speed;
        bullet.y += Math.sin(bullet.angle) * bullet.speed;

        // Halo lumineux autour du tir
        const gradient = ctx.createRadialGradient(bullet.x, bullet.y, 1, bullet.x, bullet.y, 6);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.5, color + "99"); // Légèrement transparent
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 6, 0, 2 * Math.PI);
        ctx.fill();

        // Traînée laser
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bullet.x, bullet.y);
        ctx.lineTo(
            bullet.x + Math.cos(bullet.angle) * 8,
            bullet.y + Math.sin(bullet.angle) * 8
        );
        ctx.stroke();

        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(index, 1);
        }
    });
}

function addExplosion(x, y, size, life) {
    explosions.push({ x, y, size: size, life: life });
}

function drawExplosions(ctx) {
    explosions.forEach((explosion, index) => {
        // Augmentation progressive de la taille
        explosion.size = (explosion.size || 30) * 1.01; 

        // Forme plus irrégulière
        const distortion = Math.random() * 4; 
        const gradient = ctx.createRadialGradient(
            explosion.x + distortion, explosion.y + distortion, 0,
            explosion.x, explosion.y, explosion.size
        );

        gradient.addColorStop(0, `rgba(255, 255, 150, ${explosion.life / 20})`); // Cœur lumineux jaune
        gradient.addColorStop(0.3, `rgba(255, 165, 0, ${explosion.life / 30})`); // Orange intense
        gradient.addColorStop(0.6, `rgba(255, 69, 0, ${explosion.life / 40})`); // Rouge vif
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Extérieur transparent

        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        explosion.life--;
        if (explosion.life <= 0) {
            explosions.splice(index, 1);
        }
    });
}

function checkCollisions(player, enemies) {
    player.bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + 6 > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + 6 > enemy.y
            ) {
                addExplosion(enemy.x, enemy.y, 5, 30);
                enemy.health -= player.damage
                if (enemy.health <= 0) {
                    destroyEnnemi(player, enemies, enemy, enemyIndex, true);
                }
                player.bullets.splice(bulletIndex, 1);
            }
        });
    });

    enemies.forEach(enemy => {
        enemy.bullets.forEach((bullet, bulletIndex) => {
            if (
                bullet.x < player.x + player.width &&
                bullet.x + 6 > player.x &&
                bullet.y < player.y + player.height &&
                bullet.y + 6 > player.y
            ) {
                player.health -= enemy.damage * player.damageReduction;
                healthBar.style.width = `${(player.health / player.maxHealth) * 100}%`;
                enemy.bullets.splice(bulletIndex, 1);
                if (player.health <= 0) {
                    xWingExploseSound.cloneNode(true).play();
                    alert(`Game Over! Score: ${player.score}`);
                    gameOver()
                }
            }
        });
    });

    asteroids.forEach((asteroid, i) => {
        let radiusA = asteroid.size / 2; // Rayon exact de l'astéroïde

        // Collision avec le joueur
        let playerRadius = 20; // Rayon du joueur (à ajuster selon ton vaisseau)
        if (Math.hypot(player.x - asteroid.x, player.y - asteroid.y) < radiusA + playerRadius) {
            player.health -= 30;
            addExplosion(player.x, player.y, 15, 100);
            if (player.health <= 0) {
                xWingExploseSound.cloneNode(true).play();
                alert(`Game Over! Score: ${player.score}`);
                gameOver();
            }
        }

        // Collision avec les ennemis
        enemies.forEach((enemy, j) => {
            let enemyRadius = 20; // Rayon de l'ennemi (à ajuster)
            if (Math.hypot(enemy.x - asteroid.x, enemy.y - asteroid.y) < radiusA + enemyRadius) {
                enemy.health -= 30;
                addExplosion(enemy.x, enemy.y, 15, 100);
                if (enemy.health <= 0) {
                    destroyEnnemi(player, enemies, enemy, j, false);
                }
            }
        });

        // Collision entre astéroïdes
        for (let j = i + 1; j < asteroids.length; j++) {
            let other = asteroids[j];
            let radiusB = other.size / 2; // Rayon de l'autre astéroïde
            let dist = Math.hypot(asteroid.x - other.x, asteroid.y - other.y);

            if (dist < radiusA + radiusB) {
                handleAsteroidCollision(asteroid, other);
            }
        }
    });

    protonExplosions.forEach((explosion) => {
        enemies.forEach((enemy, enemyIndex) => {
            let dist = Math.hypot(enemy.x - explosion.x, enemy.y - explosion.y);
            let thickness = 5; // Épaisseur de la zone de contact
            if (dist >= explosion.size - thickness && dist <= explosion.size + thickness) {
                addExplosion(enemy.x, enemy.y, 5, 30);
                enemy.health -= 50; // Inflige des dégâts
                if (enemy.health <= 0) {
                    destroyEnnemi(player, enemies, enemy, enemyIndex, true);
                }
            }
        });

        asteroids.forEach((asteroid, asteroidIndex) => {
            let dist = Math.hypot(asteroid.x - explosion.x, asteroid.y - explosion.y);
            let thickness = 5;
            if (dist >= explosion.size - thickness && dist <= explosion.size + thickness) {
                asteroids.splice(asteroidIndex, 1);
                addExplosion(asteroid.x, asteroid.y, 30, 100);
            }
        })
    });
}

function destroyEnnemi(player, enemies, enemy, enemyIndex, addReward) {
    enemies.splice(enemyIndex, 1);
    if (addReward) {
        player.score += enemy.reward;
    }
    addExplosion(enemy.x, enemy.y, 30, 100);
    scoreDisplay.textContent = `Score : ${player.score}`;
    tieExploseSound.cloneNode(true).play();
}

// Asteroids

function spawnAsteroid(canvas, player, asteroidMinSpawnDuration, asteroidMaxSpawnDuration) {
    const side = Math.floor(Math.random() * 4);
    let x, y, angle;
    
    switch (side) {
        case 0: // Haut
            x = Math.random() * canvas.width;
            y = 0;
            break;
        case 1: // Bas
            x = Math.random() * canvas.width;
            y = canvas.height;
            break;
        case 2: // Gauche
            x = 0;
            y = Math.random() * canvas.height;
            break;
        case 3: // Droite
            x = canvas.width;
            y = Math.random() * canvas.height;
            break;
    }

    angle = Math.atan2(player.y - y, player.x - x);

    asteroids.push({
        x,
        y,
        angle,
        initialAngle: angle,
        speed: 1,
        rotation: (Math.random() * 0.06 - 0.03),
        size: getRandom(30, 60)
    });

    setTimeout(() => {
        if (play) {
            spawnAsteroid(canvas, player, asteroidMinSpawnDuration, asteroidMaxSpawnDuration);
        }
    }, getRandom(asteroidMinSpawnDuration, asteroidMaxSpawnDuration));
}

function moveAsteroids(canvas) {
    asteroids.forEach((asteroid, index) => {
        asteroid.x += Math.cos(asteroid.initialAngle) * asteroid.speed;
        asteroid.y += Math.sin(asteroid.initialAngle) * asteroid.speed;
        asteroid.angle += asteroid.rotation;
        
        if (asteroid.x < 0 || asteroid.x > canvas.width || asteroid.y < 0 || asteroid.y > canvas.height) {
            asteroids.splice(index, 1);
        }
    });
}

function drawAsteroids(ctx) {
    asteroids.forEach(asteroid => {
        ctx.save();
        ctx.translate(asteroid.x, asteroid.y);
        ctx.rotate(asteroid.angle);

        let scale = asteroid.size / 50; // Normalisation (50 = taille de base)

        // Forme principale irrégulière
        ctx.beginPath();
        ctx.moveTo(0, -25 * scale);
        ctx.lineTo(20 * scale, -20 * scale);
        ctx.lineTo(25 * scale, 0);
        ctx.lineTo(15 * scale, 15 * scale);
        ctx.lineTo(-10 * scale, 25 * scale);
        ctx.lineTo(-20 * scale, 10 * scale);
        ctx.lineTo(-25 * scale, -10 * scale);
        ctx.lineTo(-10 * scale, -20 * scale);
        ctx.closePath();
        ctx.fillStyle = "#6B6B6B";
        ctx.fill();
        ctx.strokeStyle = "#444";
        ctx.stroke();

        // Cratères fixes ajustés à la taille
        ctx.fillStyle = "#525252";
        ctx.beginPath();
        ctx.arc(-5 * scale, -10 * scale, 5 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(10 * scale, 5 * scale, 7 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-10 * scale, 15 * scale, 4 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    });
}

function handleAsteroidCollision(a1, a2) {
    // Détection exacte du point d’impact
    let dx = a2.x - a1.x;
    let dy = a2.y - a1.y;
    let angle = Math.atan2(dy, dx);

    // Échanger les directions pour un rebond précis
    let speed1 = a1.speed;
    let speed2 = a2.speed;

    a1.initialAngle = angle + Math.PI; // Inversion direction
    a2.initialAngle = angle; // L'autre suit la logique de rebond

    // Ajustement des vitesses pour un effet plus naturel
    a1.speed = speed2 * 0.8 + speed1 * 0.2;
    a2.speed = speed1 * 0.8 + speed2 * 0.2;

    // Éviter que les astéroïdes restent collés en les poussant légèrement
    let overlap = (a1.size / 2 + a2.size / 2) - Math.hypot(dx, dy);
    let pushX = Math.cos(angle) * (overlap / 2);
    let pushY = Math.sin(angle) * (overlap / 2);

    a1.x -= pushX;
    a1.y -= pushY;
    a2.x += pushX;
    a2.y += pushY;
}

// Proton explosions

function addProtonExplosion(x, y, maxSize, life) {
    protonExplosions.push({
        x,
        y,
        size: 10,
        maxSize,
        life,
        currentLife: life
    });
}

function drawProtonExplosions(ctx) {
    protonExplosions.forEach((explosion) => {
        let alpha = explosion.currentLife / explosion.life; // Transparence qui diminue
        let blurAmount = 10 * (alpha); // Intensité du flou en fonction de la durée restante

        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.size, 0, Math.PI * 2);
        
        ctx.strokeStyle = `rgba(0, 191, 255, ${alpha})`; // Bleu ciel avec transparence
        ctx.lineWidth = 4; // Épaisseur du contour
        ctx.shadowColor = `rgba(0, 191, 255, ${alpha * 0.8})`; // Ombre bleue plus douce
        ctx.shadowBlur = blurAmount; // Ajoute du flou autour de l'onde
        
        ctx.stroke();
        ctx.closePath();
        
        // Reset du shadowBlur après dessin (évite d'affecter d'autres éléments)
        ctx.shadowBlur = 0;
    });
}

function moveProtonExplosions() {
    protonExplosions.forEach((explosion, index) => {
        explosion.size += explosion.maxSize / explosion.life;
        explosion.currentLife--;

        if (explosion.currentLife <= 0) {
            protonExplosions.splice(index, 1);
        }
    });
}
