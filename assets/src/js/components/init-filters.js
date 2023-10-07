import {getParams, updateURL} from './fetch-more';

const initFilters = () => {
  try {
    const checkboxFilters = document.querySelectorAll('[data-filter-checkbox]');
    const form = document.querySelector('[data-filter]');
    const resetBtn = form.querySelector('[type="reset"]');
    const inputSortByDate = document.querySelector('[data-filter-sort-by-date]');
    const yearLinks = document.querySelectorAll('[data-ajax-year]');

    if (checkboxFilters.length) {
      checkboxFilters.forEach((check) => {
        check.addEventListener('change', () => {
          form.dispatchEvent(new CustomEvent('change'));

          const activeFilters = Array.from(checkboxFilters).some(checkbox => checkbox.checked);

          if (activeFilters) {
            resetBtn.classList.add('is-active');
          } else {
            resetBtn.classList.remove('is-active');
          }
        });
      });
    }

    if (inputSortByDate) {
      inputSortByDate.addEventListener('change', () => {
        form.dispatchEvent(new CustomEvent('sortChange'));
      });
    }

    if (yearLinks.length) {
      yearLinks.forEach((link) => {
        link.addEventListener('click', (evt) => {
          evt.preventDefault();
          yearLinks.forEach((li) => {
            li.classList.remove('is-active');
          });
          link.classList.add('is-active');
          form.dispatchEvent(new CustomEvent('yearsChange'));
        });
      });
    }

    document.addEventListener('click', (e) => {
      const paginationBtn = e.target.closest('.page-numbers');

      if (paginationBtn) {
        e.preventDefault();
        form.dispatchEvent(new CustomEvent('paginationClicked', {
          detail: {
            page: paginationBtn.href,
          },
        }));
      }
    });
  } catch (e) {
    console.log('initFilters error: ' + e);
  }
};


export {initFilters};
