<div align="center">

<img src="frontend/public/apple-touch-icon.png" width="120" alt="MyShoppingSite Logo"/>

# 🛒 MyShoppingSite
**The Ultimate Modern Full-Stack E-Commerce Experience**

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg?style=for-the-badge&logo=vercel)](https://react-ecommerce-store-58be.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Maintained%3F-yes-blue.svg?style=for-the-badge)](#)

<img src="https://readme-typing-svg.herokuapp.com?font=Inter&size=24&duration=3000&pause=1000&center=true&vCenter=true&width=600&lines=Modern+Ecommerce+Web+Application;React+19+%2B+Node.js+%2B+MongoDB;Responsive+UI+%7C+Optimized+Performance;Full+Stack+Production+Architecture" alt="Typing SVG" />

</div>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Project Gallery](#project-gallery)
- [Architecture](#architecture)
- [Project Structure](#-project-structure)
- [Installation](#installation)
- [API Reference](#-api-reference)

---

## 🧐 Overview
**MyShoppingSite** is a production-grade e-commerce solution built with the MERN stack. It bridges the gap between high-performance UI and scalable backend architecture, offering users a seamless shopping journey from discovery to checkout.

> **Why this project?** To demonstrate how modern engineering patterns like **Lazy Loading**, **Context API State Persistence**, and **RESTful API design** can be combined to create a lightning-fast and reliable user experience.

---

## 🛠 Tech Stack

### **Frontend**
![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### **Backend & Database**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **🔍 Smart Search** | Real-time product filtering and categorization. |
| **⚡ Performance** | Skeleton loaders and route-based code splitting (Lazy Loading). |
| **📱 Responsive** | Mobile-optimized navigation and touch-friendly interactive elements. |
| **🛒 Persistence** | Shopping cart and wishlist state preserved via `localStorage`. |
| **💳 Smooth Checkout** | Multi-step shipping and payment flow with order confirmation. |

---

## 🎥 Demo Video

<div align="center">

https://github.com/user-attachments/assets/98e61b3a-4ea2-403a-8df9-cec1bfe01215


<p><i>Click the image above to watch the walkthrough video (Requires GitHub access)</i></p>

</div>

---

## 🖼 Project Gallery

<table style="width:100%;">
<tr>
<td width="50%" align="center">
<img src="frontend/public/PageImageAndVideo/HomePage.png"/><br/>
<b>🏠 Homepage</b>
</td>
<td width="50%" align="center">
<img src="frontend/public/PageImageAndVideo/ProductListing.png"/><br/>
<b>📦 Product Listing</b>
</td>
</tr>
<tr>
<td width="50%" align="center">
<img src="frontend/public/PageImageAndVideo/ProductDetailsPage.png"/><br/>
<b>🔍 Product Details</b>
</td>
<td width="50%" align="center">
<img src="frontend/public/PageImageAndVideo/CartPage.png"/><br/>
<b>🛒 Cart Page</b>
</td>
</tr>
<tr>
<td width="50%" align="center">
<img src="frontend/public/PageImageAndVideo/WishlistPage.png"/><br/>
<b>❤️ Wishlist</b>
</td>
<td width="50%" align="center">
<img src="frontend/public/PageImageAndVideo/ShippingPage.png"/><br/>
<b>🚚 Shipping Page</b>
</td>
</tr>
<tr>
<td width="50%" align="center">
<img src="frontend/public/PageImageAndVideo/PaymentPage.png"/><br/>
<b>💳 Payment Page</b>
</td>
<td width="50%" align="center">
<img src="frontend/public/PageImageAndVideo/OrderConfirmPage.png"/><br/>
<b>✅ Order Confirmation</b>
</td>
</tr>
</table>

---

## 📱 Mobile Responsive Design

<div align="center">

<img src="frontend/public/PageImageAndVideo/MobileResposiveDesign.jpeg.jpeg" width="350"/>

<p><i>Optimized for mobile with a custom bottom navigation and search UI.</i></p>

</div>

---

## 🏗 Architecture

The project follows a **decoupled MERN architecture**, allowing the React client and Express server to scale independently.

### 🧩 System Design

```mermaid
graph TD
    subgraph Client [Client Side - React 19]
        A[React Frontend] -->|useReducer| D[ShopContext]
        D -->|Persist| L[(LocalStorage)]
        A -->|Navigation| F[React Router]
        A -->|API Calls| H[useFetch Hook]
    end

    H -->|HTTP/JSON| B[Express Backend]

    subgraph Server [Server Side - Node.js]
        B -->|Mongoose| C[(MongoDB Atlas)]
        B -->|Routes| I[Product API]
    end

    subgraph Deployment
        V[Vercel] -.-> A
        R[Render] -.-> B
    end
```

---

<details>
<summary>📂 <b>View Project Structure</b></summary>

```text
react-ecommerce-store
├── backend
│   ├── db/         # MongoDB connection (Mongoose)
│   ├── models/     # Product/User Schemas
│   └── index.js    # Express entry point & REST routes
├── frontend
│   ├── src
│   │   ├── components/ # Reusable UI (Navbar, Skeletons)
│   │   ├── pages/      # Route-level components
│   │   ├── store/      # Global state (Context + useReducer)
│   │   ├── utils/      # Helper functions
│   │   └── useFetch.jsx# Custom data fetching hook
│   ├── public/     # Static assets & readme media
│   └── package.json
└── README.md
```
</details>

---

## ⚙️ Installation

### 1. Clone & Install
```bash
git clone https://github.com/aaquib132/react-ecommerce-store.git
cd react-ecommerce-store
```

### 2. Environment Setup
Create a `.env` file in the **frontend** directory:
```env
VITE_API_URL=http://localhost:3000
```

### 3. Run Locally

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/products` | Fetch all products |
| **GET** | `/products/:productId` | Fetch single product details |
| **GET** | `/products/categories/:categoriesName` | Filter products by category |
| **GET** | `/products/categories/:categoriesName/:productId` | Fetch specific item in category |

---

## 👨‍💻 Author

**Aaquib Ahmad**  
*Full Stack Developer*

---
<div align="center">
⭐ <b>If you found this project helpful, please give it a star!</b>
</div>
