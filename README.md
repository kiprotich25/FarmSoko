# 🌽 Farm Soko - MERN App

**FarmSoko** is a full-stack MERN marketplace for agricultural products. It allows users to post, browse, and manage farm produce in real-time. The app includes product categories, search and filter, image upload, and a personal dashboard.

---

## 🚀 Live Demo

🌐 [View the live app here](https://farm-soko.vercel.app)  
🧠 Backend API: [API base URL](https://farm-soko-api.onrender.com)

---

## 📸 Screenshots
Find all the screenshots of the program in the screenshots folder

## 📦 Features

- 🔐 Authentication & Authorization
- 📤 Product posting with image upload (Cloudinary)
- 🔍 Search and category filtering
- 🧾 My Products view (edit/delete only your own)
- ⚡ Realtime feedback and alerts
- 📱 Fully responsive UI (ShadCN + Tailwind CSS)

---

## 🧪 Tech Stack

| Tech                      | Role                |
|---------------------------|---------------------|
| MongoDB                   | NoSQL Database      |
| Express.js                | Backend Framework   |
| React.js                  | Frontend UI         |
| Node.js                   | Server Runtime      |
| Tailwind CSS + ShadCN     | Styling & Components|
| JWT                       | User Authentication |
| Vite                      | React Build Tool    |
| Vercel                    | Frontend Hosting    |
| Render                    | Backend Hosting     |

---

## 🛠️ Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/kiprotich25/FarmSoko.git
cd farmsoko

Set up environment variables
Create two .env files:

     backend/.env:
     .env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

frontend/.env:
     .env
VITE_API_BASE_URL=https://your-backend-url.com/api

Install dependencies

pnpm install
cd backend && pnpm install
cd ../frontend && pnpm install
Run the app locally


# In /backend
pnpm run dev

# In /frontend
pnpm run dev
🔬 Testing
✅ Unit & Integration tests using Jest and Supertest

✅ MongoDB Memory Server for in-memory testing


To run backend tests:
cd backend
pnpm test


To run frontend tests:
cd frontend
pnpm test

⚙️ Architecture Overview
Monorepo with separate frontend/ and backend/
RESTful API with Express and JWT-based auth
Frontend with Vite + React + Tailwind + ShadCN
CI/CD via GitHub Actions


🎥 Demo Video
🎬 Watch the demo video in its folder

📚 API Documentation
See backend/docs/API.md for detailed route info, request formats, and examples.

🙋‍♀️ Author
Ian Kiprotich
[GitHub](https://github.com/kiprotich25)

🏁 License
MIT License
