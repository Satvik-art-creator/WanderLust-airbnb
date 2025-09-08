const mongoose = require("mongoose");
const initData = require("./data.js");
const List = require("../models/listing.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(`Database not found. Error: ${err}`));

const initDB = async () => {
    await List.insertMany(initData);
}

initDB();

