//     __  __   ______   ______   ______    ___ __ __   ________   ___   ___   ______
//     /_/\/_/\ /_____/\ /_____/\ /_____/\  /__//_//_/\ /_______/\ /___/\/__/\ /_____/\
//     \:\ \:\ \\::::_\/_\::::_\/_\:::_ \ \ \::\| \| \ \\::: _  \ \\::.\ \\ \ \\:::_ \ \
//      \:\ \:\ \\:\/___/\\:\/___/\\:(_) ) )_\:.      \ \\::(_)  \ \\:: \/_) \ \\:(_) ) )_
//       \:\ \:\ \\_::._\:\\::___\/_\: __ `\ \\:.\-/\  \ \\:: __  \ \\:. __  ( ( \: __ `\ \
//        \:\_\:\ \ /____\:\\:\____/\\ \ `\ \ \\. \  \  \ \\:.\ \  \ \\: \ )  \ \ \ \ `\ \ \
//         \_____\/ \_____\/ \_____\/ \_\/ \_\/ \__\/ \__\/ \__\/\__\/ \__\/\__\/  \_\/ \_\/
//

// README: generates a bunch of SQL INSERT statements and puts them in seeds/01a_users.sql
// Run the file with the number of fake users you want as an argument in the command line
const fs = require('fs');

let numUsers = 100;
if (process.argv[2]) numUsers = process.argv[2];


const fNameArray = [
  "Alice",
  "Aaron",
  "Ashley",
  "Celia",
  "Marge",
  "Lisa",
  "Homer",
  "Bart",
  "Maggie",
  "Peter",
  "Chris",
  "Barb",
  "Linda",
  "Bob",
  "Robert",
  "Louise",
  "Walter",
  "Nicki",
  "Katy",
  "Holly",
  "Hank",
  "David",
  "Daniel",
  "Noah",
  "Skye",
  "Justin",
  "Alex",
  "Leighton",
  "Max",
  "Sara",
  "Sarah",
  "Joel",
  "Curtis",
  "Adam",
  "Ralph",
  "Clancy",
  "James",
  "Jim",
  "Matt",
  "Stephanie",
  "Natasha",
  "Gord"
];

const lNameArray = [
  "Simpson",
  "Cruz",
  "Turnbull",
  "Kuhn",
  "Griffin",
  "White",
  "Green",
  "Esposito",
  "Gomez",
  "Wong",
  "Chen",
  "Rodriguez",
  "Tipper",
  "Hernandez",
  "Jackson",
  "Lee",
  "Kim",
  "Williams",
  "Burns",
  "Warcup",
  "Rempel",
  "Belknap",
  "Harvey"
];

const adjArray = [
  "spicy",
  "bikini",
  "garfield",
  "weed",
  "zoomer",
  "wine",
  "420",
  "groovy",
  "punished",
  "vibe",
  "space",
  "cool",
  "anime",
  "punished_",
  "1337",
  "unicorn",
  "fiesta",
  "galaxy",
  "bigbrain",
  "corvette",
  "guitar",
  "ya$$$",
  "laser",
  "enby",
  "rockin",
  "swim",
  "bike",
  "rock",
  "skate",
  "bass",
  "fishing",
  "lil",
  "angel",
  "yung",
  "baby",
  "yasss",
  "boat",
  "slay"
];

const nounArray = [
  "mom",
  "garfield",
  "grandpa",
  "mancer",
  "dude",
  "chick",
  "gamer",
  "programmer",
  "luvr",
  "cadet",
  "fan",
  "bb",
  "baby",
  "gurl",
  "boi",
  "kween",
  "goat",
  "legend",
  "king"
];

const domainArray = [
  "gmail.com",
  "gmail.com",
  "gmail.com",
  "gmail.com",
  "outlook.com",
  "outlook.com",
  "live.com",
  "aol.com",
  "yahoo.com",
  "gmail.com",
  "shaw.ca",
  "shaw.ca"
];




// email-maker helper functions:

const suffixMaker = function() {
  let suffix = "";
  // Randomly pick whether email address becomes fnamelname1048, etc
  if (Math.random() > 0.3) {
    if (Math.random() > 0.2) {
      if (Math.random() > 0.3) {
        // 1970 - 1999 is added to end
        suffix = "19" + (70 + Math.floor(Math.random() * 30));
      } else {
        // 2000 - 2008 is added to end
        suffix = "20" + (Math.floor(Math.random() * 9));
      }
    } else {
      suffix = Math.floor(Math.random() * 500);
    }
  }
  return suffix;
};

const joinerMaker = function() {
  let joiner = "";
  // Randomly pick whether format becomes fname.lname, fname_lname, etc
  if (Math.random() > 0.5) {
    if (Math.random() > 0.4) {
      joiner = ".";
    } else {
      joiner = "_";
    }
  }
  return joiner;
};

const proEmail = function(fname, lname) {
  let joiner = joinerMaker();
  let suffix = suffixMaker();
  let first;
  if (Math.random() > 0.4) {
    first = fname;
  } else {
    first = fname[0];
  }
  return (first + joiner + lname + suffix + "@" + domainArray[Math.floor(Math.random() * domainArray.length)]);
};

const sillyEmail = function() {
  let joiner = joinerMaker();
  let suffix = suffixMaker();
  return (adjArray[Math.floor(Math.random() * adjArray.length)] + joiner + nounArray[Math.floor(Math.random() * nounArray.length)] + suffix + "@" + domainArray[Math.floor(Math.random() * domainArray.length)]);
};

// INSERT INTO users (name, email) VALUES ('Adam', punished_gamer@aol.com);

const makeUser = function() {
  let fname = fNameArray[Math.floor(Math.random() * fNameArray.length)];
  let lname = lNameArray[Math.floor(Math.random() * lNameArray.length)];
  let email;
  if (Math.random() > 0.5) {
    email = proEmail(fname, lname);
  } else {
    email = sillyEmail();
  }
  let name = (fname + " " + lname);
  return `'${name}', '${email}'`;
};


// generate the insert statements
let content = "";

for (let i = 0; i < numUsers; i++) {
  content += `INSERT INTO users (name, email) VALUES (${makeUser()}); \n`;
}


// put insert statements into a file

fs.writeFile('./db/seeds/01a_generated_users.sql', content, err => {
  if (err) {
    console.error(err);
  }
});
