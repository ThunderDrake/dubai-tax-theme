let forms = [];

export class FetchMore {
  constructor() {
    this.listSelector = null;
    this.itemSelector = null;
    this.moreSelector = null;
    this.formSelector = null;
    this.sortByDateSelector = null;
    this.searchSelector = null;
    this.list = null;
    this.btnMore = null;
    this.btnReset = null;
    this.form = null;
    this.baseUrlRequest = null;
    this.parentSubmit = null;
    this.searchField = null;
    this.sortByDate = null;
    this.submitBtn = null;

    this._handleMoreClick = this._handleMoreClick.bind(this);
  }

  init(initListSelector, initItemSelector, initMoreSelector, initFormSelector, sortByDateSelector, searchSelector) {
    this.listSelector = initListSelector;
    this.itemSelector = initItemSelector;
    this.moreSelector = initMoreSelector;
    this.formSelector = initFormSelector;
    this.searchSelector = searchSelector;
    this.sortByDateSelector = sortByDateSelector;

    this._getCurrentList();

    if (!this.list) {
      return;
    }

    if (this.sortByDateSelector) {
      this.sortByDate = document.querySelector(sortByDateSelector);
    }

    if (this.searchSelector) {
      this.searchField = document.querySelector(searchSelector);
    }

    this._addButtonEvent();
    this._addSubmitEvent();
  }

  _getCurrentList() {
    this.list = document.querySelector(this.listSelector);
  }

  _getCurrentBtnMore() {
    if (!this.moreSelector) {
      return;
    }

    this.btnMore = document.querySelector(this.moreSelector);
  }

  _getCurrentForm() {
    if (!forms.includes(document.querySelector(this.formSelector))) {
      this.form = document.querySelector(this.formSelector);
      this.btnReset = this.form.querySelector('[type="reset"]');
      this.baseUrlRequest = this.form.action;
      forms.push(this.form);
    }
  }

  _addButtonEvent() {
    this._getCurrentBtnMore();

    if (!this.btnMore) {
      return;
    }

    this.btnMore.addEventListener('click', this._handleMoreClick);
  }

  _addSubmitEvent() {
    this._getCurrentForm();

    if (!this.form) {
      return;
    }

    this.submitBtn = this.form.querySelector('[type="submit"]');

    this.form.addEventListener('change', (evt) => {
      if (evt.target === this.form) {
        setTimeout(() => {
          const filterParams = this._getParams();
          this._updateURL(filterParams);
        }, 300);
      }
    });

    this.form.addEventListener('reset', (evt) => {
      console.log(evt)
      if (this.searchField) {
        this.searchField.value = '';
        this.searchField.setAttribute('value', '');
        this.searchField.closest('[data-search-field]').classList.remove('is-non-empty');
        this.searchField.closest('[data-search-field]').classList.remove('is-filled');
      }
      if (evt.target === this.form) {
        setTimeout(() => {
          this._getFilteredData(evt);
        }, 300);
      }
    });

    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (evt.explicitOriginalTarget === this.submitBtn || evt.target === this.submitBtn) {
          setTimeout(() => {
            this._getFilteredData(evt)
          }, 300);
        }
      });
    }

    this.form.addEventListener('sortChange', (evt) => {
      evt.preventDefault();
      setTimeout(() => {
        const filterParams = this._getParams();
        this._updateURL(filterParams);

        this._getFilteredData(evt);
      }, 300);
    });

    this.form.addEventListener('searchChange', (evt) => {
      evt.preventDefault();
      if (evt.target === this.form) {
        setTimeout(() => {
          this._getFilteredData(evt, true)
        }, 300);
      }
    });

    this.form.addEventListener('yearsChange', (evt) => {
      evt.preventDefault();
      if (evt.target === this.form) {
        setTimeout(() => {
          this._getFilteredData(evt, true)
        }, 300);
      }
    });

    this.form.addEventListener('markerChange', (evt) => {
      evt.preventDefault();
      if (evt.target === this.form) {
        [...this.form.querySelectorAll(
          'input[data-select-search], input[data-filter-sort-by-date]'),
          document.querySelector('[data-no-results-search] input'),
          ...this.form.querySelectorAll('[data-filter-checkbox]')
        ].forEach(el => {
          if (el) {
            if (el.checked) {
              el.checked = false;
            } else {
              el.value = '';
            }
          }
        })
        setTimeout(() => {
          this._getFilteredData(evt, true, evt.detail);
        }, 300);
      }
    });

    this.form.addEventListener('paginationClicked', (evt) => {
      evt.preventDefault();

      if (evt.target === this.form) {
        setTimeout(() => {
          let url = evt.detail.page;

          if (url) {
            if (history.pushState) {
              history.pushState(null, null, url);
            }

            fetch(`${url}`, {method: 'get'})
              .then((response) => response.text())
              .then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                this._addListItem(doc, true);
              })
              .then(() => {
                const adminTop = document.querySelector('#wpadminbar')?.getBoundingClientRect()?.height ?? 0; // WP
                const headerTop = document.querySelector('header.header')?.getBoundingClientRect()?.height ?? 0;
                const listTop = document.querySelector(this.formSelector)?.getBoundingClientRect()?.top ?? 0;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const offset = listTop + scrollTop - adminTop - headerTop;

                window.scrollTo({
                  top: offset,
                  behavior: "smooth"
                })
              })
              // eslint-disable-next-line no-console
              .catch((err) => console.log('Ошибка загрузки данных новостей: ', err));
          }
        }, 300);
      }
    });
  }

  _removeButtonEvent() {
    if (!this.btnMore) {
      return;
    }

    this.btnMore.removeEventListener('click', this._handleMoreClick);
  }

  _addListItem(page, reset = false) {
    const items = [...page.querySelectorAll(this.itemSelector)];
    const newBtnMore = page.querySelector(this.moreSelector);
    const oldPagination = document.querySelector('.pagination');
    const newPagination = page.querySelector('.pagination');

    if (!items) {
      return;
    }

    if (reset) {
      const newList = page.querySelector(this.listSelector);

      if (newList) {
        const parent = this.list.parentNode;
        parent.replaceChild(newList, this.list);
        this._getCurrentList();
        this._getCurrentBtnMore();
      }
    } else {
      items.forEach((item) => this.list.append(item));
    }

    if (newBtnMore) {
      if (this.btnMore) {
        this.parentSubmit = this.btnMore.parentNode;
        this._removeButtonEvent();
        this.parentSubmit.replaceChild(newBtnMore, this.btnMore);
      } else {
        if (this.parentSubmit) {
          this.parentSubmit.append(newBtnMore);
        }
      }
      this._addButtonEvent();
    } else {
      if(this.btnMore) {
        this._removeButtonEvent();
        this.btnMore.remove();
        this.btnMore = null;
      }
    }

    if (newPagination) {
      if (oldPagination) {
        const paginationParent = oldPagination.parentNode;
        paginationParent.replaceChild(newPagination, oldPagination);
      }
    } else if (oldPagination) {
      oldPagination.remove();
    }

    window.dispatchEvent(new CustomEvent('contentUpdated'));
  }

  _handleMoreClick(evt) {
    const target = evt.target;
    let url = target.dataset.url;

    if (this.form) {
      url = target.dataset.url + this._getParams(false);
    }

    if (!url) {
      return;
    }

    fetch(`${url}`, {method: 'GET'})
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        this._addListItem(doc, false);
        // const doc = parser.parseFromString(JSON.parse(html).data, 'text/html'); // for test with json-server
        // this._addListItem(doc.body, false); // for test with json-server
      })
      .catch((err) => {
        throw err;
      });
  }

  _updateURL(params) {
    if (!history.pushState) {
      return;
    }

    const newUrl = this.baseUrlRequest + params;

    history.pushState(null, null, newUrl);
  }

  _getParams(reset, additionalParams) {
    let data = {};

    const years = document.querySelector('[data-ajax-year].is-active') ? document.querySelector('[data-ajax-year].is-active') : '';

    if (!reset) {
      const checkedCheckboxes = [...document.querySelectorAll('input[data-filter-checkbox]:checked')].filter(el => !el.closest('[data-accordion-inputs]'));
      const accordionCheckboxes = [...document.querySelectorAll('[data-accordion-inputs]')];
      let checkedAccordionCheckboxes = [];

      accordionCheckboxes.forEach(group => {
        const checkedMain = group.querySelector('[data-accordion-inputs-main] input:checked');
        const checkedSecondary = group.querySelectorAll('[data-accordion-inputs-secondary] input:checked');
        if (checkedMain) {
          checkedAccordionCheckboxes.push(checkedMain);
        } else if (checkedSecondary.length) {
          checkedAccordionCheckboxes.push(...checkedSecondary);
        }
      });

      [...this.form.querySelectorAll(
        'input[data-select-search], input[data-filter-sort-by-date]'),
        document.querySelector('[data-no-results-search] input'),
        ...checkedCheckboxes,
        ...checkedAccordionCheckboxes
      ]
        // .filter((item) => item.value ? item.value : item.dataset.selectValue)
        .forEach((item) => {
          if (item && item.dataset) {
            if (item.dataset.selectSearch && item.value.length > 0) {
              data[item.name] = item.value;
            } else if (item.dataset.filterCheckbox) {
              if(data[item.name]) {
                data[item.name] = data[item.name] + ',' + item.dataset.filterCheckbox.toString();
              } else {
                data[item.name] = item.dataset.filterCheckbox.toString();
              }
            } else if (item.dataset.filterSortByDate && item.checked) {
              data[item.name] = item.value;
            }
          }
        });

    if (years) {
        data['year'] = years.dataset.ajaxYear;
      }

    if (additionalParams) {
      data = {
        ...data,
        ...additionalParams
      }
    }

    } else {
      this.form.querySelectorAll('input[type="checkbox"]').forEach(function (node) {
        node.checked = false;
      });
    }

    return Object.keys(data).length > 0 ? `?${(new URLSearchParams(data)).toString().replace(/%2C/g,",")}` : '';
  }

  _getFilteredData(evt, _, additionalParams) {
    evt.preventDefault();
    const isBntReset = evt.type === 'reset';

    const filterParams = this._getParams(isBntReset, additionalParams);

    this._updateURL(filterParams);

    let url = window.location.href;
    //     const url = 'http://localhost:3003/events0/6'; // for test with json-server

    // if (url.indexOf('?') >= 0) {
    //   url = this.form.action; // TEMP!! For TEST!
    // }

    if (url) {
      fetch(`${url}`, {method: 'get'})
        .then((response) => response.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          // const doc = parser.parseFromString(JSON.parse(html).data, 'text/html'); // for test with json-server
          // this._addListItem(doc.body, true); // for test with json-server
          this._addListItem(doc, true);
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log('Ошибка загрузки данных новостей: ', err));
    }
  }
}
