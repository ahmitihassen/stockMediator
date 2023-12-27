const express = require("express");
const router = express.Router();

router.get("/",(req,res) => {
    res.send("du test route")
})

module.exports = router;