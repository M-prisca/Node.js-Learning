const fs = require("fs");

const readStream = fs.createReadStream("../File system/blog.txt", {
  encoding: "utf8",
});

const writeStream = fs.createWriteStream("../File system/blog2.txt");

readStream.on("data", (chunk) => {
  console.log(".....NEW CHUNK.....");
  console.log(chunk);

  writeStream.write("\nNEW CHUNK\n");
  writeStream.write(chunk);
});
