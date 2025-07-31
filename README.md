# 🧠 Vision for a Special Inventory System – Backend

This is the backend for a robust, feature-rich Inventory Management System built with Node.js, Express, and MongoDB. It handles authentication, product management, stock tracking, purchases, sales, and more.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Auth)
- Zod (Validation)
- Multer (File Uploads)
- Winston (Logging)

---

## 📁 Folder Structure

```
src/
│
├── config/ # Environment configs
├── controllers/ # Route handlers
├── middlewares/ # Auth, error, validation
├── models/ # MongoDB schemas
├── routes/ # Express routers
├── services/ # Core business logic
├── utils/ # Common helpers
├── validations/ # Zod schemas
├── app.js # Express app config
└── server.js # Main entry point
readme.md
package.json
```

---

## 🔐 Authentication

- JWT-based access and refresh tokens
- Role-based access control (admin, staff)
- Middleware-protected routes

---

## 📦 Core Modules (MVP)

- User Auth (JWT + Roles)
- Product Management
- Category Management
- Supplier & Customer CRUD
- Purchase Orders (stock-in)
- Sales Orders (stock-out)
- Stock Alerts
- Basic dashboard endpoints

---

## 🛠️ Installation

```bash
git clone https://github.com/mihad-khadem/mern_inventory_management_app.git
cd mern_inventory_management_app
npm install
Create a .env file with:

ini
Copy
Edit
PORT=5000
DATABASE_URL=mongodb://localhost:27017/inventory
ACCESS_TOKEN_SECRET=your-secret
REFRESH_TOKEN_SECRET=your-refresh-secret
▶️ Running the Server
bash
Copy
Edit

# Development
npm run dev

# Production
npm run start
```

# 📫 API Endpoints

```

HTTP (Example)
Method Route Description
POST /api/auth/login Login and get token
GET /api/products Fetch products
POST /api/products Add new product
POST /api/purchases Create purchase
POST /api/sales Create sale

```

# 🧪 Future Additions

- Barcode/QR support

- Invoices (PDF)

- Realtime dashboard (Socket.io)

- Multi-warehouse support

- Activity logs

# 🤝 Author

Mihad Khadem

GitHub

Portfolio
