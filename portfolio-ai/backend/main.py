import sqlite3
import os
import traceback
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import AsyncOpenAI, AuthenticationError, RateLimitError, APIStatusError
from dotenv import load_dotenv

load_dotenv()

# ── Database ───────────────────────────────────────────────────────────────────
DB_PATH = "chat.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            content TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Mistral client (via OpenAI SDK) ────────────────────────────────────────────
client = AsyncOpenAI(
    base_url="https://api.mistral.ai/v1",
    api_key=os.getenv("MISTRAL_API_KEY", ""),
)

# ── System prompt ──────────────────────────────────────────────────────────────
SYSTEM_PROMPT = """You are the AI assistant representing Anmol Kashyap, a full-stack developer based in Lucknow, Uttar Pradesh.

Email: anmolkashyap12420@gmail.com
Education: B.Tech in Computer Science Engineering, IIITDM Kurnool (Graduation: 2026).

Projects:
1. Nudge (Social Dating Platform) - React Native, Expo, Firebase, Cloudflare Workers, Agora, MapLibre.
   - High-performance media delivery via Cloudflare Workers proxy, cutting egress by 90%.
   - Global edge caching, WAF rules, low-latency video pipeline.
   - Play Store: https://play.google.com/store/apps/details?id=com.anonymous.TrueEra
2. Nudge Landing Page - React, TypeScript, Vite, Framer Motion. Serverless waitlist via Google Apps Script.
   - Live: https://www.nudgeapp.dev/

Skills: C++, JavaScript (ES6+), TypeScript, Python, React Native, Expo, Node.js, Express.js, MERN Stack, Firebase, Cloudflare Workers, Edge Caching, CI/CD (Expo EAS), Agora, Maptiler, DSA, OOP, DBMS.
Achievements: 100+ LeetCode problems solved.

Always reply as Anmol's personal AI assistant. Be concise, confident, and professional."""

# ── Schemas ────────────────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# ── Chat endpoint ──────────────────────────────────────────────────────────────
@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    conn = None
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        # Save user message
        cursor.execute("INSERT INTO chat_history (role, content) VALUES (?, ?)", ("user", request.message))
        conn.commit()

        # Retrieve recent conversation history (oldest first)
        cursor.execute("SELECT role, content FROM chat_history ORDER BY id DESC LIMIT 10")
        history = list(reversed(cursor.fetchall()))

        # Prepare messages array
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        for role, content in history:
            messages.append({"role": role, "content": content})

        print("[chat] Calling Mistral API directly (mistral-small-latest)...")
        response = await client.chat.completions.create(
            model="mistral-small-latest",
            messages=messages,
            temperature=0.7,
            max_tokens=500,
        )
        ai_reply = response.choices[0].message.content
        print("[chat] ✓ Success.")

        # Save AI response
        cursor.execute("INSERT INTO chat_history (role, content) VALUES (?, ?)", ("assistant", ai_reply))
        conn.commit()

        return ChatResponse(response=ai_reply)

    except AuthenticationError:
        print("[chat] ✗ Invalid API Key")
        raise HTTPException(status_code=401, detail="🔑 Invalid Mistral API key. Check MISTRAL_API_KEY in backend/.env")
    except RateLimitError:
        print("[chat] ✗ Rate limited")
        raise HTTPException(status_code=429, detail="⏳ Mistral rate limit reached. Please try again later!")
    except Exception as e:
        print(f"[chat] Unhandled Error: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")
    finally:
        if conn:
            try:
                conn.close()
            except Exception:
                pass
