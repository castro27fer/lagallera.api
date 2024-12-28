const { Router } = require('express');
const auth = require("../controller/auth");
const v = require("../middleware/validate")

const router = Router();

router.post("/login",[v.logIn],auth.logIn);

router.post("/logout",auth.logOut);

module.exports = router;