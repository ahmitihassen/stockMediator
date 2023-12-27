const express = require("express");
const router = express.Router();

router.get("/",(req,res) => {
    res.send("item test route")
})

module.exports = router;