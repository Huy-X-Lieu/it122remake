const Cosmetic = require("./models/cosmeticModel");

// Test to see if we can get all products
Cosmetic.find({}, (err, cosmetics) => {
  if (err) {
    console.log(err);
  } else {
    console.log(cosmetics);
  }
});

// Test to see if we can get products with certain specifications
Cosmetic.find({ type: "water cleanser" })
  .lean()
  .then((product) => {
    console.log(product);
  });

// Test to see if we can get a single product with a certain specification
const search_pattern = new RegExp("new product", "i");
Cosmetic.findOne({ name: search_pattern })
  .lean()
  .then((product) => {
    console.log(product);
  });

//insert or update a single record
const newProduct = {
  name: "new Product",
  price: 100,
  brand: "new Brand",
  volume: 100,
  ratingAmount: 100,
  ratingAverage: 4.9,
  promote: "new Promote",
  image: "new Image",
  ingredient: ["new Ingredient 1", "new Ingredient 2", "new Ingredient 3"],
  description: ["new Description"],
  skinConcern: ["new Skin Concern"],
};
Cosmetic.updateOne(
  { name: "new Product" },
  newProduct,
  { upsert: true },
  (err, product) => {
    if (err) {
      return next(err);
    } else {
      console.log(product);
    }
  }
);

// Test to see if we can delete a single record with a certain specification
//const search_pattern = new RegExp("new product", "i");
Cosmetic.deleteOne({ name: search_pattern }, (err, product) => {
  if (err) {
    return next(err);
  } else {
    console.log(product);
  }
});
