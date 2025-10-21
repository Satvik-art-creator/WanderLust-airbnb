const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const ExpError = require("../utils/expError.js");
const {listSchema, reviewSchema} = require("../schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You need to Login first!");
        return res.redirect("/login"); // ✅ return stops further execution
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) res.locals.redirectUrl = req.session.redirectUrl;
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have the required permissions!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

//validating list schema middleware
module.exports.valdLists = (req, res, next) => {
    let {error} = listSchema.validate(req.body);
    // console.log(req.body);

    if(error) throw new ExpError(400, error); 
    else next();  //goes to non-error handling middleware
}

/* ********************* Review ********************** */

module.exports.isAuthor = async (req, res, next) => {
    let {id, revId} = req.params;
    let review = await Review.findById(revId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You aren't the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

//validating review schema middleware
module.exports.valdRevs = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);

    if(error) throw new ExpError(400, error);
    else next();
}