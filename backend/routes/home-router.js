const { Router } = require("express");
const { getAllPosts } = require("../controllers/posts-controller");

const homeRouter = Router()

homeRouter.get('/', getAllPosts)

module.exports = homeRouter

