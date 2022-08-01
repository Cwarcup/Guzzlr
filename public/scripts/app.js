/* eslint-disable no-undef */
// Client facing scripts here

// doesnt work - Cannot use import statement outside a module
// import Cookies from 'js-cookie';

// require is not defined
// const Cookies = require('js-cookie');

let cartArr = [];

$(function () {


  // hide login HTML on load
  $('#login').hide();


  // login btn top right of main page
  $('.login').click((event) => {
    event.preventDefault();
    $('.header-welcome').hide();
    $('.main-container').children().hide();
    $('.menu-options-container').hide();
    $('.previous-orders-container').hide();
    $('#login').show();
    $('#login').append(`
        <h1>Login</h1>
        <form id="login-form">
          <div>
            <label for="email">Email address</label>
            <input name="email" placeholder="Ralph.Wong@gmail.com " id="login-email" value='Ralph.Wong@gmail.com'/>
          </div>
          <div>
            <label for="password">Password</label>
            <input name="password" placeholder="Password" id="login-password" />
          </div>
          <div>
            <button type="submit" class="login-btn">Login
            </button>
          </div>
        </form>

    `);
  });


  // listen for menu-item being clicked
  $('.menu-item').click(function (event) {
    // get id of closest div
    let id = $(event.target).closest('.menu-item').attr('id', '#done');
    // console.log(this.id);
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
        const restaurantName = `<h2 class="display-6 align-self-start rest-name">${menuItems[0].rest_name}</h2>`;
        $('.main-container').prepend(restaurantName);

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
            <p class="text-muted">${prevOrder.restaurant}</p>
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
    $.ajax({
      url: '/userCart',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        const cartData = data.userCart;

        $('.main-container').append(`

        <section class="h-100 h-custom" style="background-color: #eee;">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col">
              <div class="card">
                <div class="card-body p-4">
                  <div class="row">
                    <div class="col-lg-7">
                    <!-- order container -->
                      <h5 class="mb-3">
                        <a href="#!" class="text-body">
                          <i class="fas fa-long-arrow-alt-left me-2"></i>
                          Back to restaurant
                        </a>
                      </h5>
                      <hr>
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p class="mb-1">Current cart</p>
                        </div>
                      </div>
                      <!-- loop over this -->
                      <div class="card mb-3">
                        <div class="card-body">
                          <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                              <div>
                                <img src="https://picsum.photos/150/150?random=1" class="img-fluid rounded-3"
                                  alt="Shopping item" style="width: 65px;">
                              </div>
                              <div class="ms-3">
                                <h5>Food Name</h5>
                                <p class="small mb-0">Food details</p>
                              </div>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                              <div style="width: 50px;">
                                <h5 class="fw-normal mb-0">1</h5>
                              </div>
                              <div style="width: 80px;">
                                <h5 class="mb-0">$9</h5>
                              </div>
                              <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- TO THIS! -->


                      <!-- card details -->
                      </div>
                    <div class="col-lg-5">

                      <div class="card bg-primary text-white rounded-3">
                        <div class="card-body">
                          <div class="d-flex justify-content-between align-items-center mb-4">
                            <h5 class="mb-0">Card details</h5>
                          </div>

                          <p class="small mb-2">Card type</p>
                          <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-mastercard fa-2x me-2"></i></a>
                          <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-visa fa-2x me-2"></i></a>
                          <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-amex fa-2x me-2"></i></a>
                          <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-paypal fa-2x"></i></a>

                          <form class="mt-4">
                            <div class="form-outline form-white mb-4">
                              <input type="text" id="typeName" class="form-control form-control-lg" siez="17"
                                placeholder="Cardholder's Name" />
                              <label class="form-label" for="typeName">Cardholder's Name</label>
                            </div>

                            <div class="form-outline form-white mb-4">
                              <input type="text" id="typeText" class="form-control form-control-lg" siez="17"
                                placeholder="1234 5678 9012 3457" minlength="19" maxlength="19" />
                              <label class="form-label" for="typeText">Card Number</label>
                            </div>

                            <div class="row mb-4">
                              <div class="col-md-6">
                                <div class="form-outline form-white">
                                  <input type="text" id="typeExp" class="form-control form-control-lg" placeholder="MM/YYYY"
                                    size="7" id="exp" minlength="7" maxlength="7" />
                                  <label class="form-label" for="typeExp">Expiration</label>
                                </div>
                              </div>
                              <div class="col-md-6">
                                <div class="form-outline form-white">
                                  <input type="password" id="typeText" class="form-control form-control-lg"
                                    placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                                  <label class="form-label" for="typeText">Cvv</label>
                                </div>
                              </div>
                            </div>

                          </form>

                          <hr class="my-4">

                          <div class="d-flex justify-content-between">
                            <p class="mb-2">Subtotal</p>
                            <p class="mb-2">$9</p>
                          </div>

                          <div class="d-flex justify-content-between mb-4">
                            <p class="mb-2">Total(Incl. taxes)</p>
                            <p class="mb-2">$10</p>
                          </div>

                          <button type="button" class="btn btn-info btn-block btn-lg">
                            <div class="d-flex justify-content-between">
                              <span>$10</span>
                              <span>Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                            </div>
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        `);
      },
      error: (err) => {
        console.log(err);
      }
    });
  };

  // cart demo button in nav
  $('.cart-demo-btn').click((event) => {
    event.preventDefault();
    userCart();
    $('.main-container').children().hide();

    $(".menu-options-container").on("click", "a", function (event) {
      event.preventDefault();
      cartArr.push(Number(event['originalEvent']['path'][2]['id']));
      // console.log(`${event['originalEvent']['path'][2]['id']  } added to cart!`);
      // console.log('cartArr', cartArr);
    });
  });


  // function to run if user is logged in
  // Login btn to create a cookie when clicked
  $('#login').submit(function (event) {

    // gets the form data from userId field on login page
    const formData = {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    };

    event.preventDefault();

    $.ajax({
      url: 'http://localhost:8080/lookupAllLogins',
      method: 'POST',
      data: {
        email: `${formData.email}`,
        password: `${formData.password}`
      },
      success: (response) => {
        if (response.length > 0) {
          // create homepage according to user information
          console.log('response from database', response);
          createHomepageForUser(response[0]);
        } else {
          console.log('❌ ❌ user not found in database ❌ ❌ ');
        }
      }
    });
  });

  // // TODO: dont think we will need this. Conflicts with the proper login functionality
  // // login page
  // // login-btn renders users login page
  const createHomepageForUser = ((data) => {
    event.preventDefault();
    // add margin because we remove the main-container
    $('.main-container').css('margin-top', '100px');
    $('.menu-options-container').show();
    $('.previous-orders-container').show();
    $('#login').hide();
    $('.sign-up').hide();

    // change login btn htl
    $('.login').html(`Welcome back ${data.email}`);
  });





  // do not delete below this line


});
