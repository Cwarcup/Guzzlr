// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const app = express();
const morgan = require('morgan');


// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(
  '/styles',
  sassMiddleware({
    source: `${__dirname  }/styles`,
    destination: `${__dirname  }/public/styles`,
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const getMenuItemsFromOrderId = require('./routes/getMenuItemsFromOrderId');
const menuItems = require('./routes/menuItems');
const usersRoutes = require('./routes/users');
const widgetsRoutes = require('./routes/widgets');
const userOrderHistory = require('./routes/userOrderHistory');
const userCart = require('./routes/userCart');
const createOrder = require('./routes/createOrder');
const lookupAllLogins = require('./routes/lookupAllLogins');
const incomingOrder = require('./routes/incomingOrder');
const getRestaurantOrders = require('./routes/getRestaurantOrders');
const getNewestOrder = require('./routes/getNewestOrder');
const getRestaurantData = require('./routes/getRestaurantData');
const checkIfUserExists = require('./routes/checkIfUserExists');
const createUser = require('./routes/createUser');
const confirmOrder = require('./routes/confirmOrder');
const orderRFP = require('./routes/orderRFP');
const homepageMenu = require('./routes/homepageMenu');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use('/getMenuItemsFromOrderId', getMenuItemsFromOrderId(db));
app.use('/api/users', usersRoutes(db));
app.use('/api/widgets', widgetsRoutes(db));
app.use('/homepageMenu', homepageMenu(db));
app.use('/userOrderHistory', userOrderHistory(db));
app.use('/userCart', userCart(db));
app.use('/menuItems', menuItems(db));
app.use('/createOrder', createOrder(db));
app.use('/lookupAllLogins', lookupAllLogins(db));
app.use('/incomingOrder', incomingOrder(db));
app.use('/getNewestOrder', getNewestOrder(db));
app.use('/getRestaurantData', getRestaurantData(db));
app.use('/getRestaurantOrders', getRestaurantOrders(db));
app.use('/checkIfUserExists', checkIfUserExists(db));
app.use('/createUser', createUser(db));
app.use('/confirmOrder', confirmOrder(db));
app.use('/orderRFP', orderRFP(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
