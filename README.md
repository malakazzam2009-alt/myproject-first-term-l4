# E-Commerce Backend API

A RESTful E-Commerce Backend API built with **Node.js**, **Express.js**, and **MongoDB** following the MVC architecture.

This project was developed as the Level 4 Web Development Final Project. It provides APIs for managing categories, products, shopping carts, and orders.

---

# Features

- Categories CRUD
- Products CRUD
- Product filtering
- Shopping cart management
- Order management
- Checkout process
- Global error handling
- MongoDB data seeding
- MVC architecture

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- express-validator
- express-mongo-sanitize
- dotenv
- slugify

---

# Prerequisites

Before running this project, make sure you have:

- Node.js
- npm
- MongoDB (Local or Atlas)

---

# Installation

### 1. Clone the repository

```bash
git clone https://github.com/malakazzam2009-alt/myproject-first-term-l4.git
```

### 2. Go to the project folder

```bash
cd myproject-first-term-l4
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a .env file

Copy the variables from `.env.example` and add your own values.

Example:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
```

### 5. Seed the database

```bash
npm run seed
```

### 6. Start the development server

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

---

# Environment Variables

| Variable | Description | Example |
|-----------|-------------|---------|
| PORT | Server port | 3000 |
| NODE_ENV | Application environment | development |
| MONGO_URI | MongoDB connection string | mongodb://127.0.0.1:27017/ecommerce |

---

# Available Scripts

```bash
npm start
```

Starts the server.

```bash
npm run dev
```

Starts the server using Nodemon.

```bash
npm run seed
```

Seeds the database with sample categories and products.

---

# API Endpoints

## Categories

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/categories | Get all categories |
| GET | /api/categories/:id | Get category by ID |
| POST | /api/categories | Create category |
| PUT | /api/categories/:id | Replace category |
| PATCH | /api/categories/:id | Update category |
| DELETE | /api/categories/:id | Delete category |

---

## Products

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product by ID |
| POST | /api/products | Create product |
| PUT | /api/products/:id | Replace product |
| PATCH | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |

### Product Filters

Examples:

```
GET /api/products?category=<categoryId>
```

```
GET /api/products?minPrice=100
```

```
GET /api/products?maxPrice=500
```

```
GET /api/products?minPrice=100&maxPrice=500
```

```
GET /api/products?search=laptop
```

```
GET /api/products?inStock=true
```

---

## Cart

##### All cart endpoints require a request header:

```
sessionid: user123
```

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/cart | Get cart |
| POST | /api/cart/items | Add item |
| PUT | /api/cart/items/:productId | Update quantity |
| PATCH | /api/cart/items/:productId | Update quantity |
| DELETE | /api/cart/items/:productId | Remove item |
| DELETE | /api/cart | Clear cart |

---

## Orders

##### All order creation requests require:

```
sessionid: user123
```

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/orders | Get all orders |
| GET | /api/orders/:id | Get order by ID |
| POST | /api/orders | Create order |
| PUT | /api/orders/:id/status | Update order status |
| PATCH | /api/orders/:id/status | Update order status |

---

# Project Structure

```
myproject-first-term-l4
│
├── config/
│   └── Application configuration
│
├── controllers/
│   └── Business logic
│
├── db/
│   └── MongoDB connection
│
├── middleware/
│   └── Error handling middleware
│
├── models/
│   └── Mongoose schemas
│
├── postman/
│   └── Exported Postman collection
│
├── routes/
│   └── API routes
│
├── utils/
│   ├── AppError
│   └── asyncHandler
│
├── .env.example
├└──── app.js
├── server.js
├── seed.js
├── package.json
 README.md
```

---

# Postman

The exported Postman Collection (v2.1) is available inside:

```
postman/
```

It contains all Categories, Products, Cart, and Orders endpoints.

---

# Notes

- Use the following request header for Cart APIs:

```
sessionid: user123
```

- Use the same header when creating orders.

- Product filtering supports:

  - category
  - search
  - minPrice
  - maxPrice
  - inStock

- Seed the database before testing the APIs.

---

# Author
Malak Waleed saad Azzam

Level 4 Web Development Final Project