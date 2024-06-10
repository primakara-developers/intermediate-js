const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const port = 3000;

dotenv.config();

const routes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
