import {debounce} from '../components/utils/debouce';

const btnToTop = document.querySelector('[data-btn-to-top]');

const onClickBtnToTop = (e) => {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const initScrollToTop = () => {
  if (!btnToTop) {
    return;
  }

  try {
    if (window.scrollY > 300) {
      btnToTop.classList.add('is-visible');
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btnToTop.classList.add('is-visible');
      } else {
        btnToTop.classList.remove('is-visible');
      }
    });

    btnToTop.addEventListener('click', onClickBtnToTop);

  } catch (error) {
    console.log(error);
  }


};
