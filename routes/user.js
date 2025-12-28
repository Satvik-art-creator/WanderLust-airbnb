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

  router.get('/login/federated/google', passport.authenticate('google'));
  router.get('/oauth2/redirect/google', passport.authenticate('google', {
    failureRedirect: '/login',
    failureFlash: true,
  }),
    (req, res) => {
    // console.log(req.user);
    const name = req.user.name || '';
    req.flash('success', `Hey ${name}, Welcome to the WanderLust!!`);
    res.redirect('/listings');
  }
  );

//logout
router.get("/logout", userController.logOut);

module.exports = router;
