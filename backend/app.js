require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`listen at http://localhost:${process.env.PORT}`);
});
