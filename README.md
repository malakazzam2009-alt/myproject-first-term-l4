# My project frist term L4

## Project Description

This project is an E-Commerce Backend API built using Node.js, Express.js, and MongoDB. It provides RESTful APIs for managing categories, products, carts, and orders.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- express-mongo-sanitize
- bcryptjs
- jsonwebtoken
- slugify
- cors
- nodemon

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

## Run the Project

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Seed Database

```bash
npm run seed
```

## API Endpoints

### Categories

- GET `/api/categories`
- GET `/api/categories/:id`
- POST `/api/categories`
- PUT `/api/categories/:id`
- PATCH `/api/categories/:id`
- DELETE `/api/categories/:id`

### Products

- GET `/api/products`
- GET `/api/products/:id`
- POST `/api/products`
- PUT `/api/products/:id`
- PATCH `/api/products/:id`
- DELETE `/api/products/:id`

### Cart

- GET `/api/cart`
- POST `/api/cart/items`
- PUT `/api/cart/items/:productId`
- PATCH `/api/cart/items/:productId`
- DELETE `/api/cart/items/:productId`
- DELETE `/api/cart`

### Orders

- GET `/api/orders`
- GET `/api/orders/:id`
- POST `/api/orders`
- PUT `/api/orders/:id/status`
- PATCH `/api/orders/:id/status`

## Project Structure

```
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
```

## Author
Malak waleed saad azzam
Level 4 Web Development Project