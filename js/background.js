const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let backgroundLayer;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = (Math.random() - 0.5) * speed;
        this.speedY = (Math.random() - 0.5) * speed;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 180, ${this.opacity})`;
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        this.draw();
    }
}

function createBackground() {
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    const offCtx = offscreenCanvas.getContext('2d');

    // 🌌 только небо (без луны)
    const gradient = offCtx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1e1b30');
    gradient.addColorStop(1, '#3e3358');

    offCtx.fillStyle = gradient;
    offCtx.fillRect(0, 0, canvas.width, canvas.height);

    return offscreenCanvas;
}

function initParticles() {
    particles = [];

    const count = window.innerWidth < 768 ? 40 : 80;

    for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2.5 + 1;

        particles.push(new Particle(x, y, radius, 0.6));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(backgroundLayer, 0, 0);

    particles.forEach(p => p.update());

    requestAnimationFrame(animate);
}

function init() {
    resizeCanvas();

    backgroundLayer = createBackground();

    initParticles();

    animate();
}

window.addEventListener('resize', init);

init();