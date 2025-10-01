const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  //set header content type
  res.setHeader("Content-Type", "text/plain"); // replace plain by html if you want to write an html text
  //   res.write("<p>Hi prisca</p>");
  res.write("hello, prisca");
  res.end();
});

server.listen(3000, "localhost", () => {
  console.log("listening for the requests on port 3000");
});
