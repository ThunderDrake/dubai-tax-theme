import Swiper from "swiper";
import { Navigation } from 'swiper/modules';

const newsSlider = new Swiper('.news-section__slider', {
  modules: [Navigation],
  navigation: {
    nextEl: '.news-section__slider-button--next',
    prevEl: '.news-section__slider-button--prev',
  },
  slidesPerView: 4,
  spaceBetween: 30,
})
