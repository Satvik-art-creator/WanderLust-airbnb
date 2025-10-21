const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isAuthor, valdRevs} = require("../utils/middleware.js");
const reviewController = require("../controllers/reviews.js");

//adding reviews for a listing
router.post("/", isLoggedIn, valdRevs, wrapAsync(reviewController.addReviews));

//delete reviews from a listing
router.delete("/:revId", isLoggedIn, isAuthor, wrapAsync(reviewController.delReviews));

module.exports = router;