const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
require("dotenv").config();

app.listen(3001, () => {
    console.log("App listening on port 3000!");
});
