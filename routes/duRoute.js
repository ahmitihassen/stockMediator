const express = require("express");
const router = express.Router();

const duController = require("../controllers/duController");
const dbSyncMiddleware = require("../middlewares/dbSyncMiddleware");

router.use(dbSyncMiddleware);

router.get("/", duController.getAllDu);

module.exports = router;
