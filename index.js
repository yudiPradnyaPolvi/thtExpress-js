const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const routerV2 = require("./src/application/v2.routes");

// app.use(bodyParser);
app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log(`time : ${Date.now()}`);
  next();
});

app.use("/", routerV2);

app.use("/api/v2", routerV2);

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send({ message: "terjadi kesalahan :(" });
});
const PORT = 3000;
app.listen(PORT);
console.log("application running on port ", PORT);
