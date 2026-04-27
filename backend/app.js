require("dotenv").config();
require("./config/passport");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const signupRouter = require("./routes/signup-router");
const loginRouter = require("./routes/login-router");
const postsRouter = require("./routes/posts-router");
const logoutRouter = require("./routes/logout-router");
const homeRouter = require("./routes/home-router");

const app = express();




app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", homeRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logoutRouter,
);
app.use("/posts", postsRouter);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`listen at http://localhost:${process.env.PORT}`);
});
