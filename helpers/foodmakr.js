//        __                 _                 _
//        / _| ___   ___   __| |_ __ ___   __ _| | ___ __
//        | |_ / _ \ / _ \ / _` | '_ ` _ \ / _` | |/ / '__|
//        |  _| (_) | (_) | (_| | | | | | | (_| |   <| |
//        |_|  \___/ \___/ \__,_|_| |_| |_|\__,_|_|\_\_|
//

// README: this program takes a bunch of adjectives and spits out insert statements

const fs = require('fs');


// PUT HOW MANY TREAT ITEMS YOU WANT BELOW!
const numTreats = 40;



// Arrays of words

const adj1Array = [
  `fresh`,
  `organic`,
  `seasonal`,
  `local`,
  `farm-fresh`,
  `gluten-free`,
  `vegan`,
  `cruelty-free`,
  `house-made`
];
const adj2Array = [
  `sweet`,
  `creamy`,
  `spicy`,
  `salty`,
  `tangy`,
  `sour`,
  `buttery`,
  `crumbly`,
  `delicate`,
  `flaky`,
  `glazed`,
  `pickled`,
  `fermented`
];
const adj3Array = [
  `zippy`,
  `bold`,
  `tangy`,
  `mouthsome`,
  `beefy`,
  `finger-lickin`,
  `zesty`,
  `old fashioned`
];
const flavorArray = [
  `ranch`,
  `jalapeño`,
  `Doritos`,
  `curry`,
  `Tex-Mex`,
  `dangerously cheesy`,
  `Southwest`,
  `smothered`,
  `fiesta`,
  `Bourbon Street`,
  `double crunch`,
  `cowboy`,
  `kids`,
  `Ultimate`,
  `Kobe`,
  `mouth-watering`,
  `sizzling`
];
const methodArray = [
  `broiled`,
  `oven-baked`,
  `roasted`,
  `slow-roasted`,
  `barbecued`,
  `smoked`,
  `deep-fried`,
  `au gratin`,
  `beer-battered`,
  `grilled`,
  `dry-roasted`,
  `fried`,
  `pan-fried`,
  `sautéed`
];
const vegArray = [
  `broccoli`,
  `carrot`,
  `potato`,
  `turnip`,
  `rutabaga`,
  `avocado`,
  `leek`,
  `cherry tomato`,
  `kale`,
  `zucchini`,
  `endive`,
  `onion`,
  `asparagus`
];
const proteinArray = [
  `tempeh`,
  `tofu`,
  `steak`,
  `lobster`,
  `prime rib`,
  `montreal smoked meat`,
  `cod`,
  `monkfish`,
  `barbacoa`,
  `carnitas`,
  `shrimp`,
  `chicken`,
  `lamb`,
  `pork`,
  `tuna tataki`,
  `beef tataki`,
  `salmon`,
  `egg`,
  `duck`
];
const herbArray = [
  `thyme`,
  `cilantro`,
  `basil`,
  `rosemary`,
  `chive`,
  `garlic`,
  `saffron`,
  `lime`,
  `lemon`
];
const sweetArray = [
  `blueberry`,
  `raspberry`,
  `peach`,
  `salted caramel`,
  `bourbon`,
  `whisky`,
  `apple`,
  `vanilla`,
  `pecan`
];
const conjoinerArray = [
  `smothered in a`,
  `with our signature`,
  `drizzled with`,
  `served with`,
  `served over`,
  `stuffed with`,
  `packed with`
];
const baseArray = [
  `broth`,
  `polenta`,
  `mashed potatoes`,
  `potatoes`,
  `rice pilaf`,
  `noodles`,
  `sauce`,
  `risotto`
];
const entreeArray = [
  `burger`,
  `sandwich`,
  `salad`,
  `pasta`,
  `pizza`,
  `gumbo`,
  `cheesesteak`,
  `mac and cheese`
];
const appyArray = [
  `bites`,
  `cakes`,
  `roll`,
  `salad roll`,
  `bun`,
  `nachos`,
  `wings`,
  `flatbread`,
  `poutine`,
  `risotto`
];
const dessertArray = [
  `cheesecake`,
  `pie`,
  `soufflé`,
  `ice cream`,
  `milkshake`,
  `lava cake`,
  `donuts`,
  `sorbet`
];
const sidesArray = [
  `side salad`,
  `rice`,
  `bread`,
  `naan`,
  `pickles`,
  `soup`
];
const drinksArray = [
  `martini`,
  `IPA`,
  `lager`,
  `daiquiri`,
  `martini`,
  `paloma`,
  `spritz`,
  `vodka soda`,
  `latte`,
  `smoothie`
];



// INSERT INTO menu_items (name, description, price, menu_section) VALUES ('Big Mac', 'Nothing compares to two 100% Canadian beef patties, special sauce, crisp lettuce, processed cheddar cheese, pickles and onions on a toasted sesame seed bun.', 'Burgers', 2000);

const makeInsertStatement = function(foodType, priceAdjust = Math.floor(Math.random() * 15)) {

  let myStatement = 'INSERT INTO menu_items (name, description, price, menu_section) VALUES ';

  // this is probably not performant but we're only running it a few times
  // set all the food words to a random entry from the appropriate array
  let adj1 = adj1Array[Math.floor(Math.random() * adj1Array.length)];
  let adj2 = adj2Array[Math.floor(Math.random() * adj2Array.length)];
  let adj3 = adj3Array[Math.floor(Math.random() * adj3Array.length)];
  let flavor = flavorArray[Math.floor(Math.random() * flavorArray.length)];
  let method = methodArray[Math.floor(Math.random() * methodArray.length)];
  let veg = vegArray[Math.floor(Math.random() * vegArray.length)];
  let protein = proteinArray[Math.floor(Math.random() * proteinArray.length)];
  let herb = herbArray[Math.floor(Math.random() * herbArray.length)];
  let herb2 = herbArray[Math.floor(Math.random() * herbArray.length)];
  let sweet = sweetArray[Math.floor(Math.random() * sweetArray.length)];
  let conjoiner = conjoinerArray[Math.floor(Math.random() * conjoinerArray.length)];
  let base = baseArray[Math.floor(Math.random() * baseArray.length)];
  let entree = entreeArray[Math.floor(Math.random() * entreeArray.length)];
  let appy = appyArray[Math.floor(Math.random() * appyArray.length)];
  let dessert = dessertArray[Math.floor(Math.random() * dessertArray.length)];
  let side = sidesArray[Math.floor(Math.random() * sidesArray.length)];
  let drink = drinksArray[Math.floor(Math.random() * drinksArray.length)];

  // set item names
  const entreeNameArray = [
    `${flavor} ${protein} ${entree}`,
    `${adj1} ${method} ${entree}`,
    `${adj3} ${flavor} ${entree}`,
    `${adj1} ${herb}-${herb2} ${entree}`
  ];

  const appyNameArray = [
    `${veg} ${appy}`,
    `${adj1} ${veg} ${appy}`,
    `${adj1} ${protein} ${appy}`,
    `${flavor} ${herb} ${appy}`,
    `${flavor} ${veg} ${appy}`,
    `${flavor} ${method} ${appy}`,
    `${method} ${protein} ${appy}`
  ];

  const sideNameArray = [
    `${veg} ${side}`,
    `${herb} ${side}`,
    `${sweet} ${side}`,
    `${adj1} ${herb} ${side}`
  ];
  const dessertNameArray = [
    `${sweet} ${dessert}`,
    `${adj1} ${sweet} ${dessert}`,
    `${method} ${sweet} ${dessert}`
  ];
  const drinkNameArray = [
    `${adj1} ${drink}`,
    `${herb} ${drink}`,
    `${sweet} ${drink}`,
    `${adj1} ${sweet} ${drink}`
  ];

  // set all the food words to a DIFFERENT random entry from the appropriate array
  adj1 = adj1Array[Math.floor(Math.random() * adj1Array.length)];
  adj2 = adj2Array[Math.floor(Math.random() * adj2Array.length)];
  adj3 = adj3Array[Math.floor(Math.random() * adj3Array.length)];
  flavor = flavorArray[Math.floor(Math.random() * flavorArray.length)];
  method = methodArray[Math.floor(Math.random() * methodArray.length)];
  veg = vegArray[Math.floor(Math.random() * vegArray.length)];
  protein = proteinArray[Math.floor(Math.random() * proteinArray.length)];
  herb = herbArray[Math.floor(Math.random() * herbArray.length)];
  herb2 = herbArray[Math.floor(Math.random() * herbArray.length)];
  sweet = sweetArray[Math.floor(Math.random() * sweetArray.length)];
  conjoiner = conjoinerArray[Math.floor(Math.random() * conjoinerArray.length)];
  base = baseArray[Math.floor(Math.random() * baseArray.length)];
  entree = entreeArray[Math.floor(Math.random() * entreeArray.length)];
  appy = appyArray[Math.floor(Math.random() * appyArray.length)];
  dessert = dessertArray[Math.floor(Math.random() * dessertArray.length)];
  side = sidesArray[Math.floor(Math.random() * sidesArray.length)];
  drink = drinksArray[Math.floor(Math.random() * drinksArray.length)];

  // Set item descriptors

  const entreeDescArray = [
    `${conjoiner} ${adj3} ${flavor} ${base}`,
    `${conjoiner} ${adj2} ${herb} ${base}`,
    `${conjoiner} ${adj2} ${herb}-${herb2} ${base}`,
    `With ${adj1} ${method} ${veg}`
  ];

  const appyDescArray = [
    `${adj3}, ${adj2} and ${adj1}`,
    `${adj2} and ${adj1}`
  ];

  // set all the madlibs to a random entry from the appropriate array
  let entreeName = entreeNameArray[Math.floor(Math.random() * entreeNameArray.length)];
  let entreeDesc = entreeDescArray[Math.floor(Math.random() * entreeDescArray.length)];
  let appyName = appyNameArray[Math.floor(Math.random() * appyNameArray.length)];
  let appyDesc = appyDescArray[Math.floor(Math.random() * appyDescArray.length)];
  let sideName = sideNameArray[Math.floor(Math.random() * sideNameArray.length)];
  let dessertName = dessertNameArray[Math.floor(Math.random() * dessertNameArray.length)];
  let drinkName = drinkNameArray[Math.floor(Math.random() * drinkNameArray.length)];

  // myStatement = `INSERT INTO menu_items (name, description, price, menu_section)`;


  if (foodType === 'entree') {
    // set price between $10 and $16 plus the price adjustment
    let price = 100 * (Math.floor(Math.random() * 7) + 10 + priceAdjust);
    myStatement += `('${entreeName}', '${entreeDesc}', ${price}, 'Entrees')`;
  } else if (foodType === 'appetizer') {
    let price = 100 * (Math.floor(Math.random() * 4) + 6 + priceAdjust);
    myStatement += `('${appyName}', '${appyDesc}', ${price}, 'Appetizers')`;
  } else if (foodType === 'side') {
    let price = 100 * (Math.floor(Math.random() * 3) + 2 + priceAdjust);
    myStatement += `('${sideName}', ' - ', ${price}, 'Sides')`;
  } else if (foodType === 'drink') {
    let price = 100 * (Math.floor(Math.random() * 5) + 6 + priceAdjust);
    myStatement += `('${drinkName}', ' - ', ${price}, 'Drinks')`;
  } else if (foodType === 'dessert') {
    let price = 100 * (Math.floor(Math.random() * 4) + 7 + priceAdjust);
    myStatement += `('${dessertName}', ' - ', ${price}, 'Desserts')`;
  }
  // console.log('\n');
  return myStatement + "; \n";
};

// Let's get a statement together to put into a file!

let content = "";

for (let i = 0; i < numTreats; i++) {
  content += makeInsertStatement('appetizer');
}

for (let j = 0; j < numTreats; j++) {
  content += makeInsertStatement('entree');
}

for (let k = 0; k < numTreats; k++) {
  content += makeInsertStatement('entree');
}

for (let k = 0; k < numTreats; k++) {
  content += makeInsertStatement('drink');
}

for (let k = 0; k < numTreats; k++) {
  content += makeInsertStatement('dessert');
}

fs.writeFile('./db/seeds/04a_generated_menu_items.sql', content, err => {
  if (err) {
    console.error(err);
  }
});

let menuBuilder = "";

let split = 1;
for (let i = 1; i <= numTreats * 4; i++) {
  if (i % 40 === 0) {
    split++;
  }
  menuBuilder += `INSERT INTO menus (restaurant_id, menu_item) VALUES (${split},${i});\n`;
}

fs.writeFile('./db/seeds/05a_generated_menus.sql', menuBuilder, err => {
  if (err) {
    console.error(err);
  }
});
