import $ from 'jquery';

console.log('box')

//photobox__list-item

$('.photobox li.photobox__list-item').on('click', function(){
    $('.photobox__list-item').removeClass('active');
    $(this).toggleClass('active');
})