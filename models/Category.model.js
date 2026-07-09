const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("save", function () {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
});

module.exports = mongoose.model("Category", categorySchema);