$(function () {

  $('.sign-up').click((event) => {
    event.preventDefault();
    $('.header-welcome').hide();
    $('.main-container').children().hide();
    $('.menu-options-container').hide();
    $('.previous-orders-container').hide();
    $('#register').show();
    $('#register').html(`
        <h1>Register</h1>
        <form id="register-form">
        <div>
          <label for="name">Name:</label>
          <input name="name" placeholder="name" id="register-name"/>
          </div>
          <div>
            <label for="email">Email address:</label>
            <input name="email" type="email" placeholder="email" id="register-email"/>
          </div>
          <div>
            <label for="password">Password: </label>
            <input name="password" placeholder="Password" id="register-password"/>
          </div>
          <div>
            <button type="submit" class="register-btn">Register
            </button>
          </div>
        </form>
    `);
  });

  $('#register').submit(function (event) {
    event.preventDefault();
    const formData = {
      name: $('#register-name').val(),
      email: $('#register-email').val(),
      password: $('#register-password').val()
    };

    //check if user exists;
    $.ajax({
      url: 'http://localhost:8080/checkIfUserExists',
      method: 'POST',
      data: {
        name: `${formData.name}`,
        email: `${formData.email}`,
        password: `${formData.password}`
      },
      success: (response) => {
        console.log(response);
        if (response.length > 0) {
          // create homepage according to user information
          if (response[0].id) {
            console.log('❌ ❌ user found in database ❌ ❌ ')
            alert('Another user has an account with this email, please use another email address.');
          }
        } else {
          console.log('✅ user not found in database ✅');
          createUser(formData);

        }
      }
    });
  });

  const createUser = function(userData) {


    $.ajax({
      url: 'http://localhost:8080/createUser',
      method: 'POST',
      data: {
        name: `${userData.name}`,
        email: `${userData.email}`,
        password: `${userData.password}`
      },
      success: (response) => {
        $.ajax({
          url: 'http://localhost:8080/lookupAllLogins',
          method: 'POST',
          data: {
            email: `${userData.email}`,
            password: `${userData.password}`
          },
          success: (response) => {
            currUserID = response[0].id;
            console.log('currUserID', currUserID);
            console.log("login success", response);
            // create homepage according to user information
            createHomepageForUser(response[0]);
          }

        });
        console.log(response);
        $('#register').hide();
        $('.register-container').hide();
        $('.header-welcome').show();
        $('.main-container').children().show();
        $('.menu-options-container').show();
        $('.previous-orders-container').show();
        $('.treat-container').hide();
        $('.view-restaurant').hide();
        $('.previous-orders-container').hide();
        createHomepageForUser(response[0]);
        }
    });

  }

  const createHomepageForUser = ((data) => {
    // DOM already has restaurant name and food items. We just need to show them.
    $('.main-container').children().show();
    $('#login').hide();
    $('.sign-up').hide();
    // change login btn htl
    $('.login').hide();
    $('.header-welcome').hide();
    $('#register').hide();
    $('.treat-container').hide();
    $('.view-restaurant').hide();
    $('.previous-orders-container').hide();
    // display user name in nav
    $('.nav-links').append(`<a>Welcome, ${data.name}</a>`);
    // add button to logout on navbar
    $('.nav-links').append(`<a class="nav-link" href="/" id="logout-btn">Logout</a>`);

    // run function with the user's id to get order history and display it
    console.log("data.id from createhomepage:", data.id);
    getUserOrderHistory(data.id);
  });

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
          <div id="${prevOrder.id}" class="card">
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





});
