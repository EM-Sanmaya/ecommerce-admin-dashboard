#  Ecommerce Admin Dashboard

A full-stack **Ecommerce Admin Dashboard** built using **Next.js (App Router)** that enables secure admin authentication, complete product management (CRUD), image uploads using Cloudinary, real-time dashboard analytics, and deployment on Vercel.

 **Live Demo :**  
 https://ecommerce-admin-dashboard-gules.vercel.app/ 
 **Youtube Video Link :**  
 https://youtu.be/e1DwT13Yc5U
---

##  Project Overview

This project is an **admin-only dashboard** for managing ecommerce products and inventory.  
It focuses on real-world production requirements such as authentication, secure media handling, server-side rendering, and cache consistency.

Admins can:
- Manage products (Create, Read, Update, Delete)
- Upload product images
- View inventory analytics and charts
- Securely onboard other admins

---

## ✨ Key Features

- **Server-side rendering (SSR)** using Next.js App Router  
- **Complete Product Management (CRUD)**  
- **Secure Image Uploads** using Cloudinary  
- **Interactive Dashboard Charts** for inventory & stock  
- **Authentication & Authorization** (Admin-only access)  
- **Admin onboarding restricted to admins only**  
- **Automatic dashboard updates** after add/update/delete  

---

## 🔐 Demo Admin Credentials

```
admin@gmail.com / admin123
vk@gmail.com    / vk
```

---

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- MongoDB
- Mongoose
- bcryptjs

### Media Storage
- Cloudinary

### Deployment
- Vercel

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/ecommerce-admin-dashboard.git
cd ecommerce-admin-dashboard
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Variables

Create `.env.local`:

```env
MONGODB_URI=your_mongodb_uri

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4️⃣ Run Locally
```bash
npm run dev
```

Open:
```
http://localhost:3000
```

---

## 🚀 Deployment

- Push code to GitHub
- Import repo into **Vercel**
- Add environment variables in Vercel
- Deploy


---

## ✅ Project Status

- ✔ Admin auth working
- ✔ Product CRUD working
- ✔ Image upload working
- ✔ Dashboard charts auto-update
- ✔ Deployed on Vercel

---

## 🏁 Conclusion

This project demonstrates a **production-ready ecommerce admin dashboard** using modern Next.js features, secure backend logic, and real-world deployment practices.
