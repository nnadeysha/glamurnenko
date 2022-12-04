import $ from 'jquery';
window.$ = $;

$(window).on('load scroll', function() { 
    if ($(this).scrollTop() >= '1') {
        $('.header__menu').css('background', 'black');
    } else {
        $('.header__menu').css('background', 'none');
    }
});