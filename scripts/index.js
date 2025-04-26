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


document.addEventListener('DOMContentLoaded', function () {
    // Блокируем прокрутку при загрузке
    document.body.classList.add('loading');

    function vhToPx(vh) {
        return (window.innerHeight * vh) / 100;
    }

    const loadingScreen = document.getElementById('loading-screen');
    const hero = document.querySelector('.hero');
    const heroParallax = document.querySelector('.hero-parallax');
    const heroContent = document.querySelector('.hero-content');
    const heroHeader = document.querySelector('.hero-header');
    const weddingDate = document.querySelector('.wedding-date');

    const elementsToReveal = document.querySelectorAll(`
        section:not(.hero) h2, 
        section:not(.hero) h3,
        section:not(.hero) p, 
        section:not(.hero) .color-palette,
        section:not(.hero) .example,
        section:not(.hero) .gallery,
        section:not(.hero) .gallery img,
        section:not(.hero) a,
        section:not(.hero) i,
        .venue-info *, 
        .timeline,
        .schedule-item, 
        .detail-item, 
        .form-field,
        #wedding-form,
        #wedding-form button,
        form button[type="submit"],
        .social-links a
    `);

    elementsToReveal.forEach((element) => {
        element.classList.add('reveal');
        element.classList.add('reveal-fade');
    });

    // Создаем Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // срабатывает, когда 20% элемента видно
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Запускать анимацию только один раз
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Функция для запуска наблюдения за элементами
    function startObserving() {
        elementsToReveal.forEach(element => {
            observer.observe(element);
        });
    }

    if (hero) {
        const pixelHeight = vhToPx(100);
        hero.style.height = pixelHeight + 'px';
    }

    if (heroParallax) {
        const pixelHeight = vhToPx(55);
        heroParallax.style.height = pixelHeight + 'px';
    }

    // Фиксируем отступы для контента
    if (heroContent) {
        const paddingTop = vhToPx(55);
        const paddingBottom = 40;
        heroContent.style.paddingTop = paddingTop + 'px';
        heroContent.style.paddingBottom = paddingBottom + 'px';
    }

    // Фиксируем отступ для заголовка
    if (heroHeader) {
        const marginBottom = Math.min(Math.max(vhToPx(5), 10), 100);
        heroHeader.style.marginBottom = marginBottom + 'px';
    }

    // Фиксируем расстояние между именами и датой
    const names = document.querySelector('.names');
    if (names && weddingDate) {
        const namesRect = names.getBoundingClientRect();
        const dateRect = weddingDate.getBoundingClientRect();

        const currentGap = dateRect.top - namesRect.bottom;

        const minGap = Math.max(currentGap, 1);

        weddingDate.style.marginTop = minGap + 'px';
    }

    // Фиксируем отступ для даты
    if (weddingDate) {
        const marginBottom = Math.min(Math.max(vhToPx(2), 40), 80);
        weddingDate.style.marginBottom = marginBottom + 'px';
    }

    // Фиксируем размеры шрифтов
    const elementsWithRelativeFont = document.querySelectorAll('.hero h1, .names, .wedding-date span, .hint-text, .timer-heading h3, footer p, .timer-container span');
    elementsWithRelativeFont.forEach(element => {
        const currentSize = parseFloat(window.getComputedStyle(element).fontSize);

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


    setTimeout(function () {
        // Скрываем загрузочный экран
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
        }

        // Плавно показываем hero секцию
        if (hero) {
            hero.style.opacity = '1';
        }

        document.body.classList.remove('loading');

        startObserving(); // Запускаем Intersection Observer

        // window.addEventListener('scroll', revealOnScroll);

    }, 2000);
});

// Персонализация обращения к гостям
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

// Управление видимостью блока с напитками
const confirmationRadios = document.querySelectorAll('input[name="entry.186441998"]');
const drinksField = document.getElementById('drinks-field');

confirmationRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'Не смогу прийти') {
            drinksField.classList.add('hidden');
        } else {
            drinksField.classList.remove('hidden');
        }
    });
});

// Валидация и отправка формы через iframe
document.getElementById('wedding-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const confirmation = document.querySelector('input[name="entry.186441998"]:checked');
    const drinks = document.querySelectorAll('input[name="entry.458437242"]:checked');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const form = document.getElementById('wedding-form');
    const formSection = document.querySelector('.form-section');

    // Валидация
    if (!name) {
        modalMessage.textContent = 'Пожалуйста, укажите ваше имя и фамилию';
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 2000);
        return;
    }

    if (!confirmation) {
        modalMessage.textContent = 'Пожалуйста, подтвердите ваше присутствие';
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 2000);
        return;
    }

    // Проверяем напитки только если выбрано "Приду"
    if (confirmation.value === 'Приду' && drinks.length === 0) {
        modalMessage.textContent = 'Пожалуйста, выберите хотя бы один напиток';
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 2000);
        return;
    }

    // Динамически создаем форму для отправки
    const submitForm = document.createElement('form');
    submitForm.method = 'POST';
    submitForm.action = 'https://docs.google.com/forms/d/e/1FAIpQLSfn2Fy3oUC-Jm-NKLfuEEEPPU2kO7bhNY1Og0MzOEyknRTCUQ/formResponse';
    submitForm.target = 'hidden-iframe';
    submitForm.style.display = 'none';

    // Добавляем поле имени
    const nameField = document.createElement('input');
    nameField.type = 'text';
    nameField.name = 'entry.1501194167';
    nameField.value = name;
    submitForm.appendChild(nameField);

    // Добавляем поле подтверждения
    const confirmationField = document.createElement('input');
    confirmationField.type = 'text';
    confirmationField.name = 'entry.186441998';
    confirmationField.value = confirmation.value;
    submitForm.appendChild(confirmationField);

    // Добавляем поля напитков, если выбрано "Приду"
    if (confirmation.value === 'Приду') {
        drinks.forEach((drink) => {
            const drinkField = document.createElement('input');
            drinkField.type = 'text';
            drinkField.name = 'entry.458437242';
            drinkField.value = drink.value;
            submitForm.appendChild(drinkField);
        });
    }

    // Добавляем форму в документ и отправляем
    document.body.appendChild(submitForm);
    submitForm.submit();

    // Скрываем форму
    form.classList.add('hidden');

    // Показываем модальное окно с сообщением об успехе
    modalMessage.textContent = 'Спасибо за ваш ответ!';
    modal.style.display = 'flex';

    // Очищаем форму (на всякий случай)
    form.reset();
    drinksField.classList.remove('hidden');

    // Скрываем модальное окно через 2 секунды
    setTimeout(() => {
        modal.style.display = 'none';

        // Добавляем сообщение после закрытия модального окна
        const thankYouMessage = document.createElement('p');
        thankYouMessage.textContent = 'Спасибо, что ответили!';
        thankYouMessage.style.fontFamily = "'Extra light wedding', sans-serif";
        thankYouMessage.style.fontSize = '1.3em';
        thankYouMessage.style.color = '#000000';
        thankYouMessage.style.marginTop = '20px';
        thankYouMessage.classList.add('animate-slide-up');
        formSection.appendChild(thankYouMessage);
    }, 3000);
});


// Таймер
function updateCountdown() {
    const weddingDate = new Date('July 5, 2025 15:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

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
