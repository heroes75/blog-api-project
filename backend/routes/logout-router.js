const { Router } = require("express");
const logoutController = require("../controllers/logout-controller");

const logoutRouter = Router();

logoutRouter.get("/", logoutController);

module.exports = logoutRouter;
