require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./db/connectDB");

const Category = require("./models/Category.model");
const Product = require("./models/Product.model");
const Cart = require("./models/Cart.model");
const Order = require("./models/Order.model");

const categories = [
  {
    name: "Electronics",
    description: "Electronic devices",
  },
  {
    name: "Clothing",
    description: "Men and Women Clothing",
  },
  {
    name: "Books",
    description: "Books and Novels",
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Delete old data
    await Order.deleteMany();
    await Cart.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    console.log("Old data deleted.");

    // Insert Categories
    const createdCategories = await Category.insertMany(categories);

    console.log("Categories added.");

    // Insert Products
    const products = [
      {
        name: "Dell Laptop",
        description: "Dell Inspiron Laptop",
        price: 1200,
        stock: 10,
        category: createdCategories[0]._id,
        images: [],
      },
      {
        name: "iPhone 15",
        description: "Apple Smartphone",
        price: 1500,
        stock: 15,
        category: createdCategories[0]._id,
        images: [],
      },
      {
        name: "T-Shirt",
        description: "Cotton T-Shirt",
        price: 25,
        stock: 50,
        category: createdCategories[1]._id,
        images: [],
      },
      {
        name: "Jeans",
        description: "Blue Jeans",
        price: 40,
        stock: 30,
        category: createdCategories[1]._id,
        images: [],
      },
      {
        name: "JavaScript Book",
        description: "Learn JavaScript",
        price: 35,
        stock: 20,
        category: createdCategories[2]._id,
        images: [],
      },
      {
        name: "Node.js Book",
        description: "Master Node.js",
        price: 45,
        stock: 18,
        category: createdCategories[2]._id,
        images: [],
      },
    ];

    const createdProducts = await Product.insertMany(products);

    console.log("Products added.");

    console.log(`
Seed completed successfully.
Categories: ${createdCategories.length}
Products: ${createdProducts.length}
`);

  } catch (error) {
    console.error("Seed failed.");
    console.error(error.message);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

seedData();