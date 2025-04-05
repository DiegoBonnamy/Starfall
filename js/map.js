const ringOfRuinMap = document.getElementById("map-ring-of-ruin");
const moonfallNexusMap = document.getElementById("map-moonfall-nexus");
const voidDriftMap = document.getElementById("map-void-drift");

const maps = {
    // Ring of Ruin (Default)
    0: {
       id: 0,
       enableAsteroids: false,
       asteroidMinSpawnDuration: 0,
       asteroidMaxSpawnDuration: 0,
       enemySpawnInterval: 8000,
       minEnemySpawnInterval: 1000,
       difficultyIncreaseRate: 300,
       name: "Ring of Ruin",
       image: "images/map1.jpg",
       bestScore: 0
    },

    // Moonfall Nexus
    1: {
        id: 1,
        enableAsteroids: true,
        asteroidMinSpawnDuration: 5000,
        asteroidMaxSpawnDuration: 15000,
        enemySpawnInterval: 5000,
        minEnemySpawnInterval: 800,
        difficultyIncreaseRate: 300,
        name: "Moonfall Nexus",
        image: "images/map2.jpg",
        bestScore: 0
    },

    // Void Drift
    2: {
        id: 2,
        enableAsteroids: true,
        asteroidMinSpawnDuration: 500,
        asteroidMaxSpawnDuration: 1500,
        enemySpawnInterval: 10000,
        minEnemySpawnInterval: 1000,
        difficultyIncreaseRate: 300,
        name: "Void Drift",
        image: "images/map3.jpg",
        bestScore: 0
    },
}

function loadMap(map) {
    switch (map.id) {
        case 0:
            ringOfRuinMap.style.display = "block";
            moonfallNexusMap.style.display = "none";
            voidDriftMap.style.display = "none";
            break;

        case 1:
            ringOfRuinMap.style.display = "none";
            moonfallNexusMap.style.display = "block";
            voidDriftMap.style.display = "none";
            break;

        case 2:
            ringOfRuinMap.style.display = "none";
            moonfallNexusMap.style.display = "none";
            voidDriftMap.style.display = "block";
            break;
    
        default:
            break;
    }
}