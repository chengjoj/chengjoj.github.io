const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');
const ballRadius = 30; // Increased ball size
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = 2;
let ballColor = '#0095DD';
let speed = 2;

const ball = document.createElement('canvas');
const ballCtx = ball.getContext('2d');
ball.width = ballRadius * 2;
ball.height = ballRadius * 2;
ballCtx.beginPath();
ballCtx.arc(ballRadius, ballRadius, ballRadius, 0, Math.PI * 2);
ballCtx.fillStyle = ballColor;
ballCtx.fill();

resetButton.addEventListener('click', function() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 2;
    dy = 2;
    speed = 2;
});

canvas.addEventListener('click', function(event) {
    if (isPointInBall(event.clientX, event.clientY)) {
        speed += 0.5;
        playSound();
    }
});

function isPointInBall(mouseX, mouseY) {
    const dx = mouseX - x;
    const dy = mouseY - y;
    return Math.sqrt(dx * dx + dy * dy) < ballRadius;
}

function playSound() {
    const audio = new Audio('click-sound.mp3');
    audio.play();
}

function draw() {
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    x += dx * speed;
    y += dy * speed;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(ball, x - ballRadius, y - ballRadius);

    requestAnimationFrame(draw);
}

canvas.width = window.innerWidth * 0.8; // Adjusted canvas size
canvas.height = window.innerHeight * 0.8;
document.body.appendChild(canvas); // Append canvas to body after setting size
draw();
