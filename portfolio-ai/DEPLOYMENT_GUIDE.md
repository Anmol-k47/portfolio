# Deployment Guide: Exposing FastAPI with Cloudflare Tunnels

To securely expose your local FastAPI backend (`http://localhost:8000`) to the public internet using Cloudflare Tunnels (which gives you a free HTTPS URL without port forwarding), follow these steps:

## Prerequisites

- Download and install [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/).

## Steps to Deploy

1. **Start the FastAPI Backend**
   Ensure your backend is running locally. Open a terminal in the `portfolio-ai/backend` directory and run:

   ```bash
   venv/Scripts/Activate
   uvicorn main:app --reload --port 8000
   ```

2. **Run Cloudflare Tunnel**
   Open a new terminal and run the following Quick Tunnel command:

   ```bash
   cloudflared tunnel --url http://localhost:8000
   ```

3. **Get Your Public URL**
   In the terminal output, `cloudflared` will provide a temporary URL that looks like:
   `https://<random-words>.trycloudflare.com`

4. **Update the Frontend**
   If you plan to deploy the frontend to a service like Vercel or Cloudflare Pages, update the fetch URL in `ChatWidget.tsx` from `http://127.0.0.1:8000/api/chat` to your new given `trycloudflare` endpoint:
   `https://<random-words>.trycloudflare.com/api/chat`

5. **Deploy Frontend**
   Build the Vite app:
   ```bash
   cd frontend
   npm run build
   ```
   You can then host the `dist/` folder anywhere, such as Cloudflare Pages or Vercel.
