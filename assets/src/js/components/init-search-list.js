const searchForm = document.querySelector('.search-panel form');

const initSearchForm = () => {
  if(!searchForm) {
    return
  }

  searchForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();

    let url = searchForm.action;
    let searchValue = searchForm.querySelector('input[type=search]').value;
    let totalUrl = `${url}&search=${searchValue}`;
    const searchResultList = document.querySelector('.search-panel__result-list .simplebar-content')

    fetch(totalUrl, {method: 'get'})
    .then((response) => response.json())
    .then((data) => {
      let itemUrl;
      let itemTitle;
      let result = [];
      searchResultList.innerHTML = "";
      console.log(data);
      if(data.length > 0) {
        Object.entries(data).forEach((el)=>{
          itemUrl = el[1].link;
          itemTitle = el[1].title['rendered'];
          searchResultList.insertAdjacentHTML('afterbegin', `
          <li class="search-panel__result-item">
            <a class="search-panel__result-link" href="${itemUrl}">
              <div class="chapter-item__title">
                <svg class="chapter-item__icon" width="20" height="20">
                  <use xlink:href="https://tp-axelot.edit/wp-content/themes/tp-axelot-theme/assets/build/img/sprite.svg#docs">
                  </use>
                </svg>
                ${itemTitle}
              </div>
            </a>
          </li>
          `);
        });
      } else {
        searchResultList.insertAdjacentHTML('afterbegin', `
          <li class="search-panel__result-item">
            Простите, такого результата нет
          </li>
          `);
      }


    })
    .catch((err) => console.log('Ошибка загрузки данных новостей: ', err));
  })
}

export {initSearchForm}
