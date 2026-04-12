# 🕉 Divine Soul — Full-Stack Setup Guide

## Project Structure

```
divine-soul/
├── server/
│   ├── controllers/
│   │   ├── authController.js      ← signup & login logic
│   │   └── commentController.js   ← get & post comments
│   ├── middleware/
│   │   └── auth.js                ← JWT verification middleware
│   ├── models/
│   │   ├── User.js                ← User schema (MongoDB)
│   │   └── Comment.js             ← Comment schema (MongoDB)
│   ├── routes/
│   │   ├── auth.js                ← /api/auth routes
│   │   └── comments.js            ← /api/comments routes
│   └── server.js                  ← Express entry point
├── client/
│   ├── index.html                 ← Your original HTML (unchanged)
│   ├── style.css                  ← Your original CSS (unchanged)
│   ├── script.js                  ← UPDATED — now calls backend API
│   ├── pfp.jpg
│   ├── premanand.jpg
│   ├── vinod.jpg
│   └── lokanathswami.jpg
├── .env.example                   ← Environment variable template
├── package.json
└── README.md
```

---

## Prerequisites

Make sure you have these installed:

| Tool       | Version  | Check with          |
|------------|----------|---------------------|
| Node.js    | ≥ 18     | `node --version`    |
| npm        | ≥ 9      | `npm --version`     |
| MongoDB    | ≥ 6      | `mongod --version`  |

### Install MongoDB locally (if you don't have it)
- **Windows**: https://www.mongodb.com/try/download/community
- **macOS**: `brew tap mongodb/brew && brew install mongodb-community`
- **Ubuntu**: `sudo apt install mongodb`

Or use **MongoDB Atlas** (free cloud hosting): https://cloud.mongodb.com

---

## Step-by-Step Setup

### 1. Install dependencies

Open a terminal in the `divine-soul/` folder and run:

```bash
npm install
```

This installs: express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv, nodemon.

---

### 2. Create your `.env` file

Copy the example file:

```bash
# On Windows:
copy .env.example .env

# On macOS/Linux:
cp .env.example .env
```

Then open `.env` and set your values:

```env
# For local MongoDB (no account needed):
MONGODB_URI=mongodb://127.0.0.1:27017/divine_soul

# For MongoDB Atlas (replace with your connection string):
# MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster.mongodb.net/divine_soul

# Change this to any long random string — keep it secret!
JWT_SECRET=my_super_secret_key_change_this_to_something_random_32chars

JWT_EXPIRES_IN=7d
PORT=5000

# The URL where your frontend is running (VS Code Live Server default):
CLIENT_ORIGIN=http://127.0.0.1:5500
```

---

### 3. Start MongoDB (if using local installation)

```bash
# macOS/Linux:
mongod

# Windows (run as Administrator):
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
```

---

### 4. Start the backend server

```bash
# Production (restarts manually):
npm start

# Development (auto-restarts on file changes):
npm run dev
```

You should see:
```
✅  MongoDB connected: mongodb://127.0.0.1:27017/divine_soul
🚀  Server running on http://localhost:5000
```

---

### 5. Open the frontend

**Option A — Open via the Express server (simplest):**
Visit `http://localhost:5000` in your browser.

**Option B — Open with VS Code Live Server:**
Right-click `client/index.html` → "Open with Live Server"
(it defaults to port 5500, which is already allowed by CORS)

---

## API Endpoints

| Method | Endpoint                          | Auth?    | Description              |
|--------|-----------------------------------|----------|--------------------------|
| POST   | `/api/auth/signup`                | ❌ No    | Register a new account   |
| POST   | `/api/auth/login`                 | ❌ No    | Log in, receive JWT      |
| GET    | `/api/comments?personalityId=1`   | ❌ No    | Get comments (public)    |
| POST   | `/api/comments`                   | ✅ Yes   | Post a new comment       |
| GET    | `/api/health`                     | ❌ No    | Server health check      |

### Example: Test with curl

```bash
# Sign up
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"Arjuna","email":"arjuna@test.com","password":"bhakti123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"arjuna@test.com","password":"bhakti123"}'

# Post a comment (replace TOKEN with the token from login)
curl -X POST http://localhost:5000/api/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"personalityId":1,"commentText":"Jai Shri Radhe!"}'

# Get comments
curl http://localhost:5000/api/comments?personalityId=1
```

---

## What Changed in `script.js`

The only file you need to replace in your existing project is **`client/script.js`**.
Here is a summary of what changed:

| Feature           | Before (localStorage)         | After (backend API)                  |
|-------------------|-------------------------------|--------------------------------------|
| Sign up           | Fake — stores name locally    | `POST /api/auth/signup` → real DB    |
| Login             | Fake — just checks localStorage | `POST /api/auth/login` → JWT        |
| Session storage   | `vedic_session` in localStorage | `divine_token` + `divine_user`      |
| Comments persist? | ❌ Lost on refresh/logout     | ✅ Stored in MongoDB forever         |
| Comments shared?  | ❌ Only visible to you        | ✅ All users see all comments        |
| Comment auth      | None                          | JWT required to post                 |

---

## Troubleshooting

**"Cannot connect to server"**
→ Make sure `npm start` is running and you see "Server running on port 5000".

**"MongoDB connection failed"**
→ Make sure `mongod` is running, or check your Atlas connection string.

**CORS error in browser console**
→ Add your frontend URL to `allowedOrigins` in `server/server.js`, or update `CLIENT_ORIGIN` in `.env`.

**"Invalid token" after restarting server**
→ If you change `JWT_SECRET`, all existing tokens are invalidated. Users must log in again.

---

## Security Notes

- Passwords are hashed with **bcrypt** (12 salt rounds) — never stored in plain text.
- JWTs expire after **7 days** by default (configurable in `.env`).
- The `.env` file is never committed to version control — add it to `.gitignore`.
- Comment text is validated and capped at 2000 characters server-side.
- HTML is escaped on the frontend to prevent XSS in comments.
