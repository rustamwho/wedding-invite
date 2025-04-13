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

// Функция обновления параллакса
function updateParallax() {
    const parallaxElement = document.querySelector('.hero-parallax');

    if (parallaxElement) {
        const parallaxSpeed = isTouchDevice ? 0.15 : 0.4;
        parallaxElement.style.transform = `translateY(${lastScrollPosition * parallaxSpeed}px)`;
    }
    ticking = false;
}

// Обработчик прокрутки с оптимизацией
window.addEventListener('scroll', function() {
    lastScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
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
