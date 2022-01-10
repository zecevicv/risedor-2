/* #Global
  ======================================================= */
const body = document.querySelector('body');

/* #Header
  ======================================================= */
const header = document.querySelector('.header');
const hamburgerBtn = document.querySelector('.header-hamburger');
const menuClose = document.querySelector('.header .menu-close');

// Menu Open
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', (e) => {
    console.log('btn')
    header.classList.add('show-menu');
    body.classList.add('no-scroll');
  });
}

// Menu Close
if (menuClose) {
  menuClose.addEventListener('click', (e) => {
    console.log('close')
    header.classList.remove('show-menu');
    body.classList.remove('no-scroll');
  });
}

/* #Video Popup
  ======================================================= */
const videoPopupToggler = document.querySelector('.home-page .banner .popup-toggler') || document.querySelector('.video-section .popup-toggler');

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
            number.innerHTML = zero.val.toLocaleString('en-US', {maximumFractionDigits:0});
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

/* #Documents Slider
  ======================================================= */
new Swiper(".documents .swiper", {
  loop: true,
  pagination: {
    el: ".documents .swiper-pagination",
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  }
});

/* #Gallery Slider
  ======================================================= */
new Swiper(".gallery .swiper", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".gallery .swiper-button-next",
    prevEl: ".gallery .swiper-button-prev",
  },
  pagination: {
    el: ".gallery .swiper-pagination",
  }
});

/* #Blog Posts Slider
  ======================================================= */
new Swiper(".blog-posts .swiper", {
  slidesPerView: 1,
  loop: true,
  pagination: {
    el: ".blog-posts .swiper-pagination",
  },
  breakpoints: {
    0: {
      spaceBetween: 15
    },
    1024: {
      spaceBetween: 0
    }
  }
});

/* #Plans Imgs
================================================== */
if (document.querySelector('.plans .img-toggler')) {
  const imgTogglerLinks = document.querySelectorAll('.plans .img-toggler');
  const imgs = document.querySelectorAll('.plans .imgs li');

  imgTogglerLinks.forEach((toggler, index) => {
    toggler.addEventListener('click', (e) => {
      e.preventDefault();

      for (let i = 0; i < imgTogglerLinks.length; i++) {
        imgTogglerLinks[i].classList.remove('active');
        imgs[i].classList.remove('active');
      }

      toggler.classList.add('active');
      imgs[index].classList.add('active');
    });
  });
}