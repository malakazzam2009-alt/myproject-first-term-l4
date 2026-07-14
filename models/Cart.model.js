const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    // Store the user's session ID
    sessionId: {
      type: String,
      required: true,
    },

    // List of items inside the cart
    items: [
      {
        // Reference to the product
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required"],
        },

        // Quantity of the selected product
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          default: 1,
          min: [1, "Quantity must be at least 1"],
        },

        // Product price when added to the cart
        price: {
          type: Number,
          required: [true, "Price is required"],
        },
      },
    ],

    // Total price of all cart items
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    // Add createdAt and updatedAt automatically
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);