const { Router } = require('express');

const router = Router();

router.use("/auth",require("./auth.js"));

module.exports = router;