/* #Global
  ======================================================= */
const body = document.querySelector('body');

/* #Video Popup
  ======================================================= */
const videoPopupToggler = document.querySelector('.home-page .banner .popup-toggler');

// Message Modal Handler
if (videoPopupToggler) {
  videoPopupToggler.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(videoPopupToggler.dataset)
    const popup = document.querySelector(videoPopupToggler.dataset.popup);

    if (popup) {
      popup.classList.toggle('show');
      body.classList.toggle('no-scroll');
    }
  });
}

// Popup Close
const videoPopup = document.querySelector('.video-popup');

if (videoPopup) {
  videoPopup.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.closest('.popup-close')) {
      videoPopup.classList.toggle('show');
      body.classList.toggle('no-scroll');
    }
  });
}

/* #Numbers Sliders
================================================== */
if (
  document.querySelector('.numbers .nums-slider .swiper') &&
  document.querySelector('.numbers .bg-slider .swiper')
) {

  const numsSlider = document.querySelector('.numbers .nums-slider');

  // Slider Initialization
  let thumbsSlider = new Swiper(".numbers .nums-slider .swiper", {
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 5,
      }
    },
  });

  let gallerySlider = new Swiper(".numbers .bg-slider .swiper", {
    slidesPerView: 1,
    effect: 'fade',
    allowTouchMove: false,
  });

  let thumbSlides = thumbsSlider.slides;
  let gallerySlides = gallerySlider.slides;

  // Play different video on hover (desktop)
  if (window.innerWidth > 1024) {
    thumbSlides.forEach((slide, index) => {
      slide.addEventListener('mouseenter', (e) => {
        let slideTo = slide.dataset.slideTo;
        if (gallerySlider.activeIndex != slideTo) {
          let galleryVideos = document.querySelectorAll('.numbers .bg-slider video');
          let galleryVideo = gallerySlides[slideTo - 1].querySelector('video');

          galleryVideos.forEach((video) => {
            video.pause();
            galleryVideo.currentTime = 0;
          });

          galleryVideo.play();

          gallerySlider.slideTo(slideTo - 1);
        }
      });
    });
  }

  if (window.innerWidth > 1024) {
    numsSlider.addEventListener('mouseleave', (e) => {
      gallerySlider.slideTo(0);
    });
  }

  // Play different video on slide change (mobile)
  // if (window.innerWidth < 1024) {
  //   thumbSlides.forEach((slide, index) => {
  //     slide.addEventListener('click', (e) => {
  //       let slideTo = slide.dataset.slideTo;
  //       if (gallerySlider.activeIndex != slideTo) {
  //         let galleryVideos = document.querySelectorAll('.numbers .bg-slider video');
  //         let galleryVideo = gallerySlides[slideTo - 1].querySelector('video');

  //         console.log(gallerySlides[slideTo - 1])

  //         galleryVideos.forEach((video) => {
  //           video.pause();
  //           galleryVideo.currentTime = 0;
  //         });

  //         galleryVideo.play();

  //         gallerySlider.slideTo(slideTo - 1);
  //       }
  //     });
  //   });
  // }
}

/* #Numbers Animation
  ======================================================= */
gsap.registerPlugin(ScrollTrigger);

const numbers = document.querySelectorAll('.numbers .num');

let show = false;

ScrollTrigger.create({
  trigger: ".numbers .nums-slider",
  onEnter: () => {
    if (!show) {
      numbers.forEach((number) => {
        var zero = {
          val: 0
        };
        var num = number.innerHTML;

        gsap.to(zero, {
          val: num,
          duration: 3,
          scrollTrigger: numbers,
          onUpdate: function () {
            // console.log(number.innerHTML)
            number.innerHTML = zero.val.toFixed(0);
          }
        });
      });
      show = true;
    }
  }
});

/* #Text Autoplay
  ======================================================= */
if (document.querySelector('.text-autoplay .swiper')) {
  new Swiper(".text-autoplay .swiper", {
    loop: true,
    freeMode: true,
    spaceBetween: 0,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 1
    },
    allowTouchMove: false,
    freeMode: true,
    speed: 20000,
    freeModeMomentum: false,
    breakpoints: {
      0: {
        slidesPerView: .35,
      },
      1024: {
        slidesPerView: .6,
      }
    }
  });
}