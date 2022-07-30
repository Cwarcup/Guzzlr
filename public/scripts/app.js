/* eslint-disable no-undef */
// Client facing scripts here
$(function () {
  
  // hide login HTML on load
  $('#login').hide();


  // login btn top right of main page
  $('.login').click((event) => {
    event.preventDefault();
    $('.header-welcome').hide();
    $('.menu-options-container').hide();
    $('.previous-orders-container').hide();
    $('#login').show();
  });

  // login page
  // login-btn renders users login page
  $('.login-btn').click((event) => {
    event.preventDefault();
    // add margin because we remove the main-container
    $('.main-container').css('margin-top', '100px');

    $('.menu-options-container').show();
    $('.previous-orders-container').show();
    $('#login').hide();
    $('.sign-up').hide();

    // change login btn htl
    $('.login').html('Logout');
  });




  // listen for menu-item being clicked
  $('.menu-item').click(function (event) {
    // get id of closest div
    let id = $(event.target).closest('.menu-item').attr('id');
    // console.log(id);
  });






  // do not delete below this line
});



