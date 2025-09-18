// How to use modules and require

// const xyz = require("./people");
// console.log(xyz.people, xyz.ages);

const { people, ages } = require("./people");
console.log(people, ages); // [ 'prisca', 'estha', 'cara' ] [ 20, 26, 13 ]

const os = require("os");
console.log(os.platform(), os.homedir());
