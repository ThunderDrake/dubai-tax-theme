export const getHeaderHeight = () => {
  const headerHeight = document?.querySelector('.site-header').offsetHeight;
  document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);
}
