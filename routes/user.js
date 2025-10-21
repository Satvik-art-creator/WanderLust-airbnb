const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../utils/middleware.js");
const passport = require("passport");
const userController = require("../controllers/user.js");

//signup
router
  .route("/signup")
  .get(userController.renderSignUp)
  .post(wrapAsync(userController.submitSignUp));

//login
router
  .route("/login")
  .get(async (req, res) => {
    res.render("users/login");
  })
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.submitLogin)
  );

//logout
router.get("/logout", userController.logOut);

module.exports = router;
