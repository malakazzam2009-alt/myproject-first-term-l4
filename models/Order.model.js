const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    // Unique order number
    orderNumber: {
      type: String,
      unique: true,
    },

    // List of ordered products
    items: [
      {
        // Reference to the product
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required"],
        },

        // Product name
        name: {
          type: String,
          required: [true, "Product name is required"],
          trim: true,
        },

        // Product price
        price: {
          type: Number,
          required: [true, "Product price is required"],
          min: [0, "Price cannot be negative"],
        },

        // Ordered quantity
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],

    // Total order price
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price cannot be negative"],
    },

    // Current order status
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

    // Shipping address
    shippingAddress: {
      street: String,
      city: String,
      country: String,
    },
  },
  {
    // Add createdAt and updatedAt automatically
    timestamps: true,
  }
);

// Generate an order number before saving
OrderSchema.pre("save", function () {
  if (!this.orderNumber) {
    this.orderNumber = Date.now().toString();
  }
});

module.exports = mongoose.model("Order", OrderSchema);