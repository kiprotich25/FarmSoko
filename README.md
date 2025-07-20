# 🌽 Farm Soko - MERN App

**FarmSoko** is a full-stack MERN marketplace for agricultural products. It allows users to post, browse, and manage farm produce in real-time. The app includes product categories, search and filter, image upload, and a personal dashboard.

---

## 🚀 Live Demo

- 🌐 [View the live app here](https://farm-soko.vercel.app)  
- 🧠 Backend API: [API base URL](https://farm-soko-api.onrender.com)
-  Video demo: [here]( https://youtu.be/TxKr8b4trv0?feature=shared)
---

## 📸 Screenshots

Find all the screenshots of the program in the `screenshots/` folder.

---

## 📦 Features

- 🔐 Authentication & Authorization  
- 📤 Product posting with image upload (Cloudinary)  
- 🔍 Search and category filtering  
- 🧾 "My Products" view (edit/delete only your own)  
- ⚡ Realtime feedback and alerts  
- 📱 Fully responsive UI (ShadCN + Tailwind CSS)

---

## 🧪 Tech Stack

| Tech                   | Role                  |
|------------------------|-----------------------|
| MongoDB                | NoSQL Database        |
| Express.js             | Backend Framework     |
| React.js               | Frontend UI           |
| Node.js                | Server Runtime        |
| Tailwind CSS + ShadCN  | Styling & Components  |
| JWT                    | User Authentication   |
| Vite                   | React Build Tool      |
| Vercel                 | Frontend Hosting      |
| Render                 | Backend Hosting       |

---

## 🗂️ Technical Architecture Diagram

 

       ┌────────────────────┐
       │   Frontend (React) │
       │ Vite + Tailwind    │
       │ ShadCN Components  │
       └────────┬───────────┘
                │
       Fetch / Submit
                │
       ┌────────▼────────┐
       │  Backend (Node) │
       │  Express Server │
       └────────┬────────┘
                │
      ┌─────────▼─────────┐
      │   MongoDB Atlas   │
      │ (products, users) │
      └───────────────────┘



---

## 🛠️ Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/kiprotich25/FarmSoko.git
cd farmsoko
Set up environment variables

Create two .env files:

backend/.env

env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
frontend/.env

.env
VITE_API_BASE_URL=https://your-backend-url.com/api
Install dependencies

bash
Copy
Edit
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

Run backend tests:

cd backend
pnpm test
Run frontend tests:

cd frontend
pnpm test
⚙️ Architecture Overview
Monorepo with separate frontend/ and backend/ folders

RESTful API with Express and JWT-based auth

Frontend built using Vite + React + Tailwind CSS + ShadCN

CI/CD via GitHub Actions

🎥 Demo Video
🎬 Watch the demo video here on this link : https://youtu.be/TxKr8b4trv0?feature=shared



🙋‍♀️ Author
Ian Kiprotich
[GitHub](https://github.com/kiprotich25)


🏁 License
Licensed under the MIT License




