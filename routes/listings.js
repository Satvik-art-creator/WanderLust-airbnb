const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, valdLists } = require("../utils/middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//index page
router.get("/", listingController.index);

router.get("/search", wrapAsync(listingController.searchLists));

router.get("/trending", wrapAsync(listingController.trendLists));

//new page
router
  .route("/new")
  .get(isLoggedIn, listingController.renderNewForm)
  .post(isLoggedIn, upload.single("listing[image]"), valdLists, wrapAsync(listingController.createListing));

//edit page
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//edited page
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), valdLists, wrapAsync(listingController.editListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.delListing));

module.exports = router;
