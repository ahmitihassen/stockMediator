const express = require("express");
const https = require("https");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(
  cors({
    methods: ["GET"],
  })
);

///add routes
app.use("/du", require("./routes/duRoute"));
app.use("/item", require("./routes/itemRoute"));

///Create and start https server
const keyPath = path.join(__dirname, "./cert/key.pem");
const certPath = path.join(__dirname, "./cert/cert.pem");
const port = process.env.PORT;
const options = {};

if (fs.existsSync(keyPath)) {
  options.key = fs.readFileSync(keyPath);
}

if (fs.existsSync(certPath)) {
  options.cert = fs.readFileSync(certPath);
}

const sslServer = https.createServer(options, app);

sslServer.listen(port, () => {
  console.log(`Secure server is listening on ${port}`);
});
