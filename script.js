const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');
const ballRadius = 20; // 可以根据需要调整圆形图片的大小
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = 2;
let speed = 2;

// 圆形图片的路径，确保你的项目文件夹中有这个图片
const ballImage = new Image();
ballImage.src = '20240110_1744911584205082624.jpg'; // 替换为你的圆形图片文件路径

resetButton.addEventListener('click', function() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 2;
    dy = 2;
    speed = 2;
});

canvas.addEventListener('click', function(event) {
    if (isPointInBall(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)) {
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
    const audio = new Audio('split(1).mp3');
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
    ctx.drawImage(ballImage, x - ballRadius, y - ballRadius);

    requestAnimationFrame(draw);
}

canvas.width = canvas.parentNode.clientWidth; // 确保画布填满父容器
canvas.height = canvas.parentNode.clientHeight;
document.body.appendChild(canvas); // Append canvas to body after setting size
ballImage.onload = draw; // Start drawing when the ball image is loaded
