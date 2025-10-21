const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

module.exports.addReviews = async (req, res) => {
    let {id} = req.params;
    const list = await Listing.findById(id);
    const rev = new Review(req.body.review);
    rev.author = req.user._id;
    list.reviews.push(rev);
    await rev.save();
    await list.save();

    req.flash("success", "Review created successfully!");
    res.redirect(`/listings/${id}`);
}

module.exports.delReviews = async (req, res) => {
    let {id, revId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: revId}});
    await Review.findByIdAndDelete(revId);

    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
}