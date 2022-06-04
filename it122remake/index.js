"use strict";
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const Cosmetic = require("./models/cosmeticModel");

dotenv.config({ path: "./config.env" });

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(express.json());
app.use("/api", cors());

/*
 * Old server side rendering code
  app.get("/", (req, res) => {
    res.render("home", {
    });
});

app.get("/detail", (req, res) => {
    const product = getProductFromQuery(req.url);

    if (product) {
        res.render("detail", { product });
    } else {
        res.render("detail", { error: "product not found" });
    }
});
 */

//------------------Server side rendering------------------------------
app.get("/", (req, res, next) => {
  const fields = "name type brand price";
  Cosmetic.find({})
    .select(fields)
    .lean()
    .then((products) => {
      res.render("home", {
        products: JSON.stringify(products),
      });
    })
    .catch((err) => next(err));
});

app.get("/detail", (req, res, next) => {
  const search_term = new RegExp(req.query.name.replace("%20", " "), "i");
  Cosmetic.findOne({ name: search_term })
    .lean()
    .then((product) => {
      res.render("detail", { product: JSON.stringify(product) });
    })
    .catch((err) => next(err));
});

app.get("/about", (req, res) => {
  res.render("about");
});
//--------------- end of server side rendering ----------------------------

//--------------- REST API ------------------------------------------------
app.get("/api/products", (req, res, next) => {
  Cosmetic.find({})
    .lean()
    .then((products) => {
      res.status(200).json({
        message: "success",
        products,
      });
    })
    .catch((err) => next(err));
});

app.get("/api/products/detail/:id", (req, res, next) => {
  const id = req.params.id;
  Cosmetic.findById(id)
    .lean()
    .then((product) => {
      if (product) {
        res.status(200).json({
          message: "success",
          product,
        });
      } else {
        res.status(404).send("Product not found");
      }
    })
    .catch((err) => next(err));
});

app.post("/api/products/add", (req, res, next) => {
  const product = new Cosmetic(req.body);
  product
    .save()
    .then((product) => {
      res.status(200).json({
        message: "success",
        product,
      });
    })
    .catch((err) => next(err));
});

app.delete("/api/products/delete/:id", (req, res, next) => {
  const id = req.params.id;
  const product = Cosmetic.findByIdAndDelete(id);
  if (!product) {
    res.status(404).send("Product not found");
  } else {
    res.status(204).send("Product deleted");
  }
});

//-------------end of REST API --------------------------------------------

app.listen(app.get("port"), () => {
  console.log("Express started");
});
