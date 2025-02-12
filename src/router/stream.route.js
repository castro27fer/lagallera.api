const { Router } = require('express');
const s = require("../controller/streaming.controller");
const v = require("../middleware/validate.middleware")

const router = Router();

router.post("/",s.create_streaming);
router.get("/configCertificate",s.keygenAlgorithm222);

router.get("/:streamingId",s.getStreaming);



module.exports = router;