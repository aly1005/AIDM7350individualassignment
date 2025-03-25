// script.js
document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const dotsContainer = document.querySelector('.nav-dots');
    let currentPage = 0;
    let isScrolling = false;

    // 生成导航点
    pages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.addEventListener('click', () => goToPage(index));
        dotsContainer.appendChild(dot);
    });

    // 页面跳转函数
    function goToPage(index) {
        if (index < 0 || index >= pages.length || isScrolling) return;
        
        isScrolling = true;
        pages[currentPage].classList.remove('active');
        pages[index].classList.add('active');
        updateDots(index);
        currentPage = index;
        
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }

    // 更新导航点
    function updateDots(index) {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // 鼠标滚轮事件
    window.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        e.deltaY > 0 ? goToPage(currentPage + 1) : goToPage(currentPage - 1);
    }, { passive: true });

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') goToPage(currentPage + 1);
        if (e.key === 'ArrowUp') goToPage(currentPage - 1);
    });

    // 触摸滑动支持
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        
        if (Math.abs(deltaY) > 50) {
            deltaY > 0 ? goToPage(currentPage + 1) : goToPage(currentPage - 1);
        }
    }, { passive: true });

    // 倒计时脚本
function updateCountdown() {
    const targetDate = new Date('2024-09-01T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if(distance > 0){
        document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }
}

// 每秒更新
setInterval(updateCountdown, 1000);
updateCountdown(); // 立即执行
});