const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: [true, "Order number is required"],
      unique: true,
    },

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
      enum: {
        values: [
          "Pending",
          "confirmed",
          "Shipped",
          "Delivered",
          "Cancelled",
        ],
        message: "Invalid order status",
      },
      default: "Pending",
    },

    shippingAddress: {
      type: String,
      required: [true, "Shipping address is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);