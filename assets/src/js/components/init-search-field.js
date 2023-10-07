const initSearchField = (searchParent, form) => {
  const searchInput = searchParent.querySelector('input');
  const emptySearchReset = searchParent.querySelector('[data-search-reset]');


  if (searchInput.value) {
    searchParent.classList.add('is-non-empty');
  }

  let url;
  let filterPartOfUrl;

  const getFilterPartOfUrl = () => {
    url = `${window.location.href}`;
    const preDecodedFilterPartOfUrl = url.indexOf('?') >= 0 ? url.substring(url.indexOf('search=') + 7) : '' ; // 7 - compensate length of search=
    filterPartOfUrl = decodeURI(preDecodedFilterPartOfUrl).toLowerCase().replace(/\+/g,' ');
  }

  searchInput.addEventListener('input', () => {
    getFilterPartOfUrl();
    searchInput.value.length > 0 ? searchParent.classList.add('is-filled') : searchParent.classList.remove('is-filled');
    searchInput.value.length > 0 && filterPartOfUrl === searchInput.value ? searchParent.classList.add('is-non-empty') : searchParent.classList.remove('is-non-empty');
  })

  if (emptySearchReset) {
    emptySearchReset.addEventListener('click', (e) => {
      getFilterPartOfUrl();

      if (filterPartOfUrl === searchInput.value.toLowerCase()) {
        searchInput.value = '';
        searchParent.classList.remove('is-non-empty');
        searchParent.classList.remove('is-filled');
        form.dispatchEvent(new CustomEvent('searchChange'));
      } else {
        searchInput.value.length > 0 ? searchParent.classList.add('is-non-empty') : searchParent.classList.remove('is-non-empty');
        form.dispatchEvent(new CustomEvent('searchChange'));
      }
    });
  }

  form.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      searchInput.value.length > 0 ? searchParent.classList.add('is-non-empty') : searchParent.classList.remove('is-non-empty');
    }
  })
}

const searchField = () => {
  const searchParent = document.querySelector('[data-search-field]');

  try {
    if (!searchParent) {
      return;
    }

    const form = document.querySelector('[data-filter]');

    initSearchField(searchParent, form);

  } catch (e) {
    console.log('searchField error: ' + e);
  }
};

export {searchField, initSearchField};
