const passport = require("passport");
const { prisma } = require("../lib/prisma");

const JwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;

let opts = {};

opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_READER;

const strategy = new JwtStrategy(opts, async (just_payload, done) => {
  const user = await prisma.users.findUnique({
    where: {
      id: just_payload.user.id,
    },
    omit: {
      password: true
    }
  });

  console.log("user:", user);
  if (!user) {
    return done(null, { username: "" });
  }
  return done(null, user);
});

passport.use(strategy);

strategy;
