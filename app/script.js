//--------- header-scroll
(() => {
    const header = document.querySelector('header');
    window.onscroll = () => {
        if (window.pageYOffset > 50) {
            header.classList.add('active')
        } else {
            header.classList.remove('active')
        }
    }
})();

//----------- burger-menu
(() => {
    const burger = document.querySelector('.header__burger');
    const header_nav = document.querySelector('.header__nav');
    const header_nav_close = document.querySelector('.header__nav-close');

    burger.addEventListener('click', () => {
        header_nav.classList.add('active')
    });
    header_nav_close.addEventListener('click', () => {
        header_nav.classList.remove('active')
    })
})();

// Scroll to anchors
(() => {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;

        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
})();