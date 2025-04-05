// Utils functions

function smoothRotation(currentAngle, targetAngle, rotationSpeed) {
    let angleDifference = ((targetAngle - currentAngle + Math.PI) % (2 * Math.PI)) - Math.PI;
    if (angleDifference > Math.PI) angleDifference -= 2 * Math.PI;
    if (angleDifference < -Math.PI) angleDifference += 2 * Math.PI;

    return currentAngle + Math.sign(angleDifference) * Math.min(Math.abs(angleDifference), rotationSpeed);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180
}

function getStatsCoefficient() {
    let screenHeight = window.innerHeight;

    if (screenHeight >= 720) {
        return 1;  // PC
    } else {
        return 0.5; // Mobile
    }
}