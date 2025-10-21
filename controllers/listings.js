const Listing = require("../models/listing.js");

const mapBoxToken = process.env.MAPBOX_TOKEN;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken:  mapBoxToken});

module.exports.index = async (req, res) => {
  const allListings = await Listing.find();
  // console.log(allListings);
  res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let listInfo = req.body.listing;
  const newListing = new Listing(listInfo);
  newListing.owner = req.user._id;
  newListing.image = { filename, url };

  let response = await geocodingClient.forwardGeocode({
  query: `${listInfo.location}, ${listInfo.country}`,
  limit: 1
  })
  .send();
  newListing.geometry = response.body.features[0].geometry;

  await newListing.save();
  req.flash("success", "List created successfully!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listData = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  // console.log(listData);
  if (!listData) {
    req.flash("error", "List not exist!");
    res.redirect("/listings");
  } else {
    res.render("listings/show", { listData });
  }
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listData = await Listing.findById(id);

  let orgListingUrl = listData.image.url.replace("/upload", "/upload/h_250,w_250/e_blur:100");

  if (!listData) {
    req.flash("error", "List not exist!");
    res.redirect("/listings");
  } else {
    res.render("listings/edit", { listData, orgListingUrl });
  }
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let list = req.body.listing;
  let editList = await Listing.findByIdAndUpdate(id, list);
  if(req.file){
    let url = req.file.path;
    let filename = req.file.filename;
    editList.image = {filename, url};
    await editList.save();
  }
  req.flash("success", "List updated successfully!");
  res.redirect("/listings");
};

module.exports.delListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);

  req.flash("success", "List deleted successfully!");
  res.redirect("/listings");
};
