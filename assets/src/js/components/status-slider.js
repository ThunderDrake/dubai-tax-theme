import Swiper from "swiper";
import { Navigation, Autoplay } from 'swiper/modules';

const statusSlider = new Swiper('.status-section__slider', {
  modules: [Navigation, Autoplay],
  navigation: {
    nextEl: '.steps__slider-button--next',
    prevEl: '.steps__slider-button--prev',
  },
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 3000,
  },
  loop: true,
})
