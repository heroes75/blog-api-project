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

const corsPolicy = {
  "origin": [/http:\/\/localhost:*/, /http:\/\/127.0.0.1:5174\/?/, 'https://blog-api-project-frontend-author.vercel.app', 'https://cute-gnome-b9e595.netlify.app', 'https://blog-api-project-frontend-author-1amn7kx73-heroes75s-projects.vercel.app'],
  "methods": ['GET', 'PUT', 'POST', 'DELETE'],
  "allowedHeaders": ['Content-Type', 'Authorization', 'authorization'],
  "credentials": true,
  "preflightContinue": true,
  "optionsSuccessStatus": 204
}
app.use(cors(corsPolicy))
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


app.use('/', (req, res) => {
  res.status(401).json({message: 'We don\'t find what you want'})
})

app.use('/', (req, res, next, err) => {
  res.status(500).json({message: 'Server Error'})
})

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`listen at http://localhost:${process.env.PORT}`);
});
