// Таймер обратного отсчета до 5 июля 2025
function updateCountdown() {
    const weddingDate = new Date('July 5, 2025 15:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    // Вычисляем дни, часы, минуты, секунды
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Если время вышло
    if (timeLeft < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = '<p>Свадьба состоялась!</p>';
    }

    updateWithAnimation('days', days);
    updateWithAnimation('hours', hours);
    updateWithAnimation('minutes', minutes);
    updateWithAnimation('seconds', seconds);
}

function updateWithAnimation(elementId, newValue) {
    const element = document.getElementById(elementId);
    const oldValue = element.textContent;

    if (oldValue !== newValue.toString()) {
        element.textContent = newValue;
        element.classList.add('update');
        setTimeout(() => element.classList.remove('update'), 500);
    }
}

// Запускаем таймер
const countdownInterval = setInterval(updateCountdown, 1000);

// Персонализация обращения к гостям через параметры URL
function personalizeAppeal() {
    const params = new URLSearchParams(window.location.search);
    const guest1 = params.get('q1');
    const guest2 = params.get('q2');
    const appealElement = document.getElementById('guest-appeal');

    if (guest1 && guest2) {
        appealElement.textContent = `Дорогие ${guest1} и ${guest2}!`;
    } else if (guest1) {
        appealElement.textContent = `Дорогой(ая) ${guest1}!`;
    } else {
        appealElement.textContent = 'Дорогие гости!';
    }
}

// Вызываем персонализацию при загрузке страницы
window.addEventListener('load', personalizeAppeal);

// Валидация и отправка формы через iframe
document.getElementById('wedding-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const confirmation = document.querySelector('input[name="entry.186441998"]:checked');
    const drinks = document.querySelectorAll('input[name="entry.458437242"]:checked');
    const messageElement = document.getElementById('form-message');

    // Валидация
    if (!name) {
        messageElement.textContent = 'Пожалуйста, укажите ваше имя и фамилию.';
        messageElement.classList.add('error');
        messageElement.classList.remove('success');
        messageElement.style.display = 'block';
        return;
    }

    if (!confirmation) {
        messageElement.textContent = 'Пожалуйста, подтвердите ваше присутствие.';
        messageElement.classList.add('error');
        messageElement.classList.remove('success');
        messageElement.style.display = 'block';
        return;
    }

    if (drinks.length === 0) {
        messageElement.textContent = 'Пожалуйста, выберите хотя бы одно предпочтение по напиткам.';
        messageElement.classList.add('error');
        messageElement.classList.remove('success');
        messageElement.style.display = 'block';
        return;
    }

    // Динамически создаем форму для отправки
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://docs.google.com/forms/d/e/1FAIpQLSfn2Fy3oUC-Jm-NKLfuEEEPPU2kO7bhNY1Og0MzOEyknRTCUQ/formResponse';
    form.target = 'hidden-iframe';
    form.style.display = 'none';

    // Добавляем поле имени
    const nameField = document.createElement('input');
    nameField.type = 'text';
    nameField.name = 'entry.1501194167';
    nameField.value = name;
    form.appendChild(nameField);

    // Добавляем поле подтверждения
    const confirmationField = document.createElement('input');
    confirmationField.type = 'text';
    confirmationField.name = 'entry.186441998';
    confirmationField.value = confirmation.value;
    form.appendChild(confirmationField);

    // Добавляем поля напитков
    drinks.forEach((drink, ) => {
        const drinkField = document.createElement('input');
        drinkField.type = 'text';
        drinkField.name = 'entry.458437242';
        drinkField.value = drink.value;
        form.appendChild(drinkField);
    });

    // Добавляем форму в документ и отправляем
    document.body.appendChild(form);
    form.submit();

    // Показываем сообщение об успехе
    messageElement.textContent = 'Спасибо за ваш ответ!';
    messageElement.classList.add('success');
    messageElement.classList.remove('error');
    messageElement.style.display = 'block';

    // Очищаем форму
    document.getElementById('wedding-form').reset();

    // Скрываем сообщение через 5 секунд
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
});

// Глобальные переменные
let lastScrollPosition = 0;
let ticking = false;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// // Функция обновления параллакса
// function updateParallax() {
//     const parallaxElement = document.querySelector('.hero-parallax');
//
//     if (parallaxElement) {
//         const parallaxSpeed = isTouchDevice ? 0.15 : 0.4;
//         parallaxElement.style.transform = `translateY(${lastScrollPosition * parallaxSpeed}px)`;
//     }
//     ticking = false;
// }
//
// // Обработчик прокрутки с оптимизацией
// window.addEventListener('scroll', function() {
//     lastScrollPosition = window.scrollY;
//
//     if (!ticking) {
//         window.requestAnimationFrame(updateParallax);
//         ticking = true;
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    // Функция для преобразования vh в пиксели
    function vhToPx(vh) {
        return (window.innerHeight * vh) / 100;
    }

    // Получаем все необходимые элементы
    const hero = document.querySelector('.hero');
    const heroParallax = document.querySelector('.hero-parallax');
    const heroContent = document.querySelector('.hero-content');
    const heroHeader = document.querySelector('.hero-header');
    const weddingDate = document.querySelector('.wedding-date');
    // const audioControls = document.querySelector('.audio-controls');

    // Фиксируем высоту картинки
    if (hero) {
        const pixelHeight = vhToPx(100); // 100vh
        hero.style.height = pixelHeight + 'px';
    }

    // Фиксируем высоту картинки
    if (heroParallax) {
        const pixelHeight = vhToPx(55); // 45vh
        heroParallax.style.height = pixelHeight + 'px';
    }

    // Фиксируем отступы для контента
    if (heroContent) {
        const paddingTop = vhToPx(55); // 50vh
        const paddingBottom = 40; // 80px уже в px, не нужно конвертировать
        heroContent.style.paddingTop = paddingTop + 'px';
        heroContent.style.paddingBottom = paddingBottom + 'px';
    }

    // Фиксируем отступ для заголовка
    if (heroHeader) {
        const marginBottom = Math.min(Math.max(vhToPx(5), 10), 100); // clamp(20px, 3vh, 40px)
        heroHeader.style.marginBottom = marginBottom + 'px';
    }

    // Фиксируем расстояние между текстом (именами) и датой
    const names = document.querySelector('.names');
    if (names && weddingDate) {
        // Получаем текущие позиции
        const namesRect = names.getBoundingClientRect();
        const dateRect = weddingDate.getBoundingClientRect();

        // Вычисляем текущее расстояние между элементами
        const currentGap = dateRect.top - namesRect.bottom;

        // Устанавливаем минимальное расстояние (не менее 30px)
        const minGap = Math.max(currentGap, 1);

        // Устанавливаем margin-top для даты, чтобы сохранить это расстояние
        weddingDate.style.marginTop = minGap + 'px';
    }

    // Фиксируем отступ для даты
    if (weddingDate) {
        const marginBottom = Math.min(Math.max(vhToPx(2), 40), 80); // clamp(40px, 2vh, 80px)
        weddingDate.style.marginBottom = marginBottom + 'px';
    }

    // Фиксируем положение аудиоконтрола
    // if (audioControls) {
    //     const bottom = 10; // 15px
    //     const right = 20; // 15px
    //     audioControls.style.bottom = bottom + 'px';
    //     audioControls.style.marginRight = right + 'px';
    // }

    // Дополнительно фиксируем размеры шрифтов
    const elementsWithRelativeFont = document.querySelectorAll('.hero h1, .names, .wedding-date span, .hint-text');
    elementsWithRelativeFont.forEach(element => {
        // Получаем текущий размер шрифта после применения всех стилей
        const currentSize = parseFloat(window.getComputedStyle(element).fontSize);
        // Устанавливаем фиксированный размер
        element.style.fontSize = currentSize + 'px';
    });

    // Фиксируем размеры иконок
    const icons = document.querySelectorAll('.hint-arrow, .sound-icon');
    icons.forEach(icon => {
        const computedStyle = window.getComputedStyle(icon);
        const width = parseFloat(computedStyle.width);
        const height = parseFloat(computedStyle.height);

        icon.style.width = width + 'px';
        icon.style.height = height + 'px';
    });

    const loadingScreen = document.getElementById('loading-screen');
    const otherSections = document.querySelectorAll('section:not(.hero)');

    setTimeout(function() {
        // Скрываем загрузочный экран
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
        }

        // Плавно показываем hero секцию
        if (hero) {
            hero.style.opacity = '1';
        }

        // Плавно показываем остальные секции с задержкой
        otherSections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 200 * index);
        });
    }, 2000); // Увеличил задержку для лучшего эффекта
});

const audio = document.getElementById('background-music');
const muteButton = document.getElementById('mute-button');
const soundOnIcon = muteButton.querySelector('.sound-on');
const soundOffIcon = muteButton.querySelector('.sound-off');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        soundOnIcon.style.display = 'none';
        soundOffIcon.style.display = 'block';
    } else {
        audio.play().then(() => {
            soundOnIcon.style.display = 'block';
            soundOffIcon.style.display = 'none';
        }).catch(error => {
            console.log('Ошибка воспроизведения:', error);
        });
    }
    isPlaying = !isPlaying;
}

// Попытка автопроигрывания при загрузке
window.addEventListener('load', () => {
    audio.play().then(() => {
        isPlaying = true;
        soundOnIcon.style.display = 'block';
        soundOffIcon.style.display = 'none';
    }).catch(error => {
        console.log('Заблокировано:(', error);
        soundOnIcon.style.display = 'none';
        soundOffIcon.style.display = 'block';
    });
});
