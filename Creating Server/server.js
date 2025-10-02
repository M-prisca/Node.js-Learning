const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  //set header content type
  res.setHeader("Content-Type", "text/html"); // replace plain by html if you want to write an html text
  //   res.write("<p>Hi prisca</p>");
  //   res.write("hello, prisca");
  //   res.end();

  //Basic Routing
  let filepath = "../views/";

  switch (req.url) {
    case "/":
      filepath += "index.html";
      break;
    case "/about":
      filepath += "about.html";
      break;
    default:
      filepath += "404.html";
  }

  // Returning HTML pages
  fs.readFile(filepath, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //   res.write(data);
      res.end(data); // you can pass it inside the end() and still does the same thing
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for the requests on port 3000");
});
