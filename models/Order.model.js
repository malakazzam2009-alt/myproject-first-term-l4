const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    // Unique order number
    orderNumber: {
      type: String,
      unique: true,
      default: () => Date.now().toString(),
    },

    // List of ordered products
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required"],
        },

        name: {
          type: String,
          required: [true, "Product name is required"],
          trim: true,
        },

        price: {
          type: Number,
          required: [true, "Product price is required"],
          min: [0, "Price cannot be negative"],
        },

        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price cannot be negative"],
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    shippingAddress: {
      street: String,
      city: String,
      country: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);