const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");
const dbSyncMiddleware = require("../middlewares/dbSyncMiddleware");

router.use(dbSyncMiddleware);

router.get("/:duName", itemController.getAllDuItems);
router.get("/:duName/:itemId", itemController.getDuItem);

module.exports = router;
