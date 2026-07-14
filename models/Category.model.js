const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema(
  {
    // Category name
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },

    // Optional category description
    description: {
      type: String,
      trim: true,
    },

    // URL-friendly category name
    slug: {
      type: String,
    },
  },
  {
    // Add createdAt and updatedAt automatically
    timestamps: true,
  }
);

// Generate slug before saving the category
categorySchema.pre("save", function () {
  this.slug = slugify(this.name, {
    lower: true,
  });
});

module.exports = mongoose.model("Category", CategorySchema);