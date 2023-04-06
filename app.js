var express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

require('./connectdatabase')
require("./auth")(app)
require("./show")(app)


app.listen(8000, function () {
	console.log("BAKA Server is Runing");
  });