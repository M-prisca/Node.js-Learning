const { error } = require("console");
const fs = require("fs");

// Reading the files
fs.readFile("./blog.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
});
//console.log("last line"); last line
// Hello, Prisca!

// Writing files

fs.writeFile("./blog.txt", "Hello world", () => {
  console.log("file was written");
});

// create a file if it doesn't exist by writing on it

fs.writeFile("./blog1.txt", "Hello again", () => {
  console.log("file was written");
});

// directories
if (!fs.existsSync("../assets")) {
  fs.mkdir("../assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder created");
  });
} else {
  fs.rmdir("../assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file deleted");
  });
}

// delete a file.

if (fs.existsSync("./deleteme.txt")) {
  fs.unlink("./deleteme.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file deleted");
  });
}
