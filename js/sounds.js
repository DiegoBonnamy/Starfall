// Souds management

const xWingExploseSound = new Audio('sounds/x-wing_explose.mp3');
const xWingFireSound = new Audio('sounds/x-wing_fire.mp3');
const tieExploseSound = new Audio('sounds/tie_explose.mp3');
const tieFireSound = new Audio('sounds/tie_fire.mp3');
const xWingAccelerate = new Audio('sounds/x-wing_accelerate.mp3');
const xWingDeccelerate = new Audio('sounds/x-wing_deccelerate.mp3');

function startAccelerateSound() {
    if (xWingAccelerate.paused) {
      xWingAccelerate.currentTime = 0;
      xWingAccelerate.play();
    }
  }
  
  function startDeccelerateSound() {
      if (xWingDeccelerate.paused) {
      xWingDeccelerate.currentTime = 0;
      xWingDeccelerate.play();
      }
  }
  
  function stopAccelerateSound() {
    xWingAccelerate.pause();
  }
  
  function stopDeccelerateSound() {
      xWingDeccelerate.pause();
    }
  
  document.addEventListener('keydown', (event) => {
    if (event.key === 'z' || event.key === 'ArrowUp') {
      startAccelerateSound();
    }
    if (event.key === 's' || event.key === 'ArrowDown') {
      startDeccelerateSound();
    }
  });
  
  document.addEventListener('keyup', (event) => {
    if (event.key === 'z' || event.key === 'ArrowUp') {
      stopAccelerateSound();
    }
    if (event.key === 's' || event.key === 'ArrowDown') {
      stopDeccelerateSound();
    }
  });