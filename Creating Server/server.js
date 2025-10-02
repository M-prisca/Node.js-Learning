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
      res.statusCode = 200;
      break;
    case "/about":
      filepath += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      filepath += "404.html";
      res.statusCode = 404;
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
