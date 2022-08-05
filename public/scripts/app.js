/* eslint-disable no-undef */
// Client facing scripts here





// array to add items into cart from main screen
let cartArr = [];
let currUserID;

$(function () {
  console.log('app.js is loaded');
  console.log("check check");


  // hide login HTML on load
  $('#login').hide();
  $('.main-container').children().hide();
  $('.h2.rest-name').hide();
  $('#register').hide();


  // click to go to mcdonalds
  $('.featured-restaurant').click((event) => {
    event.preventDefault();
    let restaurantID = event.originalEvent.path[1].id;
    restaurantID = restaurantID.substring(4,restaurantID.length);
    console.log(Number(restaurantID));
    getMenuItems(restaurantID);
    $('.treat-container').children().hide();
    $('.header-welcome').hide();
    $('.view-restaurant').show();
    $('.previous-orders-container').hide();


  });

  // login btn top right of main page
  // when clicked, user is presented with login container and can enter cradentials
  // cradentials currently hard coded
  // TODO: for presentation, remove hard coded email and password
  $('.login').click((event) => {
    event.preventDefault();
    // treat-container is the hardcoded cuisines and restaurants
    $('.treat-container').children().hide();
    $('.header-welcome').hide();
    $('.main-container').children().hide();
    $('.previous-orders-container').hide();
    $('#login').show();
    $('#login').html(`
        <form id="login-form">
          <div>
            <label for="email">Email address</label>
            <input name="email" placeholder="do_not_perceive_me@outlook.com" id="login-email" value='adamgrharvey@gmail.com'/>
          </div>
          <div>
            <label for="password">Password</label>
            <input name="password" placeholder="Password" id="login-password" value="a"/>
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
  });



  // render list of all menu items
  // load menu items from /homepageMenu
  // runs when main page is first loaded
  // adds menu items for restairant with ID of 1
  const getMenuItems = (restaurantID) => {
    $.ajax({
      url: '/homepageMenu',
      method: 'GET',
      dataType: 'json',
      data: {data: restaurantID},
      success: (response) => {
        console.log(response);
        const menuItems = response.menuItems;
        const restaurantName = `<h2 class="rest-name">${menuItems[0].rest_name}</h2>`;
        $('.restaurant-info-container').prepend(restaurantName);
        // this is fake hardcoded data
        const fakeRestaurantData = `
          <h3 class = "rest-cuisine">${menuItems[0].cuisine_type}</h3>
          <h3 class = "rest-street">${menuItems[0].street}</h3>
          <h3 class = "rest-phone">${menuItems[0].phone_number}</h3>
          <h3 class = "rest-hours">${menuItems[0].time_open} to ${menuItems[0].time_closes}</h3>
        `;
        $('.restaurant-info-container').prepend(fakeRestaurantData);


        // iterate through menuItems and append to DOM
        menuItems.forEach((menuItem) => {
          $('.menu-options-container').append(`
            <div id="${menuItem.id}" class="card">
              <div class="card-body">
                <div class="card-left">
                  <h5 class="card-title">${menuItem.name}</h5>
                  <p class="card-text">${menuItem.description}</p>
                </div>
                <div class="card-right">
                  <p class="card-text">$${menuItem.price / 100}</p>
                <button href="#" class="addToCart">Add to cart</a>
                </div>
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
  //getMenuItems();



  // GET to /userOrderHistory
  // takes in a user ID
  // returns previous orders of this user
  // used to append previous order container and items upon logging in
  const getUserOrderHistory = (userLoginData) => {
    $.ajax({
      url: '/userOrderHistory',
      method: 'get',
      dataType: 'json',
      data: {
        userId: userLoginData
      },
      success: (data) => {
        const userOrderHistory = data.userOrderHistory;

        $('.previous-orders-container').append(`<h2>Previous Orders</h2>`);
        $('.previous-orders-container').append(`<div class="previous-orders-list">`);
        //console.log(userOrderHistory);
        let prevOrders = {};
        for (const i of userOrderHistory) {
          if (!prevOrders[i.order_id]) {
            prevOrders[i.order_id] = [];
            prevOrders[i.order_id].push(i);
          } else {
            prevOrders[i.order_id].push(i);
          }

        }

        let keys = Object.keys(prevOrders);
        let orderStatus = "Order Placed";
        let orderFoodItem =
        {
          FoodName: "",
          quantity: 0,
          price: 0
        };
        let orderItems = [];
        let orderTotal = 0;
        let orderItemsString = "";
        for (const order of keys) {
          orderItems = [];
          orderItemsString = "";
          orderTotal = 0;
          for (let i = 0; i < prevOrders[order].length; i++) {
            orderFoodItem.FoodName = prevOrders[order][i].name;
            orderFoodItem.quantity = prevOrders[order][i].count;
            orderFoodItem.price = prevOrders[order][i].price * orderFoodItem.quantity;
            orderItems.push(orderFoodItem);
            orderFoodItem = {
              FoodName: "",
              quantity: 0,
              price: 0
            };
          }

          for (let j = 0; j < orderItems.length; j++) {
            orderTotal += (orderItems[j].price);
            orderItemsString += `${orderItems[j].quantity} x ${orderItems[j].FoodName}`;
            orderItemsString += `\n`;
          };

          if (prevOrders[order][0].order_started) {
            orderStatus = `Order being prepared.\nOrder pickup time: ${prevOrders[order][0].pickup_time}`
          }
          if (prevOrders[order][0].order_completed) {
            orderStatus = "Order Completed."
          }
          $('.previous-orders-list').append(`
          <div class="outerPrevOrder">
            <div class="prevOrderRest">
            <img src="https://picsum.photos/150/150?random=1" class="img-fluid rounded-3"
            alt="Shopping item" style="width: 65px;">
              <p><strong>${prevOrders[order][0].restaurant}</strong></p>
              <p>${prevOrders[order][0].street}</p>
            </div>
            <div class="prevOrderDetails">
              <p><strong>${orderStatus}</strong>
              </p>
              <p>
              <strong>$${addZeroes(orderTotal / 100 * 1.12) }</strong>
              </p>
            </div>
            <div class="prevOrderFoods">
            <span>${orderItemsString}</span>
            </div>
          </div>
        `);
        }

      },
      error: (err) => {
        console.log("Error at getUserOrderHistory", err);
      }
    });
  };


  // @Adam: renders this on the homepage at the moment
  // display cart items for logged in user

  const addZeroes = function (num) {
    return num.toFixed(2);
  };

  // display cart items for logged in user
  const userCart = () => {
    console.log('userCart has run');
    let cartTop = `

    <section class="shopping-cart">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card">
            <div class="card-body" style="width:700px;">
              <div class="row">
                <div class="col-lg-7">
                <!-- order container -->
                  <h5 class="mb-3">
                    <a href="#!" class="text-body" style="color:yellow; text-transform-capitalize; letter-spacing: 5px;">
                      <i class="fas fa-long-arrow-alt-left me-2"></i>
                      Back to restaurant
                    </a>
                  </h5>
                  <hr>
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h1 style="margin:50px 0px 10px; padding:0;">Current Cart</h1>
                    </div>
                  </div>
                  <div class="card mb-3">
                  `;

    $.ajax({
      url: '/menuItems',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        console.log(data);
        let cartCopy = cartArr.map(x => x);
        cartCopy.sort();
        const menuItemData = data.menuItems;
        let cartItem = `\n`;
        let cartTotal = 0;
        const count = {};


        for (let index = 0; index < cartArr.length; index++) {
          const element = cartCopy[index];

          if (count[element]) {
            count[element] += 1;
          } else {
            count[element] = 1;
          }
        }
        cartCopy = [...new Set(cartArr)];

        if (cartCopy.length > 0) {
          for (let i of cartCopy) {

            cartTotal += count[i] * menuItemData[i - 1].price;
            cartItem += `<div id="cartItem_${i}" class="card-body">
              <div class="d-flex justify-content-between">
                <div class="card-body" style="width: 800px;">
                  <div class="card-left">
                    <h5 class = "card-title">${menuItemData[i - 1].name}</h5>
                    <p class="card-text">${menuItemData[i - 1].description}</p>
                  </div>

                <div class="card-right">
                  <div style="width: 50px;">
                    <h5 class="fw-normal mb-0">${count[i]}</h5>
                  </div>
                  <div style="width: 80px;">
                    <h5 class="mb-0">$${addZeroes(count[i] * menuItemData[i - 1].price / 100)}</h5>
                  </div>
                  <button href="#!" style="color: #cecece; padding-top:18px;"><i class="fas fa-trash-alt"></i></button>

                  </div>
                </div>
              </div>
            </div>\n`;
          }
        }

        let cartBottom = `
        </div>
      <!-- card details -->
      </div>
    <div class="col-lg-5">

      <div class="card bg-primary text-white rounded-3">
      <hr>
        <div class="payment-area">

          <div class = "credit-card-details">
            <h3 style="color:yellow; font-size:36px; margin-bottom:10px;">Payment Information</h3>
            <h3 style="margin-bottom:10px">Card type</h3>
            <div class = "credit-card-type">
              <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-mastercard fa-2x me-2" style="color:#F1EAD4"></i></a>
              <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-visa fa-2x me-2" style="color:#F1EAD4"></i></a>
              <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-amex fa-2x me-2" style="color:#F1EAD4"></i></a>
              <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-paypal fa-2x" style="color:#F1EAD4"></i></a>
            </div>

            <form class="mt-4">
              <div class="form-outline form-white mb-4">
              <label class="form-label" for="typeName">Cardholder's Name</label>
                <input type="text" id="typeName" class="form-control form-control-lg" size="17"
                  placeholder="Cardholder's Name" />
              </div>

              <div class="form-outline form-white mb-4">
              <label class="form-label" for="typeText">Card Number</label>
                <input type="text" class="typeText form-control form-control-lg" siez="17"
                  placeholder="1234 5678 9012 3457" minlength="19" maxlength="19" />
              </div>

              <div class="row mb-4">
                <div class="col-md-6">
                  <div class="form-outline form-white">
                  <label class="form-label" for="typeExp">Expiration</label>
                    <input type="text" id="typeExp" class="form-control form-control-lg" placeholder="MM/YYYY"
                      size="7" id="exp" minlength="7" maxlength="7" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-outline form-white">
                  <label class="form-label" for="typeText">Cvv</label>
                    <input type="password" class="typeText form-control form-control-lg"
                      placeholder="&#9679;&#9679;&#9679;" size="5" minlength="3" maxlength="3" />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class = "cart-right">
            <div class="payment-subtotal">
              <p>Subtotal</p>
              <p>$${addZeroes(cartTotal / 100)}</p>
            </div>

            <div class="payment-total">
              <p>Total(Incl. taxes)</p>
              <p >$${addZeroes(cartTotal / 100 * 1.12)}</p>
            </div>

            <button type="button" class="big-checkout-btn">
              <H3>
                <span>&nbsp;Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
              </H3>
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
</div>
</section>
      `;
        if (cartArr.length > 0) {
          $('.main-container').append(cartTop + cartItem + cartBottom);
        } else {
          $('.main-container').append(cartTop + cartBottom);
        }

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
    $('.treat-container').children().hide();
    $('.main-container').children().hide();

  });



  //////// FROM HERE

  // submits email and password from login screen
  // renders unique homepage with previous order using renderOwnerDashboard()
  // #login is the button only visible AFTER a user clicked the login link in navbar
  $('#login').submit(function (event) {
    event.preventDefault();

    // gets the form data from userId field on login page
    const formData = {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    };

    $.ajax({
      url: 'http://localhost:8080/lookupAllLogins',
      method: 'POST',
      data: {
        email: `${formData.email}`,
        password: `${formData.password}`
      },
      success: (response) => {

        if (response.length > 0) {
          currUserID = response[0].id;

          // create homepage according to user information
          if (response[0].id === 3) {

            // load owner dashboard after login
            renderOwnerDashboard(response[0]);

            // !! this is the listener for all buttons in the admin page
            setTimeout(() => {
              // incoming orders SUBMIT FORM
              // this section attaches listeners to each order in the admin page
              // must be attached here because we need renderOwnerDashboard(response[0]); to finish rendering the pending/current orders first
              $(".single-incoming-order-form").each(function () {
                console.log("listener attached to single-incoming-order-form");
                $(this).submit(function (event) {
                  event.preventDefault();
                  console.log("listener attached to ", $(this).attr('id'));

                  // clear the containers if anything in already in them
                  $('.owner-dashboard-container').empty();
                  $('.owner-current-orders').empty();

                  const time = $(this).find('input[name="etaTime"]').val(); // gets the time from the Pending orders form
                  const confirmOrder = $(this).find('input[name="acceptOrDecline"]:checked').val(); // gets valuer from radio btn in order from Pending orders form

                  // request to update order status (accepted or declined) and update time if accepted
                  $.ajax({
                    url: `http://localhost:8080/confirmOrder/${$(this).attr('id')}`,
                    method: 'POST',
                    data: {
                      time: time,
                      confirmOrder: confirmOrder,
                    },
                    success: (data) => {
                      // !! reload page to show updated order
                      $('.owner-dashboard-container').empty();
                      $('.owner-current-orders').empty();
                      runLoginAgain();
                    }
                  });
                });
              });

              // current orders SUBMIT FORM
              $(".current-order-form").each(function () {
                $(this).submit(function (event) {
                  event.preventDefault();

                  // clear the containers if anything in already in them
                  $('.owner-dashboard-container').empty();
                  $('.owner-current-orders').empty();

                  // updates `oders` table to set order_completed to now()
                  $.ajax({
                    url: `http://localhost:8080/orderRFP/${$(this).attr('id')}`,
                    method: 'POST',
                    success: () => {
                      // !! reload page to show updated order
                      $('.owner-dashboard-container').empty();
                      $('.owner-current-orders').empty();

                      // !! test out to render owner page
                      renderOwnerDashboard(response[0]);

                      // TODO: At the moment, this works if one button is clicked. Page will "refresh". But second click sends user back to homepage.
                    }
                  });
                });
              });

            } , 100);
            return;
          } else {
            $('.treat-container').children().show();
            $('.main-container').children().show();
          }


          // if user is a customer, NOT an owner
          createHomepageForUser(response[0]);
        } else {

          // if user is not found in database, show error message
          console.log('❌ ❌ user not found in database ❌ ❌ ');
        }
      }
    });
  });



  // use to render homepage for user if logged in successfully
  const createHomepageForUser = ((data) => {
    // DOM already has restaurant name and food items. We just need to show them.
    $('.main-container').children().show();
    $('#login').hide();   // hide login button in nav
    $('.sign-up').hide(); // hide sign up button in nav
    $('.login').hide();   // hide children in login container
    $('.register-container').hide(); // hide children in register container');
    $('.nav-links').append(`<a>Welcome, ${data.name}</a>`); // display user name in nav
    $('.nav-links').append(`<a class="nav-link" href="/" id="logout-btn">Logout</a>`); // add button to logout on navbar

    getUserOrderHistory(data.id); // run function with the user's id to get order history and display it on main page
  });

  const runLoginAgain = () => {
    $.ajax({
      url: 'http://localhost:8080/lookupAllLogins',
      method: 'POST',
      data: {
        email: `adam@gmail.com`,
        password: `1234`
      },
      success: (response) => {
        // load owner dashboard after login
        renderOwnerDashboard(response[0]);

        // !! this is the listener for all buttons in the admin page
        setTimeout(() => {
          // incoming orders SUBMIT FORM
          // this section attaches listeners to each order in the admin page
          // must be attached here because we need renderOwnerDashboard(response[0]); to finish rendering the pending/current orders first
          $(".single-incoming-order-form").each(function () {
            console.log("listener attached to single-incoming-order-form");
            $(this).submit(function (event) {
              event.preventDefault();
              console.log("listener attached to ", $(this).attr('id'));

              // clear the containers if anything in already in them
              $('.owner-dashboard-container').empty();
              $('.owner-current-orders').empty();

              const time = $(this).find('input[name="etaTime"]').val(); // gets the time from the Pending orders form
              const confirmOrder = $(this).find('input[name="acceptOrDecline"]:checked').val(); // gets valuer from radio btn in order from Pending orders form

              // request to update order status (accepted or declined) and update time if accepted
              $.ajax({
                url: `http://localhost:8080/confirmOrder/${$(this).attr('id')}`,
                method: 'POST',
                data: {
                  time: time,
                  confirmOrder: confirmOrder,
                },
                success: (data) => {
                  // !! reload page to show updated order
                  $('.owner-dashboard-container').empty();
                  $('.owner-current-orders').empty();
                  renderOwnerDashboard(response[0]);
                }
              });
            });
          });

          // current orders SUBMIT FORM
          $(".current-order-form").each(function () {
            $(this).submit(function (event) {
              event.preventDefault();

              // clear the containers if anything in already in them
              $('.owner-dashboard-container').empty();
              $('.owner-current-orders').empty();

              // updates `oders` table to set order_completed to now()
              $.ajax({
                url: `http://localhost:8080/orderRFP/${$(this).attr('id')}`,
                method: 'POST',
                success: () => {
                  // !! reload page to show updated order
                  $('.owner-dashboard-container').empty();
                  $('.owner-current-orders').empty();

                  // !! test out to render owner page
                  renderOwnerDashboard(response[0]);

                  // TODO: At the moment, this works if one button is clicked. Page will "refresh". But second click sends user back to homepage.
                }
              });
            });
          });
        } , 100);
        return;
      }
    });
  };




  // !! do not delete below this line
});
