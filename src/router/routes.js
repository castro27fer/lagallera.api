const { Router } = require('express');
const g = require("../middleware/global.middleware.js");

const router = Router();

router.get("/",(req,res) =>{
    res.json({"lagallera.com":"Bienvenido a la gallera..."});
});

router.use("/auth",require("./auth.route.js"));
router.use("/stream",g.authentication,require("./stream.route.js"));
router.use("/receptor",require("./receptor.route.js"));


module.exports = router;