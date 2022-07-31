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

  // render list of all menu items


  // load menu items from /api/homepageMenu
  // returns an
  const getMenuItems = () => {
    $.ajax({
      url: '/homepageMenu',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        const menuItems = data.menuItems;
        // iterate through menuItems and append to DOM
        menuItems.forEach((menuItem) => {
          $('.menu-options-container').append(`
            <div class="card" style="width: 12rem;">
              <img src="https://picsum.photos/150/150?random=${menuItem.id}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${menuItem.name}</h5>
                <p class="card-text">${menuItem.description}</p>
                <p class="card-text">$${menuItem.price / 100}</p>
                <a href="#" class="btn btn-primary">Add to cart</a>
              </div>
            </div>
          `);
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  };

  getMenuItems();


  // load previous orders from /api/userOrderHistory
  // only if a user is logged in
  const getUserOrderHistory = () => {
    console.log('getUserOrderHistory has run');
    $.ajax({
      url: '/userOrderHistory',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        const userOrderHistory = data.userOrderHistory;
        console.log('userOrderHistory', userOrderHistory);
        // iterate through userOrderHistory and append to DOM
        userOrderHistory.forEach((prevOrder) => {
          $('.previous-orders-container').append(`
          <div class="card" style="width: 12rem;">
          <img src="https://picsum.photos/150/150?random=${prevOrder.order_id}" class="card-img-top" alt="${prevOrder.name}">
          <div class="card-body">
            <h5 class="card-title">${prevOrder.name}</h5>
            <p class="card-text">$${prevOrder.price / 100}</p>
            <a href="#" class="btn btn-primary">Add to cart</a>
          </div>
        </div>
        `);
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  };
  getUserOrderHistory();


    







  // do not delete below this line
});



