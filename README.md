# 🚗 CarStore
# Live Link: https://car-store-frontend-rose.vercel.app/
## 📌 Overview

The Car Store Application is a user-friendly e-commerce platform designed for seamless car purchases. It features role-based authentication, inventory management, and secure payment integration, ensuring a smooth and reliable shopping experience for customers. 🚗💨

## ✨ Key Features

### 🔐 Authentication & Security

- Secure user registration & login (name, email, password).
- Passwords are **hashed** before storage.
- **Role-based access** (Customers & Admins).
- **JWT Authentication** for user sessions.
- Logout removes JWT token and redirects to login.

### 🌍 Public Pages

#### 🏠 Home

- **Navbar**: Logo, menu links, login/signup buttons.
- **Hero Banner**: Featured promotions & special offers.
- **Featured Bicycles**: Displays up to 6 products with a "View All" option.
- **Extra Section**: Testimonials & reviews.
- **Footer**: Contact details & social links.

#### 🚲 CarStore Page

- **Search & Filters**: Search by brand, name, category & price.
- **Dynamic Listings**: Updates based on user input.
- **Detailed Bicycle Cards**: Name, brand, model, price & category.

#### 📄 Car Details Page

- Displays product image, specs, and pricing.
- "Buy Now" button redirects to the checkout page.

#### ℹ️ About Page

- Store mission & brand information.

### 🔒 Private Routes

#### 🛒 Checkout Page

- Users can purchase Car securely.
- **Stock Validation**: Orders are limited to available inventory.
- **Order Summary**: Product details, user info, total price, and payment method.
- **Payment Integration**: Supports SurjoPay, Stripe, etc.

#### 📊 Dashboard

- **User Dashboard**: View order history, update profile & change password securely.

---

## 🔧 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Redux, Typescript
- **Backend:** Node.js, Express.js, Typescript
- **Database:** MongoDB
- **Hosting & Deployment:** Vercel
- **Payment Gateway:** Shurjopay

## 🚀 Installation & Setup

### 🖥 Backend

```sh
cd server
npm install
npm start
```

### 🌐 Frontend

```sh
cd client
npm install
npm start
```

## 🌐 Live Demo



