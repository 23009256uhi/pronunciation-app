const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to verify that the backend server is running
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Endpoint for speech analysis will be added here

app.listen(port, () => {
  console.log(`Server is running on port ${PORT}`);
});
