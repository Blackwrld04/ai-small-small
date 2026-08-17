# AI Small Small

> AI literacy + Nigerian curriculum support for children aged 7–17. A full-stack React + Node.js platform designed to teach kids how to think critically about AI, not just use it.

**[DOCUMENTATION.md](DOCUMENTATION.md)** contains the complete architecture, curriculum design, API reference, and roadmap. Start there for in-depth information.

---

## What's Here

A **production-ready scaffold** with real signup/login, parent-child account management, curriculum browsing, and AI chat with guardrails.

### Core Features (Built)
- **Multi-role authentication:** Parent, learner (16+), school, and child accounts with JWT sessions
- **Parent-created child accounts:** Parents set up their child's credentials (no self-registration for kids under 16)
- **Parent dashboard:** Manage children, view their curriculum band, access chat history
- **Learner dashboards:** Personalized entry points for kids, teens, and schools
- **AI Literacy curriculum (Track A):** Organized by skill level (Beginner → Intermediate → Advanced → Expert)
- **Nigerian curriculum mapping (Track B):** Core subjects (Math, English, Science) with AI integration, organized by age band
- **Chat UI + guardrails:** Working chat interface that redirects "do it for me" requests back toward teaching
- **Parent-visible chat history:** Full transparency with server-side access control
- **Design system:** Consistent palette (indigo/marigold/leaf), typography (Baloo 2 / Work Sans / IBM Plex Mono)

### What's NOT Built (Intentionally)
- Real AI model (currently rule-based mocks)
- School roster / class management
- Kid Innovator submission flow
- Production database (JSON file for now)
- WhatsApp integration
- Payments / subscriptions

---

## Quick Start

### Prerequisites
- **Node.js 18+** ([download](https://nodejs.org))
- Two terminal windows

### 1. Start the Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set JWT_SECRET to a random 32+ character string
npm run dev
```
Backend runs on **http://localhost:4000**

### 2. Start the Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on **http://localhost:5173**

The dev server automatically proxies `/api` calls to the backend.

### 3. Try It
1. Open **http://localhost:5173**
2. Sign up as a **Parent**
3. From the dashboard, create a child account
4. Open a new tab, go to **/kid-login**, and log in as the child
5. Explore the curriculum and try the chat

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router v6, Vite 6 |
| **Backend** | Node.js (ESM), Express 4 |
| **Auth** | JWT (jsonwebtoken), bcryptjs |
| **Database** | JSON file (dev) — swap for Postgres in production |
| **Styling** | Vanilla CSS + CSS custom properties |

---

## Project Structure

```
ai-small-small/
├── README.md                    # This file
├── DOCUMENTATION.md             # Full architecture & curriculum docs
├── .gitignore
│
├── backend/
│   ├── server.js                # Express entry point
│   ├── db.js                    # JSON-file data layer
│   ├── .env.example             # Environment template
│   ├── package.json
│   ├── data/
│   │   ├── curriculum.js        # Track A & B curriculum content
│   │   └── db.json              # Auto-created database
│   ├── middleware/
│   │   └── auth.js              # JWT verification + role guards
│   └── routes/
│       ├── auth.js              # Signup, login
│       ├── children.js          # Child account management
│       ├── curriculum.js        # Track A & B endpoints
│       └── chat.js              # AI chat + history
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx             # React entry point
        ├── App.jsx              # Routes
        ├── AuthContext.jsx      # Session state
        ├── api.js               # Backend client
        ├── components/
        │   ├── Nav.jsx
        │   ├── OnboardingModal.jsx
        │   └── ProtectedRoute.jsx
        ├── pages/
        │   ├── Landing.jsx, SignUp.jsx, Login.jsx, ChildLogin.jsx
        │   ├── Chat.jsx, ChatHistory.jsx, Curriculum.jsx
        │   ├── Profile.jsx, Progress.jsx, Settings.jsx
        │   └── dashboard/
        │       ├── ParentDashboard.jsx
        │       ├── LearnerDashboard.jsx
        │       └── SchoolDashboard.jsx
        └── styles/
            └── tokens.css       # Design system tokens
```

---

## User Roles

| Role | How Created | Login Route | Notes |
|---|---|---|---|
| **Parent** | Self-signup | `/login` | Manages child accounts and sees chat history |
| **Learner** | Self-signup | `/login` | 16+ independent teens, self-directed learning |
| **School** | Self-signup | `/login` | School pilot programs (roster management coming soon) |
| **Child** | Created by parent | `/kid-login` | Under 16, parent sets initial credentials |

---

## Curriculum Model

### Track A — AI Literacy (by skill level)
Organized by competency, not age. Four levels:
1. **Beginner — "AI Explorers"** — What is AI? Talking to AI. Safety basics.
2. **Intermediate — "AI Builders"** — How AI works. Spotting fakes. Building with no-code tools.
3. **Advanced — "AI Thinkers & Creators"** — Machine learning. AI ethics. Real projects.
4. **Expert — "AI Innovators"** — Exam prep, capstone projects, career/university use.

Each term includes 4 modules, assessments, and a "Kid Innovator" milestone.

### Track B — Nigerian Curriculum + AI (by age band)
Follows Nigeria's Basic Education Curriculum (NERDC) and aligns with WASSCE for older teens.
- **Band A (7–9):** Primary 2–4
- **Band B (10–12):** Primary 5–6 / JSS1
- **Band C (13–15):** JSS2–SS1
- **Band D (16–17):** WASSCE-track (English, Math, Civic Ed + stream electives)

Core subjects: Mathematics, English Studies, Science & Technology. AI serves as a study partner, not a replacement.

---

## API Overview

| Endpoint | Auth | Purpose |
|---|---|---|
| `POST /api/auth/signup` | No | Register parent, learner, or school account |
| `POST /api/auth/login` | No | Adult login |
| `POST /api/children` | Parent | Create a child account |
| `GET /api/children` | Parent | List own children |
| `POST /api/children/login` | No | Child login (username/password) |
| `GET /api/curriculum/track-a` | No | AI Literacy curriculum |
| `GET /api/curriculum/track-b` | No | Nigerian curriculum content |
| `POST /api/chat` | Yes | Send message to AI tutor |
| `GET /api/chat/history/:childId` | Yes | Parent or child views chat logs |

See [DOCUMENTATION.md](DOCUMENTATION.md#6-backend--architecture--api-reference) for full API spec.

---

## Chat Guardrails

The AI currently uses **rule-based mocks**. If a user says:
- *"write my essay"*, *"do my homework"*, *"just give me the answer"*, *"do it for me"*

The bot replies: *"I won't do it for you, but I'll help you build it yourself — what's the topic, and what do you already have?"*

This design reinforces learning, not task completion.

---

## Security Highlights

| Area | Implementation |
|---|---|
| **Passwords** | Hashed with bcryptjs (cost factor 10). Never stored in plain text. |
| **Sessions** | Stateless JWT, 7-day expiry. Stored in localStorage. |
| **Chat privacy** | Enforced server-side. Only the child's parent or the child can read their chat history. |
| **Child ID binding** | Server derives childId from JWT, not request body. No spoofing. |
| **Username privacy** | Child usernames are alphanumeric only. Parents warned not to use real names. |
| **Production TODOs** | Move JWT to httpOnly cookies. Add rate limiting. Enable HTTPS. |

---

## Next Build Steps

1. **Wire a real AI model** into `backend/routes/chat.js` (Anthropic Claude, OpenAI, etc.)
2. **Migrate to Postgres** — replace `db.js` function bodies with SQL queries
3. **Build school roster management** — class/student setup in SchoolDashboard
4. **Add WhatsApp delivery** — between-session curriculum nudges to families
5. **Progress tracking** — mark modules complete, track learner advancement
6. **Payments** — integrate Paystack or Flutterwave for subscriptions

---

## Design System

All CSS tokens are in `frontend/src/styles/tokens.css`:
- **Colors:** Indigo (primary), Marigold (accent), Leaf (success), Paper (light), Ink (dark)
- **Typography:** Baloo 2 (headings), Work Sans (body), IBM Plex Mono (code)

---

## Documentation

For **complete details** on architecture, curriculum design, all API endpoints, and the deployment roadmap, see **[DOCUMENTATION.md](DOCUMENTATION.md)**.

---

## Environment Variables

`backend/.env`:
```
PORT=4000
JWT_SECRET=your-random-secret-string-32-chars-minimum
```

Never commit `.env`. Use a secrets manager in production.

---

## License

(Add your license here)

---

**Questions?** See [DOCUMENTATION.md](DOCUMENTATION.md) or contact hello@aismallsmall.ng
