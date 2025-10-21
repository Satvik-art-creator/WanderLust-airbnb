const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(`Database not found. Error: ${err}`));

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => (
        {...obj, owner: "68e8a8bc2df659b22dc732ad"}
    ));
    await Listing.insertMany(initData.data);
    // console.log("data initialised");
}

initDB();

