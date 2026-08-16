# AI Small Small — Full Project Documentation

> AI literacy and Nigerian curriculum support for children aged 7–17, delivered through a web platform and WhatsApp-based program that parents can see inside.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Getting Started (Local Development)](#4-getting-started-local-development)
5. [Environment Variables](#5-environment-variables)
6. [Backend — Architecture & API Reference](#6-backend--architecture--api-reference)
   - [Data Layer (db.js)](#data-layer-dbjs)
   - [Authentication Middleware](#authentication-middleware)
   - [API Endpoints](#api-endpoints)
7. [Frontend — Architecture & Routing](#7-frontend--architecture--routing)
   - [Auth Context](#auth-context)
   - [API Client](#api-client)
   - [Pages & Routes](#pages--routes)
   - [Dashboards](#dashboards)
8. [User Roles & Account Model](#8-user-roles--account-model)
9. [Curriculum Model](#9-curriculum-model)
10. [AI Chat & Guardrails](#10-ai-chat--guardrails)
11. [Design System](#11-design-system)
12. [Security Notes](#12-security-notes)
13. [What Is Not Built Yet](#13-what-is-not-built-yet)
14. [Suggested Next Build Steps](#14-suggested-next-build-steps)

---

## 1. Project Overview

AI Small Small is an educational platform built for Nigerian children aged 7–17. It teaches them how to use AI critically and confidently — not just as an answer machine, but as a thinking partner — while running alongside the Nigerian school curriculum (BECE/WAEC syllabus).

**Core principles baked into the product:**
- **No black box for parents.** Every chat a child has on the platform is visible to their parent. The platform makes that promise technically enforceable (not just a UI feature).
- **AI literacy, not AI dependency.** The chat bot actively redirects "do it for me" requests back toward learning.
- **Curriculum alignment.** The platform reinforces what children already study in school rather than replacing it.
- **WhatsApp-first delivery.** The between-session curriculum is designed to reach families where they already are (WhatsApp integration is a planned next phase).

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Vite 6 |
| Backend | Node.js (ESM), Express 4 |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Database | JSON file (development) — swap for Postgres in production |
| Styling | Vanilla CSS with CSS custom properties (design tokens) |
| Build tool | Vite |

**Backend dependencies:**

| Package | Purpose |
|---|---|
| `express` | HTTP server and routing |
| `cors` | Cross-origin request handling |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT creation and verification |
| `dotenv` | Environment variable loading |

**Frontend dependencies:**

| Package | Purpose |
|---|---|
| `react` / `react-dom` | UI framework |
| `react-router-dom` | Client-side routing |
| `vite` + `@vitejs/plugin-react` | Dev server and bundler |

---

## 3. Project Structure

```
ai-small-small/
├── .gitignore
├── README.md
├── DOCUMENTATION.md
│
├── backend/
│   ├── server.js              # Express app entry point
│   ├── db.js                  # JSON-file data layer (swap for a real DB later)
│   ├── .env.example           # Required environment variable template
│   ├── package.json
│   ├── data/
│   │   ├── curriculum.js      # Track A and Track B seed content
│   │   └── db.json            # Auto-created flat-file database
│   ├── middleware/
│   │   └── auth.js            # JWT verification + role guards
│   └── routes/
│       ├── auth.js            # POST /signup, POST /login
│       ├── children.js        # Child account management + child login
│       ├── curriculum.js      # GET track-a, GET track-b
│       └── chat.js            # AI chat + parent-visible history
│
└── frontend/
    ├── index.html
    ├── vite.config.js         # Dev proxy: /api → localhost:4000
    ├── package.json
    └── src/
        ├── main.jsx           # React entry point
        ├── App.jsx            # Route definitions
        ├── AuthContext.jsx    # Session state (React Context)
        ├── api.js             # Typed fetch wrapper for all backend calls
        ├── components/
        │   ├── Nav.jsx        # Top navigation bar
        │   ├── OnboardingModal.jsx  # First-login welcome flow
        │   └── ProtectedRoute.jsx  # Auth guard for private routes
        ├── pages/
        │   ├── Landing.jsx    # Public marketing homepage
        │   ├── SignUp.jsx     # Multi-step signup (parent / learner / school)
        │   ├── Login.jsx      # Adult user login
        │   ├── ChildLogin.jsx # Child-specific login at /kid-login
        │   ├── Chat.jsx       # AI chat interface
        │   ├── ChatHistory.jsx # Parent-visible chat log
        │   ├── Curriculum.jsx  # Curriculum browser
        │   ├── Profile.jsx    # Account info
        │   ├── Progress.jsx   # Learning progress (placeholder)
        │   ├── Settings.jsx   # Account settings (placeholder)
        │   ├── About.jsx      # About page
        │   ├── ForParents.jsx # Parents marketing page
        │   ├── ForSchools.jsx # Schools marketing page
        │   ├── ForSponsors.jsx # Sponsors marketing page
        │   └── dashboard/
        │       ├── ParentDashboard.jsx  # Manage children, see progress
        │       ├── LearnerDashboard.jsx # Child/teen learning hub
        │       └── SchoolDashboard.jsx  # School pilot tools
        └── styles/
            └── tokens.css     # CSS custom properties (design tokens)
```

---

## 4. Getting Started (Local Development)

### Prerequisites

- **Node.js 18+** — [Download here](https://nodejs.org)
- Two terminal windows (one for backend, one for frontend)

### Step 1 — Start the backend

```bash
cd backend
npm install
cp .env.example .env
# Open .env and change JWT_SECRET to any long random string
npm run dev
```

The backend runs on **http://localhost:4000**

### Step 2 — Start the frontend

```bash
# In a new terminal window
cd frontend
npm install
npm run dev
```

The frontend runs on **http://localhost:5173**

Vite is configured to proxy all `/api` requests to `http://localhost:4000`, so the frontend and backend talk to each other automatically in development — no CORS issues.

### Step 3 — Try it

1. Open **http://localhost:5173**
2. Click **Sign Up** and create a **Parent** account
3. From the parent dashboard, add a child account
4. Open a new browser tab, go to **/kid-login**, and log in as the child
5. Try the AI chat and browse the curriculum
6. Log back in as the parent to view your child's chat history

---

## 5. Environment Variables

Create `backend/.env` by copying `backend/.env.example`:

```bash
cp backend/.env.example backend/.env
```

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Port for the Express server. Defaults to `4000`. |
| `JWT_SECRET` | **Yes** | Secret key for signing JWTs. Use a long random string (32+ chars). Never commit this. |

> **Production note:** Use a secrets manager (e.g. AWS Secrets Manager, Railway environment variables) rather than a `.env` file in production.

---

## 6. Backend — Architecture & API Reference

The backend is a standard Express app using ES modules (`"type": "module"` in `package.json`). All routes are mounted under `/api`.

### Data Layer (`db.js`)

All database access is centralised in [`backend/db.js`](backend/db.js). It wraps a single JSON file (`data/db.json`) and exposes a simple interface:

| Method | Description |
|---|---|
| `db.getUsers()` | Return all users |
| `db.getUserByEmail(email)` | Find user by email (case-insensitive) |
| `db.getUserById(id)` | Find user by UUID |
| `db.createUser(user)` | Persist a new user |
| `db.getChildrenByParentId(parentId)` | List a parent's children |
| `db.addChild(child)` | Persist a new child record |
| `db.getChildById(id)` | Find child by UUID |
| `db.getChildByUsername(username)` | Find child by username (case-insensitive) |
| `db.logChat(entry)` | Save a chat message + reply |
| `db.getChatLogsForChild(childId)` | Get all chat history for a child |

**To swap to Postgres:** replace every function body in `db.js` with SQL queries. No other file needs to change.

### Authentication Middleware

[`backend/middleware/auth.js`](backend/middleware/auth.js) exports two middleware functions:

**`requireAuth`**
- Reads the `Authorization: Bearer <token>` header
- Verifies the JWT against `JWT_SECRET`
- Attaches the decoded payload to `req.user`
- Returns `401` if missing or expired

**`requireRole(...roles)`**
- Must be used after `requireAuth`
- Returns `403` if `req.user.role` is not in the allowed list
- Example: `requireRole('parent')` blocks learners and school accounts

### API Endpoints

#### Health Check

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | None | Returns `{ ok: true }`. Use to verify the server is running. |

---

#### Auth — `/api/auth`

**`POST /api/auth/signup`**

Register a new adult user account.

Request body:
```json
{
  "name": "Ada Okonkwo",
  "email": "ada@example.com",
  "password": "mypassword123",
  "role": "parent"
}
```

- `role` must be one of: `parent`, `learner`, `school`
- `password` must be at least 8 characters
- Returns `409` if email already exists

Response `201`:
```json
{
  "token": "<jwt>",
  "user": { "id": "uuid", "name": "Ada Okonkwo", "email": "ada@example.com", "role": "parent" }
}
```

---

**`POST /api/auth/login`**

Log in as an existing adult user.

Request body:
```json
{
  "email": "ada@example.com",
  "password": "mypassword123"
}
```

Response `200`:
```json
{
  "token": "<jwt>",
  "user": { "id": "uuid", "name": "Ada Okonkwo", "email": "ada@example.com", "role": "parent" }
}
```

---

#### Children — `/api/children`

**`POST /api/children`** — `requireAuth` + `requireRole('parent')`

Parent creates a child account. The child never self-registers.

Request body:
```json
{
  "name": "Chidi Okonkwo",
  "age": 11,
  "username": "chidi2024",
  "password": "childspassword"
}
```

- `age` must be between 7 and 17
- `username` must be alphanumeric only (for child privacy)
- Returns `409` if username is already taken
- `trackBBand` is automatically assigned based on age:
  - Age 7–9 → Band A
  - Age 10–12 → Band B
  - Age 13–15 → Band C
  - Age 16–17 → Band D

Response `201`: child object (no `passwordHash`)

---

**`GET /api/children`** — `requireAuth` + `requireRole('parent')`

Returns all children belonging to the authenticated parent.

Response `200`: array of child objects

---

**`POST /api/children/login`**

Child logs in with the username and password their parent created.

Request body:
```json
{
  "username": "chidi2024",
  "password": "childspassword"
}
```

Response `200`:
```json
{
  "token": "<jwt>",
  "user": { "id": "uuid", "name": "Chidi Okonkwo", "role": "child", "age": 11, "trackBBand": "B" }
}
```

The JWT for a child includes `parentId` so the backend can enforce parent-child access control.

---

#### Curriculum — `/api/curriculum`

Both endpoints are public (no auth required).

**`GET /api/curriculum/track-a`**

Returns all Track A levels (AI Literacy by skill level).

**`GET /api/curriculum/track-b`**

Returns all Track B bands (Nigerian curriculum by age band).

---

#### Chat — `/api/chat`

**`POST /api/chat`** — `requireAuth`

Send a message to the AI tutor.

Request body:
```json
{
  "message": "Can you explain how machine learning works?"
}
```

- If the logged-in user is a **child**, `childId` is set server-side automatically (the client cannot spoof this)
- If the logged-in user is a parent or learner, `childId` in the body is used (or `null`)

Response `200`:
```json
{
  "reply": "Got it. Let's work through this step by step - what have you tried so far?",
  "entryId": "uuid"
}
```

---

**`GET /api/chat/history/:childId`** — `requireAuth`

Retrieve a child's full chat history.

- Only the **child's own parent** or the **child themselves** can access this
- Any other authenticated user receives `403`

Response `200`: array of chat log entries
```json
[
  {
    "id": "uuid",
    "childId": "uuid",
    "userId": "uuid",
    "message": "Can you write my essay?",
    "reply": "I won't do it for you, but I'll help you build it yourself...",
    "flagged": false,
    "createdAt": "2026-01-01T10:00:00.000Z"
  }
]
```

---

## 7. Frontend — Architecture & Routing

### Auth Context

[`frontend/src/AuthContext.jsx`](frontend/src/AuthContext.jsx) manages the session globally using React Context.

- On load, restores the session from `localStorage` (`nga_token`, `nga_user`)
- `login(token, user)` — stores token and user, updates state
- `logout()` — clears localStorage and state
- `useAuth()` hook — access `{ user, login, logout }` from any component

### API Client

[`frontend/src/api.js`](frontend/src/api.js) is a thin fetch wrapper. All calls go through the `request()` function which:

1. Reads the JWT from `localStorage`
2. Attaches it as `Authorization: Bearer <token>`
3. Throws a user-readable error if the response is not `ok`

Available methods:
```js
api.signup(payload)
api.login(payload)
api.addChild(payload)
api.childLogin(payload)
api.getChildren()
api.getTrackA()
api.getTrackB()
api.sendChat(payload)
```

### Pages & Routes

| Path | Component | Auth Required | Description |
|---|---|---|---|
| `/` | `Landing` | No | Marketing homepage |
| `/signup` | `SignUp` | No | Multi-step signup form |
| `/login` | `Login` | No | Adult login |
| `/kid-login` | `ChildLogin` | No | Child login (username/password) |
| `/for-parents` | `ForParents` | No | Parents marketing page |
| `/for-schools` | `ForSchools` | No | Schools marketing page |
| `/for-sponsors` | `ForSponsors` | No | Sponsors marketing page |
| `/about` | `About` | No | About the programme |
| `/dashboard` | `Dashboard` (role-switched) | **Yes** | Role-specific dashboard |
| `/curriculum` | `Curriculum` | **Yes** | Browse Track A & B |
| `/chat` | `Chat` | **Yes** | AI tutor chat |
| `/chat-history` | `ChatHistory` | **Yes** | Parent-visible chat logs |
| `/profile` | `Profile` | **Yes** | Account info |
| `/progress` | `Progress` | **Yes** | Learning progress |
| `/settings` | `Settings` | **Yes** | Account settings |

Protected routes are wrapped with `<ProtectedRoute>` which redirects unauthenticated users to `/login`.

### Dashboards

The `/dashboard` route renders a different component based on `user.role`:

| Role | Component | Key features |
|---|---|---|
| `parent` | `ParentDashboard` | Add children, view children list, link to their chat history |
| `learner` / `child` | `LearnerDashboard` | Access curriculum, start a chat session |
| `school` | `SchoolDashboard` | AI teaching tools, pilot setup contact |

---

## 8. User Roles & Account Model

The platform has four distinct account types:

| Role | How created | Login route | JWT payload |
|---|---|---|---|
| `parent` | Self-signup at `/signup` | `/login` | `{ id, role, name }` |
| `learner` | Self-signup at `/signup` (16+ independent teen) | `/login` | `{ id, role, name }` |
| `school` | Self-signup at `/signup` | `/login` | `{ id, role, name }` |
| `child` | Created by a parent via the dashboard | `/kid-login` | `{ id, role, name, parentId }` |

**Why this model?**

Children (under 16) do not self-register. The parent creates the account on their behalf and sets the credentials. This mirrors Khan Academy's design and is what makes it possible to:
- Automatically link every chat message to the correct child (server-side, not client-side)
- Enforce that only that child's own parent can read their history
- Show parents the full picture without building a separate notification system

---

## 9. Curriculum Model

The curriculum has two parallel tracks served from [`backend/data/curriculum.js`](backend/data/curriculum.js):

### Track A — AI Literacy (by skill level)

Grouped by skill, not age. A first-timer of any age starts at Level 1.

| Level | Name | Subtitle | Focus |
|---|---|---|---|
| 1 | Beginner | AI Explorers | What AI is, safety, basic interactions |
| 2 | Intermediate | AI Builders | How AI works, prompting, bias awareness |
| 3 | Advanced | AI Thinkers & Creators | ML basics, generative AI, ethics |
| 4 | Expert | AI Innovators | Exam prep, research, career/university AI use |

Each level contains terms, and each term contains modules with an associated assessment.

### Track B — Nigerian Curriculum (by age band)

Age-banded to mirror the Nigerian school system. A child's band is set automatically at account creation based on their age.

| Band | Ages | School equivalent | Core subjects |
|---|---|---|---|
| A | 7–9 | Primary 2–4 | Maths, English, Basic Science |
| B | 10–12 | Primary 5–6 / JSS1 | + Basic Digital Literacy |
| C | 13–15 | JSS2–SS1 | + Computer Studies |
| D | 16–17 | SS1–SS3 (WASSCE) | + Civic Education |

---

## 10. AI Chat & Guardrails

The chat endpoint ([`backend/routes/chat.js`](backend/routes/chat.js)) currently uses a **rule-based mock AI** while the real model integration is pending.

### Guardrail triggers

If a message contains any of the following phrases, the bot redirects toward learning rather than completing the task:

- `"write my essay"`
- `"do my homework"`
- `"just give me the answer"`
- `"do it for me"`

**Response:** *"I won't do it for you, but I'll help you build it yourself — what's the topic, and what do you already have?"*

### Fake/deepfake detection prompt

If the message mentions `fake`, `deepfake`, or `real`:

**Response:** *"Good instinct to check! Send me the details and let's look at it together — what made you suspicious?"*

### Default response

**Response:** *"Got it. Let's work through this step by step — what have you tried so far?"*

### Plugging in a real model

Replace the `mockReply()` function body in [`backend/routes/chat.js`](backend/routes/chat.js) with a call to your preferred model API (e.g. Anthropic Claude, OpenAI GPT-4). The rest of the route — auth, childId binding, logging, history access control — does not need to change.

---

## 11. Design System

All CSS custom properties live in [`frontend/src/styles/tokens.css`](frontend/src/styles/tokens.css). The palette is shared across all pages including the marketing site and the app:

| Token | Value | Usage |
|---|---|---|
| `--indigo` | Deep blue | Primary brand colour, backgrounds |
| `--marigold` | Amber/orange | Accent, CTAs, highlights |
| `--leaf` | Green | Success states |
| `--paper` | Off-white | Text on dark backgrounds |
| `--ink` | Near-black | Body text |
| `--ink-soft` | Muted grey | Secondary text |
| `--line` | Light grey | Borders |

**Typography:**
- **Baloo 2** — headings and brand name
- **Work Sans** — body text
- **IBM Plex Mono** — code, labels, data

---

## 12. Security Notes

| Area | Implementation |
|---|---|
| Passwords | Hashed with `bcryptjs` (cost factor 10). Plain-text passwords are never stored. |
| Sessions | Stateless JWT, 7-day expiry. Stored in `localStorage` on the client. |
| Chat history access | Enforced server-side: only the child's own parent or the child can read it. A `403` is returned for any other authenticated user — tested end-to-end. |
| Child ID binding | When a child is logged in, their `childId` is taken from the JWT, not from the request body. A child cannot log chat against a different child's ID. |
| Username privacy | Child usernames are alphanumeric only. The API explicitly warns parents not to use their child's real name. |
| `.env` | Excluded from git via `.gitignore`. `JWT_SECRET` must be set before running. |
| **Production TODO** | Switch `localStorage` token storage to `httpOnly` cookies to mitigate XSS token theft. Add rate limiting on auth routes. Enable HTTPS. |

---

## 13. What Is Not Built Yet

These items are intentionally deferred so the first version ships:

| Feature | Notes |
|---|---|
| Real AI model integration | Currently rule-based mocks. Wire into `backend/routes/chat.js`. |
| School roster management | `SchoolDashboard` links to a contact email for now. |
| Kid Innovator submission flow | Planned for Expert-level learners. |
| Payments / subscriptions | Not started. |
| Production database | Currently a JSON file. Swap `db.js` for Postgres before real users. |
| WhatsApp delivery layer | Between-session curriculum delivery. Major next phase. |
| Progress tracking | The `/progress` route exists but is a placeholder. Needs a module-completion model in the DB. |
| Learner-to-parent linking | A `learner` (16+, self-signup) cannot currently be linked to a parent's dashboard. Fine for older teens, but may need revisiting. |

---

## 14. Suggested Next Build Steps

In priority order:

1. **Wire a real AI model** into [`backend/routes/chat.js`](backend/routes/chat.js) — replace `mockReply()` with an Anthropic or OpenAI API call. Add the API key to `.env`.

2. **Move to Postgres** — replace [`backend/db.js`](backend/db.js) function bodies with SQL (using `pg` or `drizzle-orm`). The interface is already abstracted, so no other file changes.

3. **School roster management** — build the class/student roster flow into `SchoolDashboard` and add a `/api/schools` route.

4. **WhatsApp integration** — use the WhatsApp Business API or Twilio to deliver between-session curriculum nudges to parents/children.

5. **Progress tracking** — add a `completedModules` array to the child record and a `PATCH /api/children/:id/progress` endpoint. Wire the curriculum browser to mark modules complete.

6. **Payments** — integrate Paystack (Nigeria-native) or Flutterwave for subscription management.

---

*Documentation last updated: 2026. For questions, contact hello@aismallsmall.ng*
