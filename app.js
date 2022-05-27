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

const fs = require("fs");
// This is the file system package.
// This will help us to interact with the json files.

const path = require("path");
// This will help us to construct paths through our project files.
// This will create paths that would work on all operating systems.

const express = require("express");
// express package is a function.
// http package is an object.
// so a package can be anything like a number, function or an object.

const app = express();
// as express is an function, we call it like this.

app.use(express.urlencoded({ extended: false }));
// use also allows us to handle incoming requests.
// but it doesn't care what kind of request that it is unlike get and post.
// We don't need to define a path here.
// instead we can directly add an extra handler that should be executed for all incoming requests.
// That general handler functions, which applies to more than one type of request, are typically called middleware functions.
// Because it's in the middle of express seen the request, and our code handling that request.
// Here we need a middleware function that look that if the incoming request has any kind of data.
// and which will then extract that data.
// urlencoded is a method that will setup a body parser.
// If the incoming requests carry form data, it will parse that included data and translate it into a JS object.
// we should also pass a JS object as an argument and set extended: false here.

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

// app.get("/", function (req, res) {
//   res.send("<h1>Hello World!</h1>");
// });
// This will handle requests that are sent to just localhost:3000

app.get("/", function (req, res) {
  res.send(
    '<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>'
  );
  // "action" attribute will set the path that we want to store the user input.
  // we can use "GET" instead of "POST" as the method, but the default is to use a POST method
  // to send data from the browser to the server.
  // name="username" will give us the key we need to extract the data from the input field.
});

app.post("/store-user", function (req, res) {
  const userName = req.body.username;
  // .body is used to extract the data that is attached to the request.
  // .body will be a JS object.
  // keys with name attributes will be properties of that object.
  // the values entered by the user will be the values of that property.
  // so req.body.username; will give the data entered by the user.
  // but nodeJS won't parse the actual request data automatically.
  // app.use(express.urlencoded({ extended: false })); code will parse the code.

  // console.log(userName);
  // This will console.log the user input to the terminal on the VS code, not the browser console.

  const filePath = path.join(__dirname, "data", "users.json");
  // we need to join multiple fragments that describes the overall path where the data should be stored.
  // __dirname is a built in variable that holds the absolute path to this project directory.
  // it has "two" underscores.
  // after adding __dirname, we add the other files and folders that we want to dive in.

  const fileData = fs.readFileSync(filePath);
  // This will read the data on the users.json file as a text.
  // The text inside that users.json file is just a [] mark.
  const existingUsers = JSON.parse(fileData);
  // This will convert [] inside the json file from text into a JS array.
  // We need to convert that into an array if we need to push userName as data into that.

  existingUsers.push(userName);
  // This will add a new item at the end of the array inside the json file.

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));
  // This is how we write data into the users.json file
  // users.json is simply a text file that holds data.
  // "JSON" if a format that can be used in almost every programming language.
  // Alternatives to JSON are "XML" and "Apache Parquet".
  // filePath tells the location of the file that we need to write the data into.
  // We should also define the "data" that should be written in.
  // And that should be the "existing list" in that file (the list we defined with [] mark.) + the username.
  // For that first of all we need to read the json file. => fs.readFileSync(filePath)
  // and then we need to add userName to that file. => existingUsers.push(userName)
  // And then we need to write the updated file back in to the file. => JSON.stringify(existingUsers)
  // JSON.stringify will convert the [] form JS array to a normal text,
  // because json files only allows to write just normal text.
  // Now whenever we run the node app.js server and and enter some names through the form in the browser,
  // The users.json file gets updated by the names that the users wrote inside the form.

  res.send("<h1>Username stored!</h1>");
});
// we ust "app.post" to extract the data that was submitted through the form.

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  // This will parse the data inside the users.json file into an array.
  // now we can use that array for our needs.

  // res.send(existingUsers);
  // This will give the output as follows => ["Indula","Shameen","Janith"]

  let responseData = "<ul>";

  for (const user of existingUsers) {
    responseData = responseData + "<li>" + user + "</li>";
    // responseData += "<li>" + user + "</li>"; <= this is the same as the above code.
    // "user" is a single item of the array.
  }

  responseData = responseData + "</ul>";
  // The above code will concatenate and create an unordered list.

  res.send(responseData);
  // The above code will output the data as an "unordered list."
});
// This "/users" path will allow us to output all the names entered by the users.

app.listen(3000);
// We don't need to createServer manually.
// Instead a server is created automatically by express.
// Now we can call listen method.

// We don't set status codes on the above functions because express set it to 200 by default.
