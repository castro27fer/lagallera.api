const { Router } = require('express');

const streaming = require("../controller/streaming.js");
const socket = require("../controller/socket.controller.js");

const router = Router();

// router.use("/auth",require("./auth.router.js"));


// router.get("/crimes",catalog.get_crimes.getList);}}
router.post("room",socket.createRoom);

module.exports = router;