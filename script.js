document.addEventListener('DOMContentLoaded', function() {
    var bouncingContainer = document.querySelector('.bouncing-container');
    var bouncingCircle = document.getElementById('bouncingCircle');
    var resetButton = document.getElementById('resetButton');
    var clickSound = document.getElementById('click-sound');
    var messageDiv = document.getElementById('message');
    var posX = bouncingContainer.clientWidth / 2;
    var posY = bouncingContainer.clientHeight / 2;
    var initialSpeed = 2; // 初始速度大小
    var speed = initialSpeed; // 当前速度大小
    var angle = Math.PI / 4; // 初始速度方向，45度角
    var velocityX = Math.cos(angle); // 初始速度X
    var velocityY = Math.sin(angle); // 初始速度Y
    var lastClickTime = 0; // 上次点击时间
    var clickInterval = 1000; // 最小点击间隔1000毫秒
    var animationFrameId; // 用于存储requestAnimationFrame的ID

    function moveCircle() {
        posX += velocityX * speed;
        posY += velocityY * speed;

        if (posX <= 0 || posX >= bouncingContainer.clientWidth - bouncingCircle.clientWidth) {
            velocityX = -velocityX;
        }
        if (posY <= 0 || posY >= bouncingContainer.clientHeight - bouncingCircle.clientHeight) {
            velocityY = -velocityY;
        }

        bouncingCircle.style.left = posX + 'px';
        bouncingCircle.style.top = posY + 'px';

        animationFrameId = requestAnimationFrame(moveCircle); // 保存ID以供后续取消动画帧
    }

    function pauseAnimation() {
        cancelAnimationFrame(animationFrameId); // 取消动画帧
    }

    function resumeAnimation() {
        animationFrameId = requestAnimationFrame(moveCircle); // 恢复动画帧
    }

    bouncingCircle.addEventListener('click', function() {
        var now = new Date().getTime();
        if (now - lastClickTime < clickInterval) {
            messageDiv.textContent = '请勿重复点击';
            messageDiv.style.display = 'block';
            setTimeout(function() { messageDiv.style.display = 'none'; }, 2000);
            return;
        }
        lastClickTime = now;
        clickSound.play();
        messageDiv.textContent = '你已阻止看片中的父亲月月鸟';
        messageDiv.style.display = 'block';
        setTimeout(function() { messageDiv.style.display = 'none'; }, 2000);
        pauseAnimation(); // 暂停动画
        setTimeout(resumeAnimation, 2000); // 两秒后恢复动画
        speed += 0.5; // 增加速度大小
    });

    resetButton.addEventListener('click', function() {
        pauseAnimation(); // 暂停动画
        speed = initialSpeed; // 重置速度大小
        resumeAnimation(); // 恢复动画
    });

    requestAnimationFrame(moveCircle); // 开始动画
});
