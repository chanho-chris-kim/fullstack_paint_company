const express = require("express");
const router = express.Router();
const {
  getAuth,
} = require("../controllers/loginController");

// routes for login
router.route("/").get(getAuth);

module.exports = router;
