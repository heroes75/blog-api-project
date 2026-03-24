require("dotenv").config();
require("./config/passport");
const express = require("express");
const cors = require("cors");
const signupRouter = require("./routes/signup-route");
const loginRouter = require("./routes/login-router");
const postsRouter = require("./routes/posts-route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/posts", postsRouter);

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`listen at http://localhost:${process.env.PORT}`);
});
