import {FetchMore} from './fetch-more';

const initFetchMore = () => {
  const data = {
    pressCenter: [
      '[data-name="add-press-content"]',
      '[data-name="press-content-item"]',
      '[data-name="press-more"]',
      'form[data-filter]',
      '[data-filter-sort-by-date]',
      '[data-select-search]'
    ],
    knowledge: [
      '[data-name="add-events-content"]',
      '[data-name="events-content-item"]',
      '[data-name="events-more"]',
      'form[data-filter]',
      '',
      '[data-select-search]'
    ],
    massMedia: [
      '[data-name="add-mass-media-content"]',
      '[data-name="mass-media-content-item"]',
      '[data-name="mass-media"]',
      'form[data-filter]',
      '[data-filter-sort-by-date]',
      '[data-select-search]'
    ],
    search: [
      '[data-name="search-content"]',
      '[data-name="search-content-item"]',
      '[data-name="search-more"]',
      'form[data-filter]',
      '',
      ''
    ],
    projects: [
      '[data-name="add-projects-content"]',
      '[data-name="projects-content-item"]',
      '[data-name="projects-more"]',
      'form[data-filter]',
      '',
      '[data-select-search]'
    ],
  };

  Object.values(data)
      .forEach((selectors) =>
        new FetchMore().init(...selectors));
};

export {initFetchMore};
