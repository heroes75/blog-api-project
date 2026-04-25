const { Router } = require("express");
const { getAllPosts } = require("../controllers/posts-controller");
const verifyReaderToken = require("../helper/verifyReaderToken");

const homeRouter = Router();

homeRouter.get("/", verifyReaderToken, getAllPosts);

module.exports = homeRouter;
