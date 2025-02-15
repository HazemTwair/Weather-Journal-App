// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;

const server = app.listen(port, () => {
    console.log(`Running on localhost:${port}`);
});

app.get("/getData", function (req, res) {
    res.send(projectData);
});

app.post("/addData", function (req, res) {
    const { temperature, date, userResponse } = req.body;
    projectData.temp = temperature;
    projectData.date = date;
    projectData.feel = userResponse;

    res.send(projectData);
});
