// require('../config/passport')
const {Router} = require('express')
const passport = require('passport')
const { getAllPosts, createPost, updatePost } = require('../controllers/posts-controller')
// const strategy = require('../config/passport')
// passport.use(strategy)

const postsRouter = Router()

postsRouter.get('/', passport.authenticate('jwt', {session: false}), getAllPosts)
postsRouter.post('/', passport.authenticate('jwt', {session: false}), createPost)
postsRouter.put('/:postId', passport.authenticate('jwt', {session: false}), updatePost)

module.exports = postsRouter