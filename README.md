<div align="center">
  <h1>✨ Anmol Kashyap | Next-Gen AI Portfolio ✨</h1>
  <p>
    <em>A modern, interactive developer portfolio featuring a live, resume-aware AI assistant.</em><br/>
    <em>Built with React, Vite, Framer Motion, and a Python FastAPI backend powered by Mistral AI.</em>
  </p>

  <p>
    <a href="#-about-this-project"><strong>About</strong></a> ·
    <a href="#-tech-stack"><strong>Tech Stack</strong></a> ·
    <a href="#-key-features"><strong>Features</strong></a> ·
    <a href="#-development-setup"><strong>Local Setup</strong></a> ·
    <a href="#-deploying-for-free"><strong>Deployment</strong></a>
  </p>

  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
</div>

<br />

## 📖 About This Project

This isn't just a static resume page. It is a fully interactive experience designed to showcase not only my skills in creating beautiful UI/UX, but also my ability to integrate modern AI infrastructure with backend services.

The highlight of the portfolio is the **floating AI Chat Assistant** — powered by the `mistral-small-latest` model. It has been fed my entire resume context (education, skills, projects like Nudge, achievements) and can answer any recruiter or visitor question about my background instantly and confidently.

---

## ⚡ Tech Stack

### 🎨 Frontend (UI/UX)

- **Framework:** React + TypeScript (Vite)
- **Design Pattern:** Elegant Glassmorphism, CSS Modules, Dark/Light Mode capability
- **Animations:** Framer Motion (Scroll-reveals, stagger arrays, micro-interactions)
- **Background:** Custom CSS Animated Mesh Gradients

### ⚙️ Backend (API & AI)

- **Server:** Python + FastAPI (Asynchronous, blazing-fast web framework)
- **Database:** SQLite (Lightweight, robust conversation history storage)
- **AI Engine:** Official `openai` Python SDK adapted to use the **Mistral API** (`api.mistral.ai`)

---

## � Key Features

- [x] **Resume-Aware AI Chat:** A floating chat widget that talks about my experience accurately using system-prompted AI.
- [x] **API Rate-Limit Handling:** The backend intelligently catches rate limits and authentication errors, degrading gracefully to protect the application state.
- [x] **Elegant Bento-Grid Projects:** A modern "Bento Box" layout to showcase projects like Nudge and its landing page.
- [x] **Subtle Micro-interactions:** Shimmering gradient text, staggering fade-ins on load, and clean hover states without relying on heavy UI libraries.

---

## 🛠️ Development Setup

Want to run this locally? Here is how to get both the frontend and backend running on your machine.

### 1. The Python Backend

1. Open a terminal and `cd backend`
2. Create and activate a Virtual Environment:
   ```bash
   python -m venv venv
   # Windows: .\venv\Scripts\Activate
   # Mac/Linux: source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Add your valid [Mistral API Key](https://console.mistral.ai/api-keys/) into `backend/.env`:
   ```env
   MISTRAL_API_KEY=your_key_here
   ```
5. Start the server (runs on port 8000):
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### 2. The React Frontend

1. Open a _new_ terminal window and `cd frontend`
2. Install npm packages:
   ```bash
   npm install
   ```
3. Boot the Vite dev server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:5173` to view the live portfolio!

---

## 🌍 Deploying for Free (Zero-Cost Setup)

Because this project uses lightweight components, it can be hosted perpetually for $0.00 using modern serverless edge platforms.

### Step 1: Backend Deployment (Render.com)

Render offers a generous free tier for running Python web-services.

1. Push this entire monorepo to GitHub.
2. Sign in to [Render](https://render.com/) and create a new **Web Service**.
3. Point it to your GitHub repo.
4. **Important Configurations:**
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port 10000`
5. At the bottom, add your `MISTRAL_API_KEY` as an Environment Variable.
6. Deploy! Render will give you a live HTTPS URL (e.g. `https://my-portfolio-api.onrender.com`).

### Step 2: Connect Frontend to the Live Backend

Before deploying the React app, you must update the API url.

1. Open `frontend/src/components/ChatWidget.tsx`
2. Find the fetch call pointing to `http://127.0.0.1:8000` and replace it with your new Render URL.
3. Commit and push the updated frontend code to GitHub.

### Step 3: Frontend Deployment (Vercel)

Vercel is the premier platform for Vite/React applications.

1. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Select your GitHub repository.
3. **Important Configurations:**
   - **Root Directory:** Edit this and select the `frontend` folder.
   - **Framework Preset:** Make sure it detects Vite.
4. Click Deploy. Vercel will instantly build the React app and give you a beautiful `https://...vercel.app` domain.

<div align="center">
  <p><i>Building the future, one line of code at a time.</i></p>
</div>
