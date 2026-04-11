require('../config/passport')
const {Router} = require('express')
const passport = require('passport')
const { getAllPosts, createPost, updatePost, deletePost, getAllPostOfUser, getPost } = require('../controllers/posts-controller')
const { postComment, updateComment, deleteComment } = require('../controllers/comments-controller')
const verifyToken  = require('../helper/verifyToken')
// const strategy = require('../config/passport')
// passport.use(strategy)

const postsRouter = Router()

postsRouter.get('/', passport.authenticate('jwt', {session: false}), getAllPosts)
postsRouter.post('/', passport.authenticate('jwt', {session: false}), createPost)
postsRouter.get('/dashboard', passport.authenticate('jwt', {session: false}), getAllPostOfUser)
postsRouter.get('/:postId', verifyToken, getPost)
postsRouter.post('/:postId/comments', passport.authenticate('jwt', {session: false}), postComment)
postsRouter.put('/:postId', passport.authenticate('jwt', {session: false}), updatePost)
postsRouter.delete('/:postId', passport.authenticate('jwt', {session: false}), deletePost)
postsRouter.put('/:postId/comments/:commentId', passport.authenticate('jwt', {session: false}), updateComment)
postsRouter.delete('/:postId/comments/:commentId', passport.authenticate('jwt', {session: false}), deleteComment)

module.exports = postsRouter