const express = require("express");
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const authValidation = require("../validations/auth.validation");

const router = express.Router();

router.post("/signup", validate(authValidation.signup), authController.signUp);
router.post("/login", validate(authValidation.login), authController.login);

module.exports = router;
