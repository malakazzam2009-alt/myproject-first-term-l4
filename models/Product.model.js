const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    // Product name
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    // Product description
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },

    // Product price
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },

    // Available stock
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      default: 0,
      min: [0, "Stock cannot be negative"],
    },

    // Reference to the product category
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },

    // Product images
    images: {
      type: [String],
      default: [],
    },
  },
  {
    // Add createdAt and updatedAt automatically
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Check if the product is available in stock
productSchema.virtual("inStock").get(function () {
  return this.stock > 0;
});

module.exports = mongoose.model("Product", ProductSchema);