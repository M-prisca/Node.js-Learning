// Working with the global window

console.log(global);

global.setTimeout(() => {
  console.log("In the timeout");
  clearInterval(int);
}, 3000);

const int = setInterval(() => {
  console.log("In the interval");
}, 1000);
