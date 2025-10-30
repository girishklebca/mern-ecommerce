# MERN E-Commerce App

A full-stack e-commerce application built with MongoDB, Express, React, and Node.js, featuring Material-UI components.

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Material-UI (MUI) v5
- React Router
- Axios
- Vite

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- CORS enabled

## 📂 Project Structure

```
├── Backend/          # Express API server
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── utils/        # Helper functions
│
└── Frontend/         # React application
    ├── src/
    │   ├── components/   # React components
    │   └── data/         # Static data
    └── public/
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB installed and running locally
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/girishklebca/mern-ecommerce.git
   cd mern-ecommerce
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB** (if not already running)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd Backend
   npm run dev
   ```
   Backend runs on `http://localhost:3000`

3. **Start Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

## 📝 Features

- ✅ Product listing with search functionality
- ✅ Product creation form with validation
- ✅ User authentication (Login/Register)
- ✅ Responsive Material-UI design
- ✅ Real-time search with Autocomplete
- ✅ CRUD operations for products
- ✅ MongoDB database integration

## 🔧 API Endpoints

### Products
- `GET /product/getProducts` - Get all products
- `POST /product/create` - Create new product
- `POST /product/update` - Update product
- `DELETE /product/delete` - Delete product

### Users
- `POST /user/register` - Register new user
- `POST /user/login` - User login

## 🎨 Components

- `Home` - Landing page
- `Products` - Product listing with search
- `ProductForm` - Create/Edit products
- `Login` - User authentication
- `Nav` - Navigation bar

## 📦 Dependencies

### Backend
- express
- mongoose
- cors
- jsonwebtoken
- nodemon (dev)

### Frontend
- @mui/material
- @emotion/react
- react-router-dom
- axios

## 🚧 Work in Progress

This project is still under development. More features coming soon!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Girish**
- GitHub: [@girishklebca](https://github.com/girishklebca)

---

⭐ If you find this project helpful, please give it a star!
