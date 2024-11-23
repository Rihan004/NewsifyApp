$(document).ready(function(){
    $('.slider').slick({
        dots: true,  // Add navigation dots
        infinite: true,  // Loop through items
        speed: 500,  // Transition speed
        slidesToShow: 1,  // Show one slide at a time
        slidesToScroll: 1  // Scroll one slide at a time
    });
});