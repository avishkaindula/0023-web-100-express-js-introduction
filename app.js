// Before executing npm install command, we need to run npm init
// After that, we need to install express by using "npm install express" command
// When we install a package using npm, it also downloads all the other packages that the original package depends on.
// So when we install expressJS package, it will also install more than 50 other packages with it.

// --------------------------------------------------------------------------------------------------------------------
// creating a custom server form nodeJS--------------------------------------------------------------------------------

// const http = require("http");

// function handleRequest(request, response) {
//   if (request.url === "/currenttime") {
//     response.statusCode === 200;
//     response.end("<h1>" + new Date().toISOString() + "</h1>");
//   } else if (request.url === "/") {
//     response.statusCode = 200;
//     response.end("<h1>Hello World!</h1>");
//   }
// }

// const server = http.createServer(handleRequest);

// server.listen(3000);

// --------------------------------------------------------------------------------------------------------------------
// creating a custom server form expressJS-----------------------------------------------------------------------------

const express = require("express");
// express package is a function.
// http package is an object.
// so a package can be anything like a number, function or an object.

const app = express();
// as express is an function, we call it like this.

app.get("/currenttime", function (request, response, next) {
  response.send("<h1>" + new Date().toISOString() + "</h1>");
  // This is how we send back a response in Express.
  // We can pass the data we need to send as parameter values of .send()
});
// the .get method will allow us to define a request handler for incoming get requests.
// get requests are the kind of requests that are set by the browser when we normally type an URL.
// This will handle requests that are sent to localhost:3000/currenttime
// the second parameter value is the function that should be executed for the incoming request.
// The function in here is called an "anonymous function."
// It's a function without a name and it's created right where it's needed.
// Overall, this combination of a path and a req + res handler function is called a "route" or "route handler"
// next is a function that can be executed "inside" of this anonymous function.

app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>");
});
// This will handle requests that are sent to just localhost:3000

// We don't set status codes on the above functions because express set it to 200 by default.

app.listen(3000);
// We don't need to createServer manually.
// Instead a server is created automatically by express.
// Now we can call listen method.
