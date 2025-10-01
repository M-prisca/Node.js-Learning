const fs = require("fs");
const readStream = fs.createReadStream("../File system/blog.txt", {
  encoding: "utf8",
});

readStream.on("data", (chunk) => {
  console.log(".....NEW CHUNK.....");
  console.log(chunk);
});
