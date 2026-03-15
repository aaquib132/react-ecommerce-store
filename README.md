<div align="center">

<img src="frontend/public/apple-touch-icon.png" width="120" alt="MyShoppingSite Logo"/>

# 🛒 MyShoppingSite
**The Ultimate Modern Full-Stack E-Commerce Experience**

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg?style=for-the-badge&logo=vercel)](https://react-ecommerce-store-58be.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Maintained%3F-yes-blue.svg?style=for-the-badge)](#)

<img src="https://readme-typing-svg.herokuapp.com?font=Inter&size=24&duration=3000&pause=1000&center=true&vCenter=true&width=600&lines=Modern+Ecommerce+Web+Application;React+%2B+Node.js+%2B+MongoDB;Responsive+UI+%7C+Optimized+Performance;Full+Stack+Production+Architecture" alt="Typing SVG" />

</div>

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Gallery](#-project-gallery)

---

## 🧐 Overview
**MyShoppingSite** is a production-grade e-commerce solution built with the MERN stack. It bridges the gap between high-performance UI and scalable backend architecture, offering users a seamless shopping journey from discovery to checkout.

> **Why this project?** To demonstrate how modern engineering patterns like **Lazy Loading**, **Memoization**, and **RESTful API design** can be combined to create a lightning-fast user experience.

---

## 🛠 Tech Stack

### **Frontend**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### **Backend & Database**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **🔍 Smart Search** | Advanced search suggestions and filtering by price/rating. |
| **⚡ Performance** | Skeleton screens and image lazy-loading for 0.5s perceived load time. |
| **📱 Responsive** | Mobile-first design with a dedicated custom search & filter UI. |
| **🛒 Cart System** | Real-time state management for cart, wishlist, and shipping logic. |

---

## 🎥 Demo Video
<div align="center">
  <a href="frontend/public/PageImageAndVideo/ProjectVideo.mp4">
    <img src="frontend/public/PageImageAndVideo/HomePage.png" width="900" style="border-radius: 10px; border: 1px solid #ddd;" alt="Watch Demo">
  </a>
  <p><i>Click the image above to watch the walkthrough video</i></p>
</div>

---

## 🖼 Project Gallery

<table style="width: 100%;">
  <tr>
    <td width="50%"><img src="frontend/public/PageImageAndVideo/HomePage.png" alt="Home"/><br/><b>🏠 Homepage</b></td>
    <td width="50%"><img src="frontend/public/PageImageAndVideo/ProductListing.png" alt="Listing"/><br/><b>📦 Product Listing</b></td>
  </tr>
  <tr>
    <td width="50%"><img src="frontend/public/PageImageAndVideo/CartPage.png" alt="Cart"/><br/><b>🛒 Cart System</b></td>
    <td width="50%"><img src="frontend/public/PageImageAndVideo/MobileResposiveDesign.jpeg.jpeg" alt="Mobile"/><br/><b>📱 Mobile Experience</b></td>
  </tr>
</table>

---

## 🏗 Architecture
```mermaid
graph TD
    A[React Frontend] -->|API Requests| B[Express Backend]
    B -->|Query| C[(MongoDB Atlas)]
    A -->|State| D[Context API / Store]
    B -->|Auth/Logic| E[Service Layer]
```

---
<details>
<summary>📂 <b>View Project Structure</b></summary>

```text
react-ecommerce-store
├── backend
│   ├── db         # Connection logic
│   ├── models     # Mongoose Schemas
│   └── index.js   # Entry point
├── frontend
│   ├── components # Reusable UI
│   ├── pages      # Route components
│   ├── store      # State management
│   └── src        # Main logic
└── README.md

```
</details>

---

### ⚙️ Quick Start

### 1. Clone & Install
```bash
git clone [https://github.com/aaquib132/react-ecommerce-store.git](https://github.com/aaquib132/react-ecommerce-store.git)
cd react-ecommerce-store
```

### 2. Environment Setup

Create a `.env` file in the **frontend** directory and add the following:

```env
VITE_API_URL=http://localhost:3000
```

### 3. Run Locally
Backend:

```Bash
cd backend && npm install && npm run dev
```
Frontend:

```Bash
cd frontend && npm install && npm run dev
```

---

## 📡 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/products` | Fetch all available products |
| **GET** | `/products/:id` | Get individual product details |
| **GET** | `/categories` | List all product categories |

---

---

## 👨‍💻 Author

**Aaquib Ahmad** *Full Stack Developer*

<div align="center">

---

⭐ **If you found this project helpful, please give it a star!**

</div>
