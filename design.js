const starContainer = document.querySelector('.stars');

for (let i = 0; i < 150; i++) {  // Ajuste ce nombre pour définir la densité
    const star = document.createElement('div');
    star.className = 'star';

    const x = Math.random() * 100; // Position horizontale aléatoire
    const y = Math.random() * 100; // Position verticale aléatoire
    const size = Math.random() * 3; // Taille aléatoire (petites variations)

    star.style.top = `${y}%`;
    star.style.left = `${x}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.opacity = Math.random() * 0.8 + 0.2; // Luminosité variable

    starContainer.appendChild(star);
}