const passport = require('passport')
const { prisma } = require('../lib/prisma')

const JwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

let opts = {}

opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET

const strategy = new JwtStrategy(opts, (just_payload, done) => {
    console.log('just_payload:', just_payload)
    const user = prisma.users.findUnique({
        where: {
            id: just_payload.id
        }
    })

    if (!user) {
        return done(null, false)
    }
    return done(null, user)

})

// passport.use(strategy)

module.exports = strategy