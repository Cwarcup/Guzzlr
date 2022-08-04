//                    __                               __                  __
//    ________  _____/ /_____ ___  ___________ _____  / /_____ ___  ____ _/ /_______
//   / ___/ _ \/ ___/ __/ __ `/ / / / ___/ __ `/ __ \/ __/ __ `__ \/ __ `/ //_/ ___/
//  / /  /  __(__  ) /_/ /_/ / /_/ / /  / /_/ / / / / /_/ / / / / / /_/ / ,< / /
// /_/   \___/____/\__/\__,_/\__,_/_/   \__,_/_/ /_/\__/_/ /_/ /_/\__,_/_/|_/_/
//
//

// README: this helper program spits out insert statements for restaurants (8 per cuisine)

const fs = require('fs');

// CUISINES
const restaurantNamesByCuisine = {
  pizza: [
    "Third Slice Pizza",
    "A2 Pizza",
    "Aunt Fatty''s Pizza",
    "Panagone",
    "Unfresh Slice",
    "Double Pizza",
    "Pizza Jardin",
    "Pi R Cubed"
  ],
  italian: [
    "Don''t Ask For Luigi",
    "New Spaghetti Factory",
    "Lupone Restaurant & Vinoteca",
    "ConCon Ristorante",
    "Shoppino''s",
    "Stupida Volpe",
    "Jefferelli''s",
    "Rick''s Spaghetti House"
  ],
  mexican: [
    "Chipootle",
    "Sal y Jamón",
    "L.A. Taqueria",
    "Tacofiendo",
    "Los Enemigos",
    "Asquerosita",
    "La Basura",
    "Comida de Piso"
  ],
  comfort: [
    "The Clambie",
    "Schemeworks Brewing",
    "The Alibye Room",
    "Seven Acres",
    "Spewhall",
    "Barrel & Tap",
    "The Scottish Heather",
    "Delish Pub"
  ],
  fineDining: [
    "Le Alligator",
    "Flojo''s",
    "Eaglesworth Restaurant",
    "Fly''s Steakhouse",
    "Brown Water Cafe",
    "Chamber",
    "Metropolis Steakhouse",
    "Jane Fortes Seafood & Chop House"
  ],
  japanese: [
    "Kōhī-Kyahuhon",
    "Konpyuta Ramen",
    "Nōdo Sushi",
    "Taipu-Kyakuhon",
    "Tokkyū",
    "Hairetsu Sushi To Go",
    "Hensū Izakaya",
    "Dētabēsu"
  ],
  chinese: [
    "Shu Juku Teahouse",
    "Ka Fei",
    "Dapi Noodles",
    "Duobiande Hot Pot",
    "Wenjian Xitong",
    "Jisuanji Szechuan Cuisine",
    "Wei Zhaodao Yonghu",
    "Ruanjian BBQ"
  ],
  coffee: [
    "OJ Bean",
    "Kafkaesque",
    "Revolving Coffee",
    "They''re There",
    "Muffin''s Donuts",
    "Cart ''Em Donuterie",
    "Unlucky''s",
    "Ernest''s Ice Cream"
  ]
};

const streets = [
  "Main Street",
  "Davie Street",
  "Burrard Street",
  "Government Street",
  "Broadway Ave",
  "Robson Street",
  "Pandora Street",
  "Douglas Street",
  "Marine Drive",
  "Quadra Street",
  "Wharf Street"
];

const cities = [
  "Vancouver",
  "Vancouver",
  "Vancouver",
  "Victoria",
  "Victoria",
  "Duncan",
  "Richmond",
  "North Vancouver",
  "Burnaby"
];
// === FUNCTIONS ===

// return int between zero and #
const intBetweenZeroAnd = function(input) {
  return Math.floor(Math.random() * (input + 1));
};

// return a random plausible BC phone number
const makeRandomPhoneNumber = function() {
  let phoneNumber = "(";
  let areaCodes = ['250', '604', '778'];
  phoneNumber += areaCodes[Math.floor(Math.random() * 3)];
  phoneNumber += ") ";
  for (let i = 0; i < 7; i++) {
    if (i === 3) {
      phoneNumber += "-";
    }
    phoneNumber += intBetweenZeroAnd(9);
  }
  return phoneNumber;
};



// return a random plausible BC postal code
const makeRandomPostalCode = function() {
  let postalCode = "V";
  postalCode += intBetweenZeroAnd(9);
  postalCode += String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
  postalCode += " ";
  postalCode += intBetweenZeroAnd(9);
  postalCode += String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
  postalCode += intBetweenZeroAnd(9);
  return postalCode;
};

// return an array with a random set of hours of operation
const makeRestaurantHours = function() {
  let adjust = Math.floor(Math.random() * 3);
  let minutes = "00";
  let openTime;
  let closeTime;

  if (Math.random() >= 0.6) {
    minutes = "30";
  }

  if (Math.random() >= 0.8) {
    openTime = (adjust + 16) + ':' + minutes + ':00';
    closeTime = (adjust + 21) + ':' + minutes + ':00';
  } else {
    openTime = (adjust + 9) + ':' + minutes + ':00';
    closeTime = (adjust + 17) + ':' + minutes + ':00';
  }
  return [openTime, closeTime];
};

// INSERT INTO restaurants (owner_id, name, phone_number, country, street, city, province, post_code) VALUES (3, 'McDonalds', '867-5309', 'Canada', '123 Sesame St', 'Victoria', 'BC', 'A2C 4E6');

const makeInsertStatements = function() {

  let template = `INSERT INTO restaurants (owner_id, name, cuisine_type, phone_number, country, street, city, province, post_code, time_open, time_closes) VALUES `;

  let toReturn = "";
  let idNumber = 1;

  for (let cuisine in restaurantNamesByCuisine) {
    for (let i = 0; i < restaurantNamesByCuisine[cuisine].length; i++) {
      toReturn += template;
      toReturn += `(${idNumber}, '${restaurantNamesByCuisine[cuisine][i]}', '${cuisine}', '${makeRandomPhoneNumber()}', 'Canada', '${intBetweenZeroAnd(3000) + ' ' + streets[intBetweenZeroAnd(streets.length - 1)]}', '${cities[intBetweenZeroAnd(cities.length - 1)]}', 'BC', '${makeRandomPostalCode()}', '${makeRestaurantHours()[0]}', '${makeRestaurantHours()[1]}'); \n`;
      idNumber++;
    }
  }


  return toReturn + "; \n";
};

let content = makeInsertStatements();

// Let's get a statement together to put into a file!

fs.writeFile('./db/seeds/02a_generated_restaurants.sql', content, err => {
  if (err) {
    console.error(err);
  }
});

