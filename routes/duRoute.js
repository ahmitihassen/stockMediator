const express = require("express");
const router = express.Router();

const duController = require("../controllers/duController");
const dbSyncMiddleware = require("../middlewares/dbSyncMiddleware");
const errorHandlingMiddleware = require("../middlewares/errorHandlingMiddleware");
const loggerMiddleware = require("../middlewares/loggerMiddleware");

router.use(dbSyncMiddleware);

router.get("/", duController.getAllDu, loggerMiddleware);
router.post("/",duController.updateDu, loggerMiddleware)

router.use(errorHandlingMiddleware);
module.exports = router;
