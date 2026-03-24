require('../config/passport')
const {Router} = require('express')
const passport = require('passport')
const { getAllPosts } = require('../controllers/posts-controller')
const strategy = require('../config/passport')
passport.use(strategy)

const postsRouter = Router()

postsRouter.get('/', passport.authenticate('jwt', {session: false}), getAllPosts)

module.exports = postsRouter