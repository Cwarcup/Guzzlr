/* eslint-disable no-undef */
// Client facing scripts here





// array to add items into cart from main screen
let cartArr = [];
let currUserID;

$(function () {
  console.log('app.js is loaded');


  // hide login HTML on load
  $('#login').hide();
  $('#register').hide();


  // login btn top right of main page
  // when clicked, user is presented with login container and can enter cradentials
  // cradentials currently hard coded
  // TODO: for presentation, remove hard coded email and password
  $('.login').click((event) => {
    event.preventDefault();
    $('.header-welcome').hide();
    $('.main-container').children().hide();
    $('.menu-options-container').hide();
    $('.previous-orders-container').hide();
    $('#login').show();
    $('#login').html(`
        <h1>Login</h1>
        <form id="login-form">
          <div>
            <label for="email">Email address</label>
            <input name="email" placeholder="do_not_perceive_me@outlook.com" id="login-email" value='AdamRoxx97@gmail.com'/>
          </div>
          <div>
            <label for="password">Password</label>
            <input name="password" placeholder="Password" id="login-password" value="1234"/>
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
                <a href="#" class="addToCart btn btn-primary">Add to cart</a>
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

        userOrderHistory.forEach((prevOrder) => {
          $('.previous-orders-list').append(`
          <div id="${prevOrder.id}" class="card" style="width: 12rem;">
            <img src="https://picsum.photos/150/150?random" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${prevOrder.name}</h5>
                <p class="card-text">${prevOrder.description}</p>
              <p class="card-text">$${prevOrder.price / 100}</p>
              <a href="#" class="btn btn-primary">Add to cart</a>
            </div>
          </div>
        `);
        });
      },
      error: (err) => {
        console.log("error bro:");
        console.log(err);
      }
    });
  };
  // getUserOrderHistory();

  // @Adam: renders this on the homepage at the moment
  // display cart items for logged in user

  const addZeroes = function (num) {
    return num.toFixed(2);
  };

  // display cart items for logged in user
  const userCart = () => {
    console.log('userCart has run');
    let cartTop = `

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
                  <div class="card mb-3">
                  `;

    $.ajax({
      url: '/menuItems',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
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
                <div class="d-flex flex-row align-items-center">
                  <div>
                    <img src="https://picsum.photos/150/150?random=1" class="img-fluid rounded-3"
                      alt="Shopping item" style="width: 65px;">
                  </div>
                  <div class="ms-3">
                    <h5>${menuItemData[i - 1].name}</h5>
                    <p class="small mb-0">${menuItemData[i - 1].description}</p>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center">
                  <div style="width: 50px;">
                    <h5 class="fw-normal mb-0">${count[i]}</h5>
                  </div>
                  <div style="width: 80px;">
                    <h5 class="mb-0">$${addZeroes(count[i] * menuItemData[i - 1].price / 100)}</h5>
                  </div>
                  <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
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
              <input type="text" class="typeText form-control form-control-lg" siez="17"
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
                  <input type="password" class="typeText form-control form-control-lg"
                    placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                  <label class="form-label" for="typeText">Cvv</label>
                </div>
              </div>
            </div>
          </form>

          <hr class="my-4">

          <div class="d-flex justify-content-between">
            <p class="mb-2">Subtotal</p>
            <p class="mb-2">$${addZeroes(cartTotal / 100)}</p>
          </div>

          <div class="d-flex justify-content-between mb-4">
            <p class="mb-2">Total(Incl. taxes)</p>
            <p class="mb-2">$${addZeroes(cartTotal / 100 * 1.12)}</p>
          </div>

          <button type="button" class="checkout btn btn-info btn-block btn-lg">
            <div class="d-flex justify-content-between">
              <span>$${addZeroes(cartTotal / 100 * 1.12)}</span>
              <span>&nbsp;Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
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
    $('.main-container').children().hide();

  });




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
          console.log('currUserID', currUserID);
          console.log("login success", response);
          // create homepage according to user information
          if (response[0].id === 3) {
            console.log("owner id is 3");
            renderOwnerDashboard(response[0]);


            return;
          }

          createHomepageForUser(response[0]);
        } else {
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
    $('.nav-links').append(`<a>Welcome, ${data.name}</a>`); // display user name in nav
    $('.nav-links').append(`<a class="nav-link" href="/" id="logout-btn">Logout</a>`); // add button to logout on navbar

    getUserOrderHistory(data.id); // run function with the user's id to get order history and display it on main page
  });


  // TODO: work in progress
  // function to reset homepage to default state
  // use for logout and page first render and NOT logged in
  // const resetToDefaultHomepage = () => {
  //   $('.main-container').css('margin-top', '0px');
  //   $('.menu-options-container').show();
  //   // hide the login html and container
  //   $('#login').hide();
  //   // show sign up button
  //   $('.sign-up').show();
  //   // change login btn text
  //   $('.login').html(`Login`);
  // };
  // resetToDefaultHomepage();

  // function to get numbers from form
  // converts string into phone number format
  // !! used for getting phone numbner. NOT IN USE ATM
  // $('.main-container').on('click', '#checkout-btn', function (event) {
  //   event.preventDefault();
  //   const formData = `${$('#areaCode').val() + $('#exchangeNum').val() + $('#lineNum').val()}`;


  //   console.log(formData);
  // });



  // listner for owner homepage
  // used to trigger Submitform() foun in ownerDashboard.js
  // function of submitForms() is to submit all inputs from a pending order (accept/decline, set pickup time)
  // !! currently not working.
  // !! only working on first item in pending order list
  $(".main-container").on("click", '#submit-forms', function (event) {
    event.preventDefault();
    submitForms();
  });


  // do not delete below this line
});
