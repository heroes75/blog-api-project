const jwt = require("jsonwebtoken");
function verifyReaderToken(req, res, next) {
  const bearer = req.headers["authorization"];

  if (typeof bearer === "undefined") {
    req.user = undefined;
  } else {
    const bearerToken = bearer.split(" ");
    const token = bearerToken[1];

    jwt.verify(token, process.env.SECRET_READER, function (err, authData) {
      if (err) {
        console.error(err);
      } else {
        req.user = authData.user;
      }
    });
  }
  next();
}

module.exports = verifyReaderToken;
