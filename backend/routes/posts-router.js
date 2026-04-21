require('../config/passport')
const {Router} = require('express')
const passport = require('passport')
const { getAllPosts, createPost, updatePost, deletePost, getAllPostOfUser, getPost, getCreatePost, getUpdatePostPage } = require('../controllers/posts-controller')
const { postComment, updateComment, deleteComment } = require('../controllers/comments-controller')
// verifyReaderToken verify user comme from frontend for see posts and read comment
const verifyReaderToken  = require('../helper/verifyReaderToken')
const verifyAuthorToken = require('../helper/verifyAuthorToken')
// const strategy = require('../config/passport')
// passport.use(strategy)

const postsRouter = Router()

postsRouter.get('/', passport.authenticate('jwt', {session: false}), getAllPosts)
postsRouter.post('/', verifyAuthorToken, createPost)
postsRouter.get('/authors', verifyAuthorToken, getCreatePost)
postsRouter.get('/dashboard', verifyAuthorToken, getAllPostOfUser)
postsRouter.get('/:postId', verifyReaderToken, getPost)
postsRouter.post('/:postId/comments', passport.authenticate('jwt', {session: false}), postComment)
postsRouter.put('/:postId', verifyAuthorToken, updatePost)
postsRouter.get('/update/:postId', verifyAuthorToken, getUpdatePostPage)
postsRouter.delete('/:postId', verifyAuthorToken, deletePost)
postsRouter.put('/:postId/comments/:commentId', passport.authenticate('jwt', {session: false}), updateComment)
postsRouter.delete('/:postId/comments/:commentId', passport.authenticate('jwt', {session: false}), deleteComment)

module.exports = postsRouter