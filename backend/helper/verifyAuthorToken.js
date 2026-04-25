const jwt = require("jsonwebtoken");
function verifyAuthorToken(req, res, next) {
  const bearer = req.headers["authorization"];

  if (typeof bearer === "undefined") {
    req.user = undefined;
  } else {
    const bearerToken = bearer.split(" ");
    const token = bearerToken[1];

    jwt.verify(token, process.env.SECRET_AUTHOR, function (err, authData) {
      if (err) {
        console.error(err);
      } else {
        req.user = authData.user;
      }
    });
  }
  next();
}

module.exports = verifyAuthorToken;
