const decorationsContainer = document.getElementById('decorations');

/* Background Generator */
function createDecorations() {
    if (!decorationsContainer) return;

    /* Ribbons */
    for (let i = 0; i < 3; i++) {
        const ribbon = document.createElement('div');
        ribbon.className = 'ribbon';
        ribbon.style.left = `${Math.random() * 100}vw`;
        ribbon.style.animationDelay = `${Math.random() * 10}s`;
        decorationsContainer.appendChild(ribbon);
    }

    /* Balloons */
    const balloonColors = ['#fbcfe8', '#ddd6fe', '#bae6fd', '#fef3c7'];
    for (let i = 0; i < 8; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';

        const size = Math.random() * 40 + 40;
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.2}px`;
        balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.borderRadius = '50%';
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.animationDuration = `${Math.random() * 10 + 10}s`;
        balloon.style.animationDelay = `${Math.random() * 5}s`;

        decorationsContainer.appendChild(balloon);
    }

    /* Petals */
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';

        const size = Math.random() * 10 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 5 + 8}s`;
        petal.style.animationDelay = `${Math.random() * 10}s`;

        decorationsContainer.appendChild(petal);
    }

    /* Butterflies */
    for (let i = 0; i < 6; i++) {
        const butterfly = document.createElement('div');
        butterfly.className = 'butterfly';
        butterfly.innerHTML = '🦋';

        butterfly.style.left = `${Math.random() * 100}vw`;
        butterfly.style.animationDuration = `${Math.random() * 10 + 10}s`;
        butterfly.style.animationDelay = `${Math.random() * 5}s`;

        decorationsContainer.appendChild(butterfly);
    }
}

createDecorations();
