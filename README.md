# E-Commerce Backend API

## About the Project

This is my first backend project for Level 4.

I built a simple E-Commerce API using **Node.js**, **Express.js**, and **MongoDB**.

The project can manage categories, products, cart, and orders.

## Features

* Categories CRUD
* Products CRUD
* Product filtering
* Shopping cart
* Orders
* Checkout

## Technologies

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* cors
* slugify
* express-mongo-sanitize
* nodemon

## Prerequisites

Before running the project, make sure you have:

* Node.js
* npm
* MongoDB

## Installation

Clone the project:

```bash
git clone <https://github.com/malakazzam2009-alt/myproject-first-term-l4>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

## Environment Variables

| Variable  | Description        | Example                          |
| --------- | ------------------ | -------------------------------- |
| PORT      | Server port        | 3000                             |
| NODE_ENV  | Development mode   | development                      |
| MONGO_URI | MongoDB connection | mongodb://localhost:27017/testdb |

## Run the Project

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

## Seed the Database

```bash
npm run seed
```

## API Routes

### Categories

* GET `/api/categories`
* GET `/api/categories/:id`
* POST `/api/categories`
* PUT `/api/categories/:id`
* PATCH `/api/categories/:id`
* DELETE `/api/categories/:id`

### Products

* GET `/api/products`
* GET `/api/products/:id`
* POST `/api/products`
* PUT `/api/products/:id`
* PATCH `/api/products/:id`
* DELETE `/api/products/:id`

### Cart

* GET `/api/cart`
* POST `/api/cart/items`
* PUT `/api/cart/items/:productId`
* PATCH `/api/cart/items/:productId`
* DELETE `/api/cart/items/:productId`
* DELETE `/api/cart`

### Orders

* GET `/api/orders`
* GET `/api/orders/:id`
* POST `/api/orders`
* PUT `/api/orders/:id/status`
* PATCH `/api/orders/:id/status`

## Project Structure

```text
config/
controllers/
middlewares/
models/
routes/
utils/
app.js
server.js
seed.js
package.json
README.md
.env.example
.gitignore
```

## Author

**Malak Waleed Saad Azzam**

Level 4 – First Term Web Development Project
