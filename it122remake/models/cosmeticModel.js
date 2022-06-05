const mongoose = require("mongoose");
const { Schema } = mongoose;
const { connectionString } = require("./../utils/credentials");

mongoose.connect(connectionString, {
    dbName: "cosmetic",
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("open", () => {
    console.log("connected to DB");
});

const cosmeticSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    volume: { type: Number, required: true },
    ratingAmount: { type: Number, required: true },
    ratingAverage: { type: Number, required: true },
    promote: { type: String },
    image: { type: [String], required: true },
    ingredient: { type: [String], required: true },
    description: { type: [String], required: true },
    skinType: { type: [String], required: true },
    skinConcern: { type: [String], required: true },
    effect: { type: [String], required: true },
    usage: { type: [String], required: true },
});


const Cosmetic = mongoose.model("Cosmetic", cosmeticSchema);
module.exports = Cosmetic;
