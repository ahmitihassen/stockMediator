const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");
const dbSyncMiddleware = require("../middlewares/dbSyncMiddleware");
const errorHandlingMiddleware = require("../middlewares/errorHandlingMiddleware");
const loggerMiddleware = require("../middlewares/loggerMiddleware");

router.use(dbSyncMiddleware);

router.get("/:duName", itemController.getAllDuItems, loggerMiddleware);
router.get("/:duName/:itemId", itemController.getDuItem, loggerMiddleware);
router.post("/", itemController.updateItems,loggerMiddleware);

router.use(errorHandlingMiddleware);
module.exports = router;
