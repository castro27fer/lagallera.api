const { Router } = require('express');
const c = require("../controller/receptor.controller");
const v = require("../middleware/validate.middleware")

const router = Router();

router.get("/:streamingId",c.get_acces_to_streaming);

module.exports = router;