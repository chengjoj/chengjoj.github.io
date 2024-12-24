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

document.addEventListener('DOMContentLoaded', function() {
    const topBar = document.querySelector('.top-bar');
    const menuButton = document.getElementById('menuButton');
    const backgroundMusicButton = document.getElementById('backgroundMusicButton');
    const scrollTopButton = document.getElementById('scrollTopButton');
    const sideMenu = document.getElementById('sideMenu');
    const backgroundMusicMenu = document.getElementById('backgroundMusicMenu');
    const backgroundMusicPlayer = document.getElementById('backgroundMusicPlayer');
    const musicFiles = ['music1.mp3', 'music2.mp3', 'music3.mp3'];

    // 随机选择一首背景音乐播放
    const randomMusic = musicFiles[Math.floor(Math.random() * musicFiles.length)];
    backgroundMusicPlayer.src = randomMusic;
    backgroundMusicPlayer.volume = 0.1; // 设置音量为10%
    backgroundMusicPlayer.play();

    // 侧边菜单显示与隐藏
    menuButton.addEventListener('click', function(event) {
        event.stopPropagation(); // 阻止事件冒泡
        sideMenu.style.left = sideMenu.style.left === '0px' ? '-100%' : '0';
    });

    // 背景音乐选择界面显示与隐藏
    backgroundMusicButton.addEventListener('click', function(event) {
        event.stopPropagation(); // 阻止事件冒泡
        backgroundMusicMenu.style.display = backgroundMusicMenu.style.display === 'none' ? 'block' : 'none';
    });

    // 点击界面以外的地方使侧边菜单和背景音乐选择界面消失
    document.addEventListener('click', (event) => {
        if (event.target === backgroundMusicButton) {
            return; // 如果点击的是背景音乐按钮，则不执行任何操作
        }
        if (event.target === sideMenu || event.target.closest('.side-menu')) {
            sideMenu.style.left = '-100%';
            return; // 如果点击的是侧边菜单，则只关闭侧边菜单
        }
        sideMenu.style.left = '-100%';
        backgroundMusicMenu.style.display = 'none'; // 关闭背景音乐选择界面
    });

    // 页面滚动时顶部横栏的显示与隐藏
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            topBar.style.top = '0';
        } else {
            topBar.style.top = '-50px';
        }
    });

    // 快速回到顶部
    scrollTopButton.addEventListener('click', function(event) {
        event.stopPropagation(); // 阻止事件冒泡
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 目录快速定位
    document.querySelectorAll('.side-menu-list a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // 阻止事件冒泡
            const blockId = anchor.getAttribute('href');
            const element = document.querySelector(blockId);
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
            sideMenu.style.left = '-100%'; // 关闭侧边菜单
        });
    });

    // 背景音乐选择
    document.querySelectorAll('.music-select').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            const musicSrc = button.getAttribute('data-src');
            backgroundMusicPlayer.src = musicSrc;
            backgroundMusicPlayer.play();
            backgroundMusicMenu.style.display = 'none'; // 关闭背景音乐选择界面
        });
    });
});
