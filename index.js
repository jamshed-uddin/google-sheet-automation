const express = require("express");
const { google } = require("googleapis");
const app = express();
require("dotenv").config();

app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  //   create client instance for auth
  const client = await auth.getClient();

  //   instance of google sheet api

  const googlesheets = google.sheets({
    version: "v4",
    auth: client,
  });

  const spreadsheetId = process.env.SHEET_ID;

  const metadata = await googlesheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });
  const getRows = await googlesheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Apply!A:A",
  });
  res.send({ message: "Server is running ", data: metadata, rows: getRows });
});

app.listen(8000, () => {
  console.log(`Server is running on port - 8000`);
});
