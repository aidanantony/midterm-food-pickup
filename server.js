//load .env data into process.env
//const path = require("path");
//const PATH = path.resolve(__dirname, "./.env");
require("dotenv").config({ debug : true});
console.log(process.env);

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require('cookie-parser');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

//Twilio
// const http = require('http');
// const MessagingResponse = require('twilio').twiml.MessagingResponse;

//requiring food to preload


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieParser()); //needs middleware to be abel to access cookies data across website
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const vendorsRoutes = require("./routes/vendors");
//const widgetsRoutes = require("./routes/widgets"); //not part of scope

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/vendors", vendorsRoutes(db));
//app.use("/api/widgets", widgetsRoutes(db)); //not part of scope
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index", {user: null});
});

// app.get("/vendors", (req, res) => {
//   res.render("vendorInterface", {user});
// });

// app.get("/users", (req, res) => {
//   res.render("customerInterface")
// })

app.post("/logout", (req,res) => {
  res.clearCookie("user_id");
  res.redirect("/");
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

//GET request for logged in user

