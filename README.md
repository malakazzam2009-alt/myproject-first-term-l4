# E-Commerce Backend API

## About the Project

This is my first term backend project for Level 4.
I built a simple E-Commerce REST API using Node.js, Express.js, and MongoDB.
The project allows users to manage categories, products, carts, and orders.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- cors
- slugify
- express-mongo-sanitize
- nodemon

## Installation

Clone the project:

```bash
git clone <repository-url>
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

**Malak Waleed Saad Azzam**

Level 4 – First Term Web Development Project