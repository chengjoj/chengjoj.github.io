document.addEventListener('DOMContentLoaded', function() {
    const bouncingContainer = document.querySelector('.bouncing-container');
    const bouncingCircle = document.querySelector('.bouncing-circle');

    let posX = 0;
    let posY = 0;
    let speedX = 5;
    let speedY = 5;
    let animationFrameId;

    function moveCircle() {
        posX += speedX;
        posY += speedY;

        // 检测左右边界碰撞
        if (posX <= 0 || posX >= bouncingContainer.clientWidth - bouncingCircle.clientWidth) {
            speedX = -speedX;
        }

        // 检测上下边界碰撞
        if (posY <= 0 || posY >= bouncingContainer.clientHeight - bouncingCircle.clientHeight) {
            speedY = -speedY;
        }

        bouncingCircle.style.left = `${posX}px`;
        bouncingCircle.style.top = `${posY}px`;

        animationFrameId = requestAnimationFrame(moveCircle);
    }

    bouncingContainer.addEventListener('mousedown', (event) => {
        cancelAnimationFrame(animationFrameId);
    });

    bouncingContainer.addEventListener('mouseup', (event) => {
        animationFrameId = requestAnimationFrame(moveCircle);
    });

    moveCircle();
});