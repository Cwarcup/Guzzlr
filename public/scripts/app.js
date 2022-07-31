/* eslint-disable no-undef */
// Client facing scripts here
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
        $('.main-container').append(`
        <section class="h-100 h-custom" style="background-color: #eee;">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col">
              <div class="card">
                <div class="card-body p-4">
                  <div class="row">
                    <div class="col-lg-7">
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
                    </div>
                    <div class="col-lg-5">
    
                      <div class="card bg-primary text-white rounded-3">
                        <div class="card-body">
                          <div class="d-flex justify-content-between align-items-center mb-4">
                            <h5 class="mb-0">Card details</h5>
                            <img src="https://picsum.photos/150/150?random=1" class="img-fluid rounded-3"
                              style="width: 45px;" alt="Avatar">
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
    console.log('cart demo button has been clicked');
    userCart();
    $('.main-container').children().hide();

  });




  // do not delete below this line
});



