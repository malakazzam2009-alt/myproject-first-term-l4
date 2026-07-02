require("dotenv").config();

const connectDB = require("./config/db");

const Category = require("./models/Category");
const Product = require("./models/Product");

const categories = [
  { name: "Electronics" },
  { name: "Clothing" },
  { name: "Books" },
];

const seedData = async () => {
  try {
    await connectDB();

    await Category.deleteMany();
    await Product.deleteMany();

    console.log("Old data deleted.");

    const createdCategories = await Category.insertMany(categories);

    console.log("Categories added.");

    const products = [
      {
        name: "Laptop",
        description: "Dell Laptop",
        price: 1200,
        stock: 10,
        category: createdCategories[0]._id,
      },
      {
        name: "T-Shirt",
        description: "Cotton T-Shirt",
        price: 25,
        stock: 50,
        category: createdCategories[1]._id,
      },
      {
        name: "JavaScript Book",
        description: "Learn JavaScript",
        price: 40,
        stock: 20,
        category: createdCategories[2]._id,
      },
    ];

    await Product.insertMany(products);

    console.log("Products added.");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();