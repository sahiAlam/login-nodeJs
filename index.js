// Server Code
const { response } = require("express");
const express = require("express");
const { request } = require("http");
const app = express();
app.listen("4000", () => console.log("Listning at port 4000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

// const Datastore = require("nedb");
// const database = new Datastore("userdata.db");
// database.loadDatabase();
const Datastore = require("nedb");
const database = new Datastore("logindata.db");
database.loadDatabase();

app.post("/api", (request, response) => {
  console.log("I got a request..");
  const data = request.body;
  data.timestamp = Date.now();

  database.insert();

  console.log(data);

  response.json({
    status: "success",
    latitude: data.finalLati,
    longitude: data.finalLongi,
    timestamp: data.timestamp,
  });
});

// User Login
app.post("/login", (request, response) => {
  const loginData = request.body;
  console.log("Logged");
  const timestamp = Date.now();
  loginData.timestamp = timestamp;
  console.log(loginData);

  database.insert(loginData);

  response.json({
    status: "login success",
    userName: loginData.userName,
    password: "***"
  });
});

//get request

// app.get("/api", (request, response) => {
//     console.log(request)
//   database.find({}, (err, data) => {
//     if (err) {
//       console.log(err);
//       response.end();
//       return;
//     }
//     response.json(data);
//     console.log(response.data);
//   });
// });