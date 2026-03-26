// require('../config/passport')
const {Router} = require('express')
const passport = require('passport')
const { getAllPosts, createPost, updatePost, deletePost, getAllPostOfUser, getPost } = require('../controllers/posts-controller')
// const strategy = require('../config/passport')
// passport.use(strategy)

const postsRouter = Router()

postsRouter.get('/', passport.authenticate('jwt', {session: false}), getAllPosts)
postsRouter.post('/', passport.authenticate('jwt', {session: false}), createPost)
postsRouter.get('/dashboard', passport.authenticate('jwt', {session: false}), getAllPostOfUser)
postsRouter.get('/:postId', passport.authenticate('jwt', {session: false}), getPost)
postsRouter.put('/:postId', passport.authenticate('jwt', {session: false}), updatePost)
postsRouter.delete('/:postId', passport.authenticate('jwt', {session: false}), deletePost)

module.exports = postsRouter