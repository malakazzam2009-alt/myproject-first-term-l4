# My Project First Term L4

This is my Level 4 Web Development project.

The project is a simple REST API for an e-commerce system built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

It allows users to manage categories, products, shopping cart, and orders.

---

## Features

- Categories CRUD
- Products CRUD
- Product filtering
- Shopping cart
- Checkout
- Order management
- Error handling

---

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

---

## Installation

Clone the repository:

```bash
git clone https://github.com/malakazzam2009-alt/myproject-first-term-l4.git
```

Install dependencies:

```bash
npm install
```

Create a **.env** file and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Run the project:

```bash
npm run dev
```

To seed the database:

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

- GET /api/categories
- GET /api/categories/:id
- POST /api/categories
- PUT /api/categories/:id
- DELETE /api/categories/:id

### Products

- GET /api/products
- GET /api/products/:id
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id

### Cart

- GET /api/cart
- POST /api/cart
- PUT /api/cart
- DELETE /api/cart/:productId
- DELETE /api/cart

### Orders

- POST /api/orders
- GET /api/orders
- GET /api/orders/:id
- PUT /api/orders/:id

---

## Author

Malak Waleed saad azzam L4 