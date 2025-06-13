const express = require("express");
const { google } = require("googleapis");
const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Server is running " });

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
});

app.listen(8000, () => {
  console.log(`Server is running on port - 8000`);
});
