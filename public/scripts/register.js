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
        console.log(response);
        $('#register').hide();
        $('.header-welcome').show();
        $('.main-container').children().show();
        $('.menu-options-container').show();
        $('.previous-orders-container').show();
        }
    });

  }





});
