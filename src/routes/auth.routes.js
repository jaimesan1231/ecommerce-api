const { Router } = require("express");

const ctrAuth = require("../controllers/auth.controller");
const routerAuth = Router();

routerAuth.get("/", ctrAuth.singIn);
routerAuth.post("/singin", ctrAuth.singIn);
routerAuth.post("/singup", ctrAuth.singUp);

module.exports = routerAuth;
