# My Project First Term L4

This is my Level 4 Web Development project.

The project is a simple REST API for an e-commerce system built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

It allows users to manage categories, products, shopping cart, and orders.

---

## Features

* Categories CRUD
* Products CRUD
* Product filtering
* Shopping cart management
* Checkout process
* Order management
* Error handling

---

## Technologies

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* CORS

---

## Available Scripts

Run the following commands in the project directory:

```bash
npm install
npm run dev
npm start
npm run seed
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/malakazzam2009-alt/myproject-first-term-l4.git
```

2. Move to the project folder:

```bash
cd myproject-first-term-l4
```

3. Install the required packages:

```bash
npm install
```

4. Create a `.env` file in the project root and add the following variables:

| Variable  | Description               |
| --------- | ------------------------- |
| PORT      | Server port number        |
| MONGO_URI | MongoDB connection string |

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

5. Start the development server:

```bash
npm run dev
```

6. Seed the database with sample data:

```bash
npm run seed
```

---

## Project Structure

```
config/
controllers/
models/
routes/

app.js
server.js
seed.js
package.json
```

---

## API Endpoints

### Categories

* GET /api/categories
* GET /api/categories/:id
* POST /api/categories
* PUT /api/categories/:id
* PATCH /api/categories/:id
* DELETE /api/categories/:id

### Products

* GET /api/products
* GET /api/products
* GET /api/products?category=:categoryId
* GET /api/products?minPrice=100
* GET /api/products?maxPrice=500
* GET /api/products/:id
* POST /api/products
* PUT /api/products/:id
* PATCH /api/products/:id
* DELETE /api/products/:id

### Cart

* GET /api/cart
* POST /api/cart
* PUT /api/cart
* PATCH /api/cart
* DELETE /api/cart/:productId
* DELETE /api/cart

### Orders

* POST /api/orders
* GET /api/orders
* GET /api/orders/:id
* PUT /api/orders/:id
* PATCH /api/orders/:id

---

## Author

**Malak Waleed Saad Azzam**

Level 4 Web Development Project
