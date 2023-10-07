const showFilter = () => {
  const filterBtn = document.querySelector('[data-show-filter]');

  if (!filterBtn) {
    return;
  }
  const hiddenFilter = document.querySelector('[data-hidden-filter]');
  const submitBtn = hiddenFilter.querySelector('[type="submit"]');
  const resetBtn = hiddenFilter.querySelector('[type="reset"]');
  const breakpoint = window.matchMedia('(max-width:767px)');

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('[data-hidden-filter]')) {
      onButtonHandler();
    }
  };

  const onEscButtonPress = (evt) => {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';
    if (isEscKey) {
      onButtonHandler();
      filterBtn.blur();
    }
  };

  const onButtonHandler = () => {
    hiddenFilter.style.maxHeight = null;
    filterBtn.classList.remove('is-active');
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onEscButtonPress);
  };

  submitBtn.addEventListener('click', () => {
    setTimeout(() => {
      onButtonHandler();
    }, 500);
  });

  resetBtn.addEventListener('click', () => {
    resetBtn.classList.remove('is-active');
  });

  filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('is-active');
    if (filterBtn.classList.contains('is-active')) {
      if (!breakpoint.matches) {
        hiddenFilter.style.maxHeight = window.innerHeight + 'px';
      }
      hiddenFilter.focus();
      setTimeout(() => {
        document.addEventListener('click', onDocumentClick);
      }, 0);
      document.addEventListener('keydown', onEscButtonPress);
    } else {
      hiddenFilter.style.maxHeight = null;
    }
  });
};


export {showFilter};
