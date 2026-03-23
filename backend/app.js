require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const signupRouter = require("./routes/signup-route");

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.use('/signup', signupRouter)

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`listen at http://localhost:${process.env.PORT}`);
});
