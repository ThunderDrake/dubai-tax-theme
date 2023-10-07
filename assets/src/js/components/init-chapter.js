import GraphTabs from 'graph-tabs';

if(window.matchMedia("(min-width:769px)").matches) {
  if(document.querySelector("[data-tabs='tab']")) {
    const tabs = new GraphTabs('tab');
  }
} else {
  const buttons = document.querySelectorAll('.documents__tabs-button');
  const panels = document.querySelectorAll('.tabs__panel');
  const tabsBlock = document.querySelector('.tabs__content');

  if(buttons.length > 0) {
    buttons.forEach((el, i) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        if(el.classList.contains('active-button')) {
          el.classList.remove('active-button');
          tabsBlock.classList.remove('is-show');
          panels[i].classList.remove('is-show')
        } else {
          el.classList.add('active-button');
          tabsBlock.classList.add('is-show');
          panels.forEach(el=>{
            el.classList.remove('is-show');
          });
          panels[i].classList.add('is-show')
        }
      });
    })
  }
}

const initChapter = () => {
  const chapterExpanded = document.querySelectorAll('[data-expanded]');
  if(chapterExpanded.length < 1) {
    return
  }

  chapterExpanded.forEach(el=>{
    const button = el.querySelector('.chapter-item__title');

    button.addEventListener('click', (e)=>{
      e.preventDefault();
      el.classList.toggle('is-open');
    })
  });

  const currentItem = document.querySelector('.chapter-item--current');
  if(currentItem) {
    currentItem.closest('[data-expanded]').classList.add('is-open');
  }
}

export {initChapter}
