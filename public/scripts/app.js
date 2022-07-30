/* eslint-disable no-undef */
// Client facing scripts here
$(function () {
  
  // login html
  const login = () => {
    return (
      `
      <div class='login-container'>
        <h1>Login</h1>
        <form action="/login" method="POST">
          <div class="">
            <label class="" for="email">Email address</label>
            <input name="email" type="email" class="" placeholder="Enter email" id="email" />
          </div>

          <div class="">
            <label class="" for="password">Password</label>
            <input name="password" type="password" class="" placeholder="Password" id="password" />
          </div>

          <div class="">
            <button type="submit" class="">Login
            </button>
          </div>
        </form>
      </div>
      `
    );
  };

  $('.login').click((event) => {
    event.preventDefault();
    $('.header-welcome').hide();
    $('.menu-options-container').hide();
    $('.previous-orders-container').hide();
    const loginHTML = login();
    $('#main-cont').append(loginHTML);

  });
});