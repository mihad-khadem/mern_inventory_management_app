# 🧠 Vision for E-commerce POS & Inventory System – Backend

This is the backend for a **full-featured E-commerce POS and Inventory Management System**, built with **Node.js, Express, and MongoDB**.  
It handles **authentication, multi-role access, product management, stock tracking, POS & online sales, purchases, finance, HRM, promotions, CMS, and more**.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication & Refresh Tokens)
- Zod / Joi (Validation)
- Multer / Cloudinary (File Uploads)
- Winston (Logging)

---

## 📁 Folder Structure

```

src/
│
├── config/             # Environment configs, DB connection, logger
├── controllers/        # Route handlers
├── middlewares/        # Auth, RBAC, error handling, validation
├── models/             # MongoDB schemas
│   ├── inventory/      # Products, Categories, Suppliers, Customers
│   ├── stock/          # Stock, Warehouses, Stores
│   ├── pos/            # POS Orders
│   ├── ecommerce/      # Online Orders, Payments
│   ├── promo/          # Coupons, Gift Cards, Discounts
│   ├── finance/        # Expenses, Income, Bank Accounts, Transfers
│   ├── hrm/            # Employees, Attendance, Payroll
│   └── cms/            # Pages, Blogs, FAQ, Testimonials
├── routes/             # Express routers
├── services/           # Business logic layer
├── utils/              # Helpers (barcode, pdf, apiResponse, pagination)
├── validations/        # Zod/Joi schemas
├── docs/               # Optional Swagger/OpenAPI docs
├── app.js              # Express app setup
└── server.js           # Server entry point

readme.md
package.json

```

---

## 🔐 Authentication

- JWT-based access and refresh tokens
- Role-based access control (Admin, Manager, Staff)
- Middleware-protected routes
- Optional multi-company SaaS mode (Super Admin)

---

## 📦 Core Modules

### Inventory Management

- Products (CRUD, images, variant attributes)
- Categories & Subcategories
- Brands, Units, Warranties
- Stock Management (Adjustments, Transfers)
- Suppliers & Customers
- Expired Products & Low Stock Alerts
- Barcode & QR Code support

### POS & Sales

- Standard POS (POS 1)
- Advanced POS (POS 2) with split payments, hold orders
- Online Orders (Ecommerce)
- Invoices, Quotations, Sales Return
- Cart & Payments integration

### Finance & Accounts

- Expenses, Income
- Bank Accounts, Money Transfers
- Reports: Balance Sheet, Trial Balance, Cash Flow, Account Statements, Profit & Loss

### Human Resource Management

- Employees, Departments, Designations
- Shifts, Attendance, Leaves, Payroll

### Promotions & Coupons

- Discount Plans, Coupons, Gift Cards

### CMS / Content

- Pages, Blogs, FAQs, Testimonials

### Super Admin (Multi-Company SaaS)

- Companies, Packages, Domains
- Purchase Transactions per company

### Utilities

- Activity Logs
- Notifications
- PDF Invoice Generation
- Real-time updates (Socket.io, optional)

---

## 🛠️ Installation

```bash
# Clone repository
git clone https://github.com/mihad-khadem/mern_inventory_management_app.git
cd mern_inventory_management_app

# Install dependencies
npm install

# Create .env file based on .env.example
PORT=5000
MONGO_URI=mongodb://localhost:27017/inventory
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

### ▶️ Running the Server

```bash
# Development
npm run dev

# Production
npm run start
```

---

## 📫 API Endpoints

```
| Method | Route                 | Description                |
| ------ | --------------------- | -------------------------- |
| POST   | /api/auth/login       | Login & get JWT            |
| GET    | /api/products         | Fetch all products         |
| POST   | /api/products         | Create a new product       |
| POST   | /api/purchases        | Create a purchase          |
| POST   | /api/sales            | Create a sale              |
| GET    | /api/stock            | Manage stock & adjustments |
| POST   | /api/pos/orders       | Create POS order           |
| POST   | /api/ecommerce/orders | Create online order        |
| GET    | /api/reports/sales    | Get sales report           |
| GET    | /api/notifications    | Fetch notifications        |

*(More endpoints will be added as per modules)*
```

---

## 🧪 Future Additions / Advanced Features

- Realtime dashboard (Socket.io)
- PDF invoice generation
- Multi-warehouse support
- Activity logs & notifications
- Multi-company SaaS mode with packages & domains
- Barcode & QR code printing
- Email alerts & reminders

---

## 🤝 Author

**Mihad Khadem**
GitHub: [mihad-khadem](https://github.com/mihad-khadem)
Portfolio: [mihad-khadem.github.io/portfolio.website](https://mihad-khadem.github.io/portfolio.website/)

```

```
