const passport = require('passport')
const { prisma } = require('../lib/prisma')

const JwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

let opts = {}

opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET

const strategy = new JwtStrategy(opts, async (just_payload, done) => {
    const user = await  prisma.users.findUnique({
        where: {
            id: just_payload.user.id
        }
    })

    if (!user) {
        return done(null, false)
    }
    return done(null, user)

})

passport.use(strategy)

//  strategy