const fs = require("fs");
const readStream = fs.createReadStream("../File system/blog.txt");

readStream.on("data", (chunk) => {
  console.log(".....NEW CHUNK.....");
  console.log(chunk.toString());
});
