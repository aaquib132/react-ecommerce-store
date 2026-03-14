const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: Number,
    comment: String,
    date: Date,
    reviewerName: String,
    reviewerEmail: String,
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,
    category: String,
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    brand: String,
    sku: String,
    weight: Number,

    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
    },

    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,

    reviews: [reviewSchema],

    returnPolicy: String,
    minimumOrderQuantity: Number,

    meta: {
      barcode: String,
      qrCode: String,
    },

    images: [String],
    thumbnail: String,
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
