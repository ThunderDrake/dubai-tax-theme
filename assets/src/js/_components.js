import {initModals} from './components/modals/init-modals';
import {Form} from './components/form-validate/form';
import {showFilter} from './components/show-filter.js';
import {initFetchMore} from './components/init-fetch-more.js';
import {initChapter} from './components/init-chapter.js';
import {searchField} from './components/init-search-field.js';
import {initFilters} from './components/init-filters.js';
import {initScrollToTop} from './components/init-scroll-to-top.js';
import {initSearchForm} from './components/init-search-list';
import './components/init-code-block';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
    initFetchMore();
    initFilters();
    showFilter();
    setTimeout(initChapter(), 500);
    searchField();
    initScrollToTop();

    setTimeout(initSearchForm(), 500)

  });
});
