const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
app.use(express.json());
app.use(cors());
require("dotenv").config();

// Models
const UsersModel = require("./models/UsersSchema");

mongoose.connect(process.env.MONGODBURI);

app.listen(3001, () => {
    console.log("App listening on port 3000!");
});
