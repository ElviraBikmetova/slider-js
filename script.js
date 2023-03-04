function initSlider(options) {
    options = options || {
        dots: true,
        arrows: true,
        tabs: true,
        autoplay: false,
        autoplayInterval: 5000
    }

    const sliderWrapper = document.querySelector('.slider');
    const slide = sliderWrapper.querySelectorAll('.slide');
    const sliderTabs = sliderWrapper.querySelectorAll('.slider__tab');
    const sliderArrows = sliderWrapper.querySelectorAll('.slider__arrow');
    const sliderDots = sliderWrapper.querySelector('.slider__dots');

    initSlide();
    if (options.arrows) {
        initArrows();
    } else {
        sliderArrows.forEach((item) => {
            item.classList.add('slider__arrow-na');
        })
    }
    if (options.dots) {
        initDots();
    }
    if (options.tabs) {
        initTabs();
    } else {
        sliderWrapper.querySelector('.slider__tabs').classList.add('slider__tabs-na');
    }
    if (options.autoplay) {
        initAutoplay();
    }

    function addAttr(item, index) {
        item.classList.add(`n${index}`);
        if (!index) {
            item.classList.add('active');
        }
        item.dataset.index = index;
    }

    function initSlide() {
        slide.forEach((item, index) => {
            addAttr(item, index);
        })
    }

    function moveItem(item, num) {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
           }
           if (item.classList.contains(`n${num}`)) {
               item.classList.add('active');
           }
    }

    function moveSlider(num) {
        slide.forEach (item => {
            moveItem(item, num);
         });
         if (options.tabs) {
                sliderTabs.forEach (item => {
                    moveItem(item, num);
                 });
            }
         if (options.dots) {
            sliderDots.querySelector('.active').classList.remove('active');
            sliderDots.querySelector('.n' + num).classList.add('active');
         }
    }

    let currentNum;
    let nextNum;

    function setIndex() {
        slide.forEach (item => {
            if (item.classList.contains('active')) {
             currentNum = +item.dataset.index;
            }
         });
    }

    function initArrows() {
        sliderArrows.forEach(arrow => {
            arrow.addEventListener('click', function() {
                setIndex();
                if (arrow.classList.contains('prev')) {
                    nextNum = currentNum === 0 ? slide.length -1 : currentNum -1;
                } else {
                    nextNum = currentNum === slide.length -1 ? 0 : currentNum + 1;
                }
                moveSlider(nextNum);
            })
        });
    }

    function initDots() {
        slide.forEach((item, index) => {
            let dot = `<div class="slider__dots-item n${index} ${index ? "" : "active"}" data-index = "${index}"></div>`;
            sliderDots.innerHTML += dot;
        })
        sliderDots.querySelectorAll('.slider__dots-item').forEach(dot => {
            dot.addEventListener('click', function() {
                moveSlider(this.dataset.index);
            })
        })
    }

    function initTabs() {
        sliderTabs.forEach((item, index) => {
            addAttr(item, index);
            item.addEventListener('click', function() {
                moveSlider(this.dataset.index);
            })
        })
    }

    function initAutoplay() {
        setInterval(() => {
            setIndex();
            nextNum = currentNum === slide.length -1 ? 0 : currentNum + 1;
           moveSlider(nextNum);
        }, options.autoplayInterval)
    }

}

let sliderOptions = {
    dots: true,
    arrows: true,
    tabs: true,
    autoplay: false,
    autoplayInterval: 3000
  };

document.addEventListener('DOMContentLoaded', () => {
    initSlider(sliderOptions);
})