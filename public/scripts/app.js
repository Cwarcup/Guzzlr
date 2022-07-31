/* eslint-disable no-undef */
// Client facing scripts here
let cartArr = [];
$(function () {

  // hide login HTML on load
  // $('#login').hide();


  // login btn top right of main page
  $('.login').click((event) => {
    event.preventDefault();
    $('.header-welcome').hide();
    $('.menu-options-container').hide();
    $('.previous-orders-container').hide();
    $('#login').append(`
        <h1>Login</h1>
        <div>
          <div class="">
            <label class="" for="email">Email address</label>
            <input name="email" type="email" class="" placeholder="Enter email" id="email" />
          </div>
          <div class="">
            <label class="" for="password">Password</label>
            <input name="password" type="password" class="" placeholder="Password" id="password" />
          </div>
          <div class="">
            <button type="submit" class="login-btn">Login
            </button>
          </div>
        </div>

    `);
  });


  // login page
  // login-btn renders users login page
  $('#login').click('.login-btn', (event) => {
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
    let id = $(event.target).closest('.menu-item').attr('id', '#done');
    console.log(this.id);
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
            <div id="${menuItem.id}" class="card" style="width: 12rem;">
              <img src="https://picsum.photos/150/150?random=${Math.floor(Math.random() * 100)}" class="card-img-top" alt="...">
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
        userOrderHistory.forEach((prevOrder) => {
          $('.previous-orders-container').append(`
          <div class="card" style="width: 12rem;">
          <img src="https://picsum.photos/150/150?random=${Math.floor(Math.random() * 100)}" class="card-img-top" alt="${prevOrder.name}">
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


  // @Adam: renders this on the homepage at the moment
  // display cart items for logged in user
  const userCart = () => {
    console.log('userCart has run');
    $.ajax({
      url: '/userCart',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        const userCart = data.userCart;
        console.log('userCart', userCart);

      }
    });
  };

  userCart();



  $(".menu-options-container").on("click", "a", function (event) {
    event.preventDefault();
    cartArr.push(Number(event['originalEvent']['path'][2]['id']));
    console.log(event['originalEvent']['path'][2]['id'] + ' added to cart!');
    console.log('cartArr', cartArr);
  });




  // do not delete below this line
});



