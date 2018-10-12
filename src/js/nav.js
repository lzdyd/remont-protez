/*
const getPathnameLastSectionHelper = url => url.match(/\/\w+/g).slice(-1)[0];
const getPathnameLastSection = url => url.includes('/') ? getPathnameLastSectionHelper(url) : null;

$(function() {
  const { pathname } = window.location;
  const mainNav = $('.main-nav .navbar-nav');

  mainNav.children().each(function() {
    getPathnameLastSection($(this).attr('href')) === getPathnameLastSection(pathname) ?
      $(this).addClass('active')
      : null;
  });
});
*/
