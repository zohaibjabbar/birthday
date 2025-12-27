const canvas = document.getElementById("canvas-container");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
let balloons = [];

const colors = ["#ff6b6b", "#feca57", "#1dd1a1", "#5f27cd", "#54a0ff", "#ff9ff3"];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener("resize", resize);
resize();

const random = (min, max) => Math.random() * (max - min) + min;

/* Confetti */
class Particle {
    constructor(x, y, force = 1) {
        this.x = x;
        this.y = y;
        this.size = random(5, 12);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = random(-3, 3) * force;
        this.speedY = random(-8, -3) * force;
        this.gravity = 0.15;
    }

    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        return this.y < height + 20;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

/* Balloons */
class Balloon {
    constructor() {
        this.r = random(25, 40);
        this.x = random(this.r, width - this.r);
        this.y = height + random(100, 400);
        this.speed = random(1, 3);
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y -= this.speed;
        if (this.y < -this.r) {
            this.y = height + random(100, 300);
            this.x = random(this.r, width - this.r);
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

/* Init */
for (let i = 0; i < 12; i++) balloons.push(new Balloon());

function burst(x, y, count = 15) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, 2));
    }
}

canvas.addEventListener("click", e => burst(e.clientX, e.clientY));

function animate() {
    ctx.clearRect(0, 0, width, height);

    balloons.forEach(b => {
        b.update();
        b.draw();
    });

    particles = particles.filter(p => {
        p.draw();
        return p.update();
    });

    requestAnimationFrame(animate);
}

animate();
setTimeout(() => burst(width / 2, height / 2, 120), 600);
