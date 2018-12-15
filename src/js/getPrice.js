$(function() {
  const getPrice = $('.main-content__get-price');
  const getPricePosition = $(getPrice).offset();

  const scrollGetPrice = (css = { width: '247px', 'margin-top': '10px' }) => {
    if($(window).scrollTop() > getPricePosition.top){
      $(getPrice).css('position','fixed').css({
        top: 0,
        ...css
      });
    } else {
      $(getPrice).css({
        position: 'static',
          ...css
      });
    }
  };

  scrollGetPrice();

  $(window).scroll(function(){
    scrollGetPrice();
  });
});
