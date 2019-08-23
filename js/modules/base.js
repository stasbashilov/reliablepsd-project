$(document).ready(function() {
    $('.menu-trigger').click(function() {
      $('nav ul').slideToggle(500);
    });//end slide toggle
    
    $(window).resize(function() {		
          if (  $(window).width() > 500 ) {			
              $('nav ul').removeAttr('style');
           }
      });//end resize

    $('.image-slider').slick({
        arrows : false,
        dots: false,
        infinite: true,
        autoplay: true,
        centerMode: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

  });//end ready
