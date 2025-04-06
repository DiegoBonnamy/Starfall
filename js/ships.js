// Ships managements with drawing

const ships = {
    // Spectre 9
    0: {
        id: 0,
        maxSpeed: 2,
        acceleration: 0.06,
        deceleration: 0.8,
        rotationSpeed: 0.02,
        maxHealth: 200,
        maxOverheat: 100,
        maxThrottle: 100,
        shootCooldown: 300,
        damage: 7,
        reward: 0
    },

    // Faucon Millenium
    1: {
        id: 1,
        maxSpeed: 2.5,
        acceleration: 0.08,
        deceleration: 0.10,
        rotationSpeed: 0.02,
        maxHealth: 300,
        maxOverheat: 100,
        maxThrottle: 100,
        shootCooldown: 300,
        damage: 10,
        reward: 0
    },

    // X-Wing
    2: {
        id: 2,
        maxSpeed: 3.5,
        acceleration: 0.12,
        deceleration: 0.15,
        rotationSpeed: 0.035,
        maxHealth: 100,
        maxOverheat: 100,
        maxThrottle: 100,
        shootCooldown: 100,
        damage: 20,
        reward: 0
    },

    // Croiseur
    3: {
        id: 3,
        maxSpeed: 1.3,
        acceleration: 0.03,
        deceleration: 0.07,
        rotationSpeed: 0.003,
        maxHealth: 1500,
        maxOverheat: 100,
        maxThrottle: 100,
        shootCooldown: 600,
        damage: 50,
        reward: 0
    },

    // A-Wing
    4: {
        id: 4,
        maxSpeed: 4.5,
        acceleration: 0.2,
        deceleration: 0.4,
        rotationSpeed: 0.05,
        maxHealth: 70,
        maxOverheat: 150,
        maxThrottle: 100,
        shootCooldown: 50,
        damage: 20,
        reward: 0
    },

    // TIE
    5: {
        id: 5,
        maxSpeed: 1.5,
        acceleration: 0.08,
        deceleration: 0.10,
        rotationSpeed: 0.02,
        maxHealth: 30,
        maxOverheat: 100,
        maxThrottle: 100,
        shootCooldown: 100,
        damage: 10,
        reward: 100
    },

    // Destroyer
    6: {
        id: 6,
        maxSpeed: 0.3,
        acceleration: 0.02,
        deceleration: 0.10,
        rotationSpeed: 0.005,
        maxHealth: 500,
        maxOverheat: 100,
        maxThrottle: 100,
        shootCooldown: 500,
        damage: 50,
        reward: 300
    },

    // Interceptor
    7: {
        id: 7,
        maxSpeed: 3,
        acceleration: 0.16,
        deceleration: 0.20,
        rotationSpeed: 0.05,
        maxHealth: 20,
        maxOverheat: 100,
        maxThrottle: 100,
        shootCooldown: 50,
        damage: 20,
        reward: 150
    }
}

// Faucon Millenium
function drawMillenniumFalcon(ctx, x, y, angle, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    // Corps principal
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0.25 * Math.PI, 1.75 * Math.PI);
    ctx.lineTo(30, 0);
    ctx.closePath();
    ctx.fillStyle = "#808080";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // Cockpit
    ctx.fillStyle = "#303030";
    ctx.fillRect(10, -5, 8, 10);

    // Détails
    ctx.fillStyle = "#fff";
    ctx.fillRect(-5, -2, 10, 4);
    ctx.restore();
}

// X-Wing
function drawXWing(ctx, x, y, angle, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    // Corps central
    ctx.fillStyle = "#909090";
    ctx.fillRect(-10, -5, 45, 10);
    ctx.beginPath();
    ctx.moveTo(35, -5);
    ctx.lineTo(40, -1);
    ctx.lineTo(40, 1);
    ctx.lineTo(35, 5);
    ctx.closePath();
    ctx.fill();

    // Cockpit
    ctx.fillStyle = "#303030";
    ctx.fillRect(10, -3, 10, 6);

    // Ailes
    ctx.fillStyle = "#707070";
    // Droite
    ctx.beginPath();
    ctx.moveTo(-10, 5);
    ctx.lineTo(5, 5);
    ctx.lineTo(0, 25);
    ctx.lineTo(-5, 25);
    ctx.closePath();
    ctx.fill();
    // Gauche
    ctx.beginPath();
    ctx.moveTo(-10, -5);
    ctx.lineTo(5, -5);
    ctx.lineTo(0, -25);
    ctx.lineTo(-5, -25);
    ctx.closePath();
    ctx.fill();

    // Détails des canons
    ctx.fillStyle = "#909090";
    ctx.fillRect(-5, 25, 15, 3);
    ctx.fillRect(-5, -25, 15, 3);
  
    // Réacteurs
    ctx.fillStyle = "#292929";
    ctx.fillRect(-12, -10, 15, 5);
    ctx.fillRect(-12, 5, 15, 5);

    ctx.restore();
}

// Spectre 9
function drawSpectre9(ctx, x, y, angle, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    // Corps central
    ctx.fillStyle = "#c9c9c9";
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(8, -10);
    ctx.lineTo(20, -5);
    ctx.lineTo(20, 5);
    ctx.lineTo(8, 10);
    ctx.lineTo(-8, 10);
    ctx.lineTo(-8, -10);
    ctx.closePath();
    ctx.fill();

    // Cockpit
    ctx.fillStyle = "#c9fffc";
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(8, -7);
    ctx.lineTo(20, -2);
    ctx.lineTo(20, 2);
    ctx.lineTo(8, 7);
    ctx.lineTo(0, 7);
    ctx.lineTo(0, -7);
    ctx.closePath();
    ctx.fill();

    // Ailes
    ctx.fillStyle = "#ededed";
    // Droite
    ctx.beginPath();
    ctx.moveTo(-8, 10);
    ctx.lineTo(-8, 12);
    ctx.lineTo(0, 25);
    ctx.lineTo(18, 27);
    ctx.lineTo(23, 20);
    ctx.lineTo(25, 25);
    ctx.lineTo(38, 25);
    ctx.lineTo(45, 15);
    ctx.lineTo(40, 10);
    ctx.closePath();
    ctx.fill();
    // Détails
    ctx.fillStyle = "#900000";
    ctx.beginPath();
    ctx.moveTo(-8, 10);
    ctx.lineTo(23, 20);
    ctx.lineTo(25, 25);
    ctx.lineTo(38, 25);
    ctx.lineTo(45, 15);
    ctx.lineTo(40, 10);
    ctx.lineTo(35, 14);
    ctx.lineTo(30, 14);
    ctx.lineTo(25, 10);
    ctx.closePath();
    ctx.fill();
    // Gauche
    ctx.fillStyle = "#ededed";
    ctx.beginPath();
    ctx.moveTo(-8, -10);
    ctx.lineTo(-8, -12);
    ctx.lineTo(0, -25);
    ctx.lineTo(18, -27);
    ctx.lineTo(23, -20);
    ctx.lineTo(25, -25);
    ctx.lineTo(38, -25);
    ctx.lineTo(45, -15);
    ctx.lineTo(40, -10);
    ctx.closePath();
    ctx.fill();
    // Détails
    ctx.fillStyle = "#900000";
    ctx.beginPath();
    ctx.moveTo(-8, -10);
    ctx.lineTo(23, -20);
    ctx.lineTo(25, -25);
    ctx.lineTo(38, -25);
    ctx.lineTo(45, -15);
    ctx.lineTo(40, -10);
    ctx.lineTo(35, -14);
    ctx.lineTo(30, -14);
    ctx.lineTo(25, -10);
    ctx.closePath();
    ctx.fill();

    // Détails des canons
    ctx.fillStyle = "#7d7d7d";
    ctx.fillRect(-5, 25, 15, 3);
    ctx.fillRect(-5, -25, 15, 3);
  
    // Réacteurs
    ctx.fillStyle = "#ffde3b";
    ctx.fillRect(-10, -5, 2, 10);

    ctx.restore();
}

// Croiseur
function drawCroiseur(ctx, x, y, angle, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    // Corps central
    ctx.fillStyle = "#c9c9c9";
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(60, -5);
    ctx.lineTo(60, 5);
    ctx.lineTo(0, 20);
    ctx.lineTo(-5, 15);
    ctx.lineTo(-10, 15);
    ctx.lineTo(-15, 23);
    ctx.lineTo(-18, 23);
    ctx.lineTo(-23, 8);
    ctx.lineTo(-23, -8);
    ctx.lineTo(-18, -23);
    ctx.lineTo(-15, -23);
    ctx.lineTo(-10, -15);
    ctx.lineTo(-5, -15);
    ctx.closePath();
    ctx.fill();

    // Détails
    ctx.fillStyle = "#470909";
    ctx.beginPath();
    ctx.moveTo(5, 0);
    ctx.lineTo(10, 10);
    ctx.lineTo(60, 5);
    ctx.lineTo(60, -5);
    ctx.lineTo(10, -10);
    ctx.closePath();
    ctx.fill();

    // Cockpit
    ctx.fillStyle = "#7d7d7d";
    ctx.fillRect(-20, -5, 28, 10);

    // Réacteurs
    ctx.beginPath();
    ctx.moveTo(-23, -8);
    ctx.lineTo(-28, -5);
    ctx.lineTo(-28, 5);
    ctx.lineTo(-23, 8);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

// A-Wing
function drawAWing(ctx, x, y, angle, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);
    
    // Corps central
    ctx.fillStyle = "#ededed";
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(0, -15);
    ctx.lineTo(10, -15);
    ctx.lineTo(45, -8);
    ctx.lineTo(45, 8);
    ctx.lineTo(10, 15);
    ctx.lineTo(0, 15);
    ctx.lineTo(0, 5);
    ctx.lineTo(-10, 5);
    ctx.lineTo(-10, -5);
    ctx.closePath();
    ctx.fill();
    
    // Détails
    ctx.fillStyle = "#801414";
    ctx.beginPath();
    ctx.moveTo(45, -8);
    ctx.lineTo(45, 8);
    ctx.lineTo(10, 5);
    ctx.lineTo(-5, 2);
    ctx.lineTo(-10, 2);
    ctx.lineTo(-10, -2);
    ctx.lineTo(-5, -2);
    ctx.lineTo(10, -5);
    ctx.closePath();
    ctx.fill();
    
    // Cockpit
    ctx.fillStyle = "#7d7d7d";
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(8, 5);
    ctx.lineTo(0, 5);
    ctx.lineTo(0, -5);
    ctx.lineTo(8, -5);
    ctx.closePath();
    ctx.fill();
    
    // Réacteurs
    ctx.fillStyle = "#801414";
    ctx.fillRect(-15, -10, 15, 5);
    ctx.fillRect(-15, 5, 15, 5);
    ctx.fillStyle = "#ededed";
    ctx.fillRect(-15, -10, 2, 5);
    ctx.fillRect(-15, 5, 2, 5);
    
    // Cannons
    ctx.fillStyle = "#7d7d7d";
    ctx.fillRect(0, -17, 25, 2);
    ctx.fillRect(0, 15, 25, 2);
   
    ctx.restore();
}

// Destroyer
function drawDestroyer(ctx, x, y, angle, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    // Corps principal
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(-20, 35);
    ctx.lineTo(-20, -35);
    ctx.closePath();
    ctx.fillStyle = "#505050";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // Détails du pont
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.lineTo(-10, 20);
    ctx.lineTo(-10, -20);
    ctx.closePath();
    ctx.fillStyle = "#303030";
    ctx.fill();

    // Détails lumineux
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(-18, -10, 2, 15);
    ctx.fillRect(-18, 10, 2, -15);

    // Cockpit
    ctx.fillStyle = "#909090";
    ctx.fillRect(-7, -15, 10, 30);

    ctx.restore();
}

// TIE
function drawTIE(ctx, x, y, angle, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);
  
    // Corps central du TIE (sphère)
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI); // Sphère centrale
    ctx.fillStyle = "#505050"; // Gris foncé métallique
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();
  
    // Détails du cockpit
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI); // Fenêtre centrale
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.stroke();
  
    // Ailes du TIE (orientées à 90 degrés)
    ctx.fillStyle = "#202020"; // Noir profond pour les ailes
    ctx.fillRect(-10, -25, 20, 5); // Aile supérieure
    ctx.fillRect(-10, 20, 20, 5);  // Aile inférieure
  
    // Détails des ailes
    ctx.strokeStyle = "#808080"; // Gris clair pour les lignes détaillées
    ctx.beginPath();
    ctx.moveTo(-10, -25);
    ctx.lineTo(-10, -20);
    ctx.lineTo(10, -20);
    ctx.lineTo(10, -25);
    ctx.closePath();
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(-10, 25);
    ctx.lineTo(-10, 20);
    ctx.lineTo(10, 20);
    ctx.lineTo(10, 25);
    ctx.closePath();
    ctx.stroke();
  
    ctx.restore();
}

// Interceptor 
function drawInterceptor(ctx, x, y, angle, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    // Coprs principal
    ctx.fillStyle = "#404040";
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.lineTo(-10, -20);
    ctx.lineTo(-20, -10);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-20, 10);
    ctx.lineTo(-10, 20);
    ctx.closePath();
    ctx.fill();

    // Cockpit
    ctx.fillStyle = "#a3a3a3";
    ctx.beginPath();
    ctx.moveTo(8, -2);
    ctx.lineTo(8, 2);
    ctx.lineTo(5, 5);
    ctx.lineTo(-8, 5);
    ctx.lineTo(-8, -5);
    ctx.lineTo(5, -5);
    ctx.lineTo(8, -2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

function drawShip(ctx, ship, x, y, angle, scale = 1) {
    switch (ship) {
        case 0:
            drawSpectre9(ctx, x, y, angle, scale);
            break;

        case 1:
            drawMillenniumFalcon(ctx, x, y, angle, scale);
            break;

        case 2:
            drawXWing(ctx, x, y, angle, scale);
            break;

        case 3:
            drawCroiseur(ctx, x, y, angle, scale);
            break;

        case 4:
            drawAWing(ctx, x, y, angle, scale);
            break;

        case 5:
            drawTIE(ctx, x, y, angle, scale);
            break;

        case 6:
            drawDestroyer(ctx, x, y, angle, scale);
            break;

        case 7:
            drawInterceptor(ctx, x, y, angle, scale);
            break;
    
        default:
            break;
    }
}