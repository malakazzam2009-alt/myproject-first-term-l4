const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required"],
        },

        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          default: 1,
          min: [1, "Quantity must be at least 1"],
        },

        price: {
          type: Number,
          required: [true, "Price is required"],
        },
      },
    ],

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);