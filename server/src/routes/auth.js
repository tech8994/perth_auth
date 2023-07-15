const { Router } = require("express");
const { register, getAllUser, loggedin } = require("../controllers/auth");
const { validationMiddleware } = require("../middlewares/validator-middleware");
const { registrationValue, isLoggedInValidation } = require("../validators/auth");
const router = Router();

router.post("/", (req, res) => {
  res.send("The Route is working");
});
router.get("/getUser",getAllUser)
router.post("/register", registrationValue,validationMiddleware,register);
router.post("/login-in",isLoggedInValidation, validationMiddleware, loggedin)

module.exports = router;
