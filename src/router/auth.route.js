const { Router } = require('express');
const auth = require("../controller/auth.controller");
const v = require("../middleware/validate.middleware")

const router = Router();

router.post("/login",[v.logIn],auth.logIn);

router.post("/logout",[v.logIn],auth.logOut);

module.exports = router;