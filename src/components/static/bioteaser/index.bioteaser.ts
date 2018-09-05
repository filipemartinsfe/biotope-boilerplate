{($)
  setTimeout(function(){

    $('.teaser__text').each(function(){
      if($(this).height() >= 128){
        $(this).addClass('teaser__text--overflowed');
      } else {
        $(this).removeClass('teaser__text--overflowed');
      }
    });
  });
    
}(jQuery);
