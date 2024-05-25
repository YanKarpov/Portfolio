document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loader = document.querySelector('.loader');
    const progressText = document.getElementById('progress-text');

    // Установите продолжительность задержки в миллисекундах
    const delayDuration = 3000; // 3 секунды

    // Устанавливаем интервал обновления шкалы загрузки
    const interval = 50; // Каждые 50 мс

    let progress = 0;

    const updateProgress = () => {
        progress += (interval / delayDuration) * 100;
        if (progress >= 100) {
            clearInterval(progressInterval);
            progress = 100;
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500); // Задержка перед скрытием экрана загрузки для плавного перехода
        }
        loader.style.transform = `rotate(${progress * 3.6}deg)`; // Преобразуем проценты в градусы для вращения
        progressText.textContent = `${Math.round(progress)}%`;
    };

    const progressInterval = setInterval(updateProgress, interval);

    window.addEventListener('load', function() {
        if (progress < 100) {
            progress = 100;
            clearInterval(progressInterval);
            loader.style.transform = `rotate(${progress * 3.6}deg)`;
            progressText.textContent = `${Math.round(progress)}%`;
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    });
});


