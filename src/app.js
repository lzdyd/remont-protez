if (module.hot) {
  module.hot.accept();
}

window.onload = () => {
  const headerBurgerIcon = document.querySelector('.main-header__burger');
  const headerMenu = document.querySelector('.main-header__menu');

  headerBurgerIcon.addEventListener('click', () => {
    headerMenu.classList.toggle('main-header__menu--active');
  });
};
