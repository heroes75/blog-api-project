const { Router } = require("express");
const signupController = require("../controllers/signup-controller");

const signupRouter = Router();

signupRouter.post("/", signupController);

module.exports = signupRouter;
