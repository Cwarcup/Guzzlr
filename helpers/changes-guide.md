# Project updates from the Prettification Branch #

## ALREADY COMMITTED TO MAIN BUT IMPORTANT TO KNOW ABOUT ##

  COMMITTED TO MAIN ALREADY: Added function in restaurantmakr.js to set randomized opening and closing times with a mix of places opening in the evening and morning. These are included in schema and seed statements e.g. […] '11:00:00', '19:30:00' as time_open TIME, time_closes TIME.


## CSS ##

Added restaurant.scss file in /sass to style elements when viewing restaurant (restaurant info, menu).
Added buttons.scss file in /sass to provide default styling to buttons.

## INDEX.ejs ##

Added <link> to restaurant.scss and buttons.scss.
Removed <link> to bootstrap.

New, flexbox-friendly footer:

 <footer><p>© 2022 GROUP 3 DESIGNS</p>
    <div class = "footer-links">
    <a href="/">
      Home
    </a>
    <a href="/">
      Profile
    </a>
    <a href="/">
      Help
    </a>
  </div>
  </footer>

New setup for homepage with multiple cuisines and restaurants kept inside <div class=“treat-container”>:

<main>
  <div class = “treat-container”>
    <div class = “cuisine-container”>
    <!-- Multiple cuisines are listed here as articles. -->
      <article>
        <img class = “article-img” src=[link to food hero pic from github]”>
        <h1>NAME OF CUISINE</h1>
      </article>
    </div>
    <div class="restaurant-container">
      <!-- Multiple restaurants are listed here as articles. Enclose with button tags to make the whole thing clickable and enjoy the sitewide button features. -->
      <article><button class = "featured-restaurant">
        <h1>McDonald's</h1>
        <p>1928 Main Street</p>
        <p>Open until 11 PM</p></button>
      </article>
    </div>

Inside <div class = “main-container”> we’ve added containers for viewing a restaurant:

      <div class="view-restaurant">
        <div class="restaurant-info-container"></div>
        <div class="menu-options-container"></div>
      </div>

These are filled with content over in APP.JS and styled in restaurants.scss. .restaurant-info-container is filled with info about the restaurant (name, cuisine, street, phone, hours as ${open_time} to ${close} ideally with time formatted as “7 PM,” “11:30 AM,” etc).


## APP.JS ##

In the getMenuItems() declaration, we prepend hardcoded (fake) restaurant data for everything we want to be included when viewing a single restaurant. This is designed to be easily replaced with live data from the DB.

  const getMenuItems = () => {
    $.ajax({
      url: '/homepageMenu',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        const menuItems = data.menuItems;
        const restaurantName = `<h2 class="rest-name">${menuItems[0].rest_name}</h2>`;
        $('.restaurant-info-container').prepend(restaurantName);
        // this is fake hardcoded data
        const fakeRestaurantData = `
          <h3 class = "rest-cuisine">Fast Food</h3>
          <h3 class = "rest-street">1870 Main Street</h3>
          <h3 class = "rest-phone">(604) 555-1234</h3>
          <h3 class = "rest-hours">8:00 A.M to 11:30 P.M.</h3>
        `;
        $('.restaurant-info-container').prepend(fakeRestaurantData);

Further along in getMenuItems(), we iterate through the menuItems using slightly different DIV setups, allowing us to line up menu items nicely using CSS flexbox (the photos are commented out instead of deleted because I thought it might be handy to have a code snippet that lets us get a random photo): 

        // iterate through menuItems and append to DOM
        menuItems.forEach((menuItem) => {
          $('.menu-options-container').append(`
            <div id="${menuItem.id}" class="card">
             <!-- <img src="https://picsum.photos/150/150?random=${Math.floor(Math.random() * 100)}" class="card-img-top" alt="..."> -->
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
