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
   - [How It Is Structured](#how-it-is-structured)
   - [Track A — AI Literacy Curriculum](#track-a--ai-literacy-curriculum)
     - [Level 1: Beginner — AI Explorers](#level-1-beginner--ai-explorers)
     - [Level 2: Intermediate — AI Builders](#level-2-intermediate--ai-builders)
     - [Level 3: Advanced — AI Thinkers & Creators](#level-3-advanced--ai-thinkers--creators)
     - [Level 4: Expert — AI Innovators](#level-4-expert--ai-innovators)
   - [Track B — Nigerian Curriculum + AI Integration](#track-b--nigerian-curriculum--ai-integration)
     - [Band A (Ages 7–9)](#band-a-ages-79)
     - [Band B (Ages 10–12)](#band-b-ages-1012)
     - [Band C (Ages 13–15)](#band-c-ages-1315)
     - [Band D (Ages 16–17) — WASSCE Track](#band-d-ages-1617--wassce-track)
   - [Assessment Approach](#assessment-approach)
   - [Open Items Before Building](#open-items-before-building)
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

The full curriculum is served from [`backend/data/curriculum.js`](backend/data/curriculum.js) via the [`/api/curriculum`](#curriculum----apicurriculum) endpoints.

---

### How It Is Structured

Two parallel tracks, structured differently on purpose:

- **Track A — AI Literacy:** organised by skill level, not age — Beginner, Intermediate, Advanced, Expert. AI knowledge does not track neatly with age: a 16-year-old who has never used a chatbot needs to start at Beginner, while a sharp 11-year-old who has been experimenting with AI tools at home might move into Intermediate quickly. Placement is based on a short entry check, not birth year.
- **Track B — Curriculum + AI Integration:** organised by age band / school grade, since this track follows the actual Nigerian school curriculum, which is inherently grade-linked and cannot be decoupled from age the way AI literacy can.

**Track B age bands (for curriculum mapping only — Track A does not use these):**

| Band | Ages | Nigerian school equivalent |
|---|---|---|
| Band A | 7–9 | Primary 2–4 |
| Band B | 10–12 | Primary 5–6 / JSS1 |
| Band C | 13–15 | JSS2–SS1 |
| Band D | 16–17 | SS2–SS3 (WASSCE-track) |

**Placement into Track A levels:** a short placement check is run at enrolment (questions/tasks such as "have you used a chatbot before", "can you tell why an AI answer might be wrong", a simple prompting task) to place each child into Beginner, Intermediate, Advanced, or Expert — independent of their Track B age band. A child can be Beginner in Track A while sitting in the Band C curriculum group in Track B, and vice versa. The two tracks run on separate placement logic.

Each AI Literacy module ends with a short assessment, which also functions as the check for moving up to the next level. Each term across both tracks feeds toward that term's Kid Innovator showcase, grouped by whichever cohort makes sense logistically.

> **Note on Track B sources:** NERDC's Basic Education Curriculum (Primary 1–6, JSS1–3) covers Mathematics, English Studies, and Basic Science and Technology as core subjects. The 2025/2026 curriculum update formally added Basic Digital Literacy/IT as a practical skill strand. Band D (ages 16–17) sits outside the 9-Year BECE and instead follows the Senior Secondary curriculum leading to WASSCE, administered by WAEC — English Language and Mathematics are compulsory for essentially all candidates, alongside Civic Education and stream-specific electives. Treat the subject topics below as representative scope — cross-check with the current scheme of work for the specific classes/schools you onboard, since exact term-by-term topic order can vary slightly by state and by school.

---

### Track A — AI Literacy Curriculum

#### Level 1: Beginner — "AI Explorers"

Entry point for anyone new to AI, regardless of age — from a first-time 8-year-old to a first-time 17-year-old. Facilitators should adapt delivery format to the actual age in the room (more verbal/drawn responses for younger beginners, more written responses for older ones) while keeping the content itself at true beginner level.

**Term 1: Meeting AI**

| # | Module | Activity | Assessment |
|---|---|---|---|
| 1 | What Is AI? | Sort a list of "helpers" into AI / not AI | 5-question picture quiz |
| 2 | Talking to AI Nicely | Give the AI three different instructions for drawing a picture and compare results | Write one clear instruction for a picture task |
| 3 | AI Can Get Things Wrong | Find the mistake in an AI-generated example | Spot-the-mistake worksheet |
| 4 | My AI Safety Rules | Role-play "would you tell it this or not?" with example prompts | Verbal or drawn response to 3 safety scenarios |

**Term 2: Playing and Creating with AI**

| # | Module | Activity | Assessment |
|---|---|---|---|
| 1 | Asking Better Questions | Improve a vague prompt three times | Prompt-improvement worksheet |
| 2 | Spot the Robot Picture | Sort real vs. AI images | 8-image sorting quiz |
| 3 | Building My First Chatbot | Guided build of a simple bot (e.g. a "riddle bot") using a no-code tool | Complete and demo the bot |
| 4 | AI All Around Me | Home/school "AI scavenger hunt" list | Completed scavenger hunt sheet with 5 examples |

**Term 3: Thinking Like a Detective**

| # | Module | Activity | Assessment |
|---|---|---|---|
| 1 | Is This Real? | "Real or fake" card game | 6-item real/fake sort |
| 2 | AI Helps Me Learn, It Doesn't Do It For Me | Discuss two example scenarios, decide which is okay | Scenario judgment worksheet (3 scenarios) |
| 3 | My Kid Innovator Idea | Idea worksheet with a drawing | Completed idea worksheet |
| 4 | Showcase Prep | Practice explaining the idea out loud in 3 sentences | Kid Innovator mini-pitch (1–2 minutes, supported) |

---

#### Level 2: Intermediate — "AI Builders"

For learners who have completed Beginner, or who place in here directly at enrolment (e.g. an older child with some prior AI exposure).

**Term 1: Understanding AI**

| # | Module | Activity | Assessment |
|---|---|---|---|
| 1 | How AI Actually Works | Simple pattern-guessing game to illustrate "learning from examples" | Short written explanation in their own words |
| 2 | The AI Tools I Already Use | Personal "AI tools I use" inventory | Categorisation quiz |
| 3 | The Art of Prompting | Take one weak prompt through three rounds of improvement | Graded prompt-writing exercise (clarity, structure) |
| 4 | Why AI Isn't Always Fair | Guided discussion + example | Short reflection response |

**Term 2: Spotting Fakes and Staying Safe**

| # | Module | Activity | Assessment |
|---|---|---|---|
| 1 | Deepfakes and Fake Images | Analyse a set of real vs. AI images | 10-item real/fake test with reasoning |
| 2 | Fake Voice Notes and Scam Calls | Listen to example scenarios and identify red flags | Red-flag checklist applied to 3 scenarios |
| 3 | Fake News and WhatsApp Forwards | Fact-check a set of sample forwards using lateral reading | Fact-check worksheet |
| 4 | My Digital Footprint | "Share or don't share" sorting exercise | Privacy-scenario quiz |

**Term 3: Building With AI**

| # | Module | Activity | Assessment |
|---|---|---|---|
| 1 | No-Code Tool Basics | Build a simple app/game/chatbot using a no-code platform | Working build, demoed to the group |
| 2 | Study Partner, Not Shortcut | Sort 10 homework scenarios into "good use" / "bad use" | Scored sorting exercise |
| 3 | Designing My Kid Innovator Project | Pick a real problem and sketch an AI-assisted solution | Project plan worksheet |
| 4 | Pitching My Idea | Structure a short pitch: problem, idea, how AI helps | Kid Innovator pitch (2–3 minutes) |

---

#### Level 3: Advanced — "AI Thinkers & Creators"

For learners who have completed Intermediate, or who place in directly — e.g. an older teen with solid existing AI/tech familiarity.

**Term 1: How AI Really Works**

| # | Module | Activity | Assessment |
|---|---|---|---|
| 1 | Machine Learning Basics | — | Short written explanation with an example |
| 2 | Generative AI Explained | Catch a hallucinated fact in a sample AI response | Hallucination-detection exercise |
| 3 | Advanced Prompting Techniques | Solve the same task with a weak prompt vs. a strong one, compare results | Graded multi-part prompting task |
| 4 | The Ethics of AI | Structured debate on one AI ethics question | Short position writeup with reasoning |

**Term 2: Critical Thinking in an AI World**

| # | Module | Activity | Assessment |
|---|---|---|---|
| 1 | Deepfakes, Voice Cloning and Digital Deception | — | Case-study analysis |
| 2 | Verifying Information Like a Fact-Checker | Verify 3 real or realistic claims | Fact-checking report |
| 3 | AI and Academic Integrity | Guided discussion of grey-area scenarios | Scenario-based written response |
| 4 | Data Privacy and AI Tools | Privacy-checklist exercise applied to a real app | Privacy-checklist submission |

**Term 3: Becoming an AI Creator**

| # | Module | Activity | Assessment |
|---|---|---|---|
| 1 | Building Real Projects With No-Code AI Tools | Build a functioning chatbot, simple automation, or small app | Working project, demoed |
| 2 | Finding a Real Problem | Light design-thinking: identify a genuine problem worth solving (school, home, community) | Problem-definition writeup |
| 3 | Developing the Kid Innovator Pitch | Build a case: problem, solution, how AI is used, why it matters | Pitch deck or structured writeup |
| 4 | Kid Innovator Showcase | Full pitch delivery | Final showcase presentation (5 minutes, Q&A) |

---

#### Level 4: Expert — "AI Innovators"

The exam-prep and capstone-focused level. Most relevant to older students on the WASSCE track, but placed here by demonstrated skill, not age — a strong 14-year-old could reach this level too.

**Term 1: Advanced AI Fluency**

| # | Module | Activity | Assessment |
|---|---|---|---|
| 1 | AI Across Every Subject | Apply AI to a real study task across subjects | Short applied project |
| 2 | Advanced Prompting for Research and Exam Prep | Generate targeted practice questions; self-check work without copying | Graded multi-step prompting exercise tied to a real subject |
| 3 | AI for Career and University Prep | Brainstorm for CVs/personal statements (never write them wholesale); research courses | Brainstorm-to-draft exercise reviewed for originality |
| 4 | AI Ethics and Global Debates | Structured, opinion-forming discussion on AI's impact | Written position piece with reasoning |

**Term 2: Critical Digital Citizenship**

| # | Module | Activity | Assessment |
|---|---|---|---|
| 1 | Deepfakes, Disinformation and Elections | — | Analysis of a real or realistic disinformation case |
| 2 | Academic Integrity at the WASSCE Level | — | Scenario-judgment test with justification required |
| 3 | AI and the Future of Work | — | Short reflective writeup |
| 4 | Data Privacy, Security and Digital Rights | Applied security/privacy checklist | Applied checklist submission |

**Term 3: AI Innovator Capstone**

> **Note for SS3 candidates:** Term 3 falls in the WASSCE exam window — shift this term's activities to lighter, revision-focused sessions for that cohort rather than new capstone work.

| # | Module | Activity | Assessment |
|---|---|---|---|
| 1 | Advanced No-Code/Low-Code Building | Build a functioning app, automation, or small tool solving a real problem | Working build, demoed |
| 2 | Entrepreneurship and AI | Define a real problem and a clear value proposition | Written business/value-proposition case |
| 3 | Capstone Project Development | Full build-out of the chosen idea | Project milestones checklist |
| 4 | Capstone Showcase | Polished pitch, suitable as a portfolio piece for university or job applications | Final showcase with judges and Q&A |

---

### Track B — Nigerian Curriculum + AI Integration

> **Principle for all bands:** AI is the study partner sitting next to the curriculum, not a replacement for it. For every subject/topic, the AI's role is one or more of: explain it a different way, generate extra practice questions, check work and explain mistakes, or turn revision into a game. Kids are taught explicitly in Track A when this crosses from "helping me learn" into "doing it for me" — Track B is where they practise that judgment on real schoolwork.

---

#### Band A (Ages 7–9)

| Term | Mathematics | English Studies | Basic Science & Technology | AI Integration Examples |
|---|---|---|---|---|
| 1 | Number recognition, addition/subtraction, shapes | Phonics, simple sentences, reading comprehension | Living and non-living things, my body, weather | AI reads a short story aloud and asks comprehension questions; AI generates extra addition practice at the child's level |
| 2 | Multiplication basics, measurement, time | Vocabulary building, simple comprehension passages | Basic hygiene, simple machines, plants and animals, simple safety rules | AI turns spelling words into a quiz game; AI explains a science term using a picture-style description |
| 3 | Fractions (basic), money/counting | Simple composition, storytelling | Basic hygiene, simple machines around us | AI helps brainstorm a short story's next sentence (without writing it for them); AI quizzes on term vocabulary before test week |

---

#### Band B (Ages 10–12)

| Term | Mathematics | English Studies | Basic Science & Technology / Basic Digital Literacy | AI Integration Examples |
|---|---|---|---|---|
| 1 | Fractions, decimals, basic geometry | Grammar (tenses, parts of speech), comprehension | Matter and its properties, simple circuits, intro to computers | AI walks through a fraction problem step by step instead of giving the final answer; AI drills grammar with instant feedback |
| 2 | Ratio, percentages, basic algebra intro | Essay structure, summary writing | Energy and forces, human body systems, basic coding concepts | AI reviews a draft essay and asks guiding questions rather than rewriting it; AI explains a science diagram in simpler terms |
| 3 | Data handling, basic geometry (angles, shapes) | Comprehension, letter/composition writing | Environment and conservation, intro to typing/basic computer use | AI generates practice comprehension passages at reading level; AI-supported typing/keyboarding practice tied to Basic Digital Literacy strand |

---

#### Band C (Ages 13–15)

| Term | Mathematics | English Studies | Basic Science & Technology / Computer Studies | AI Integration Examples |
|---|---|---|---|---|
| 1 | Algebra, linear equations, basic geometry proofs | Literature comprehension, formal writing | Basic physics concepts (motion, energy), intro to programming logic | AI works through algebra problems step by step and explains why, not just the answer; AI critiques essay structure/argument (not the wording) |
| 2 | Statistics, probability | Argumentative essay writing, comprehension | Chemistry basics (elements, reactions), computer hardware/software basics | AI helps structure an argumentative essay outline; AI generates practice statistics questions with worked solutions |
| 3 | Geometry, introductory trigonometry | Exam-style comprehension and composition practice | Basic biology (cells, systems), intro to web/app building basics | AI-generated past-question-style drills for exam prep (BECE-aligned); AI supports a small coding/web project tying into the Kid Innovator track |

---

#### Band D (Ages 16–17) — WASSCE Track

> **Scope note:** This covers the compulsory core (English Language, Mathematics, Civic Education) that applies to nearly all candidates regardless of stream. Stream-specific electives (Science: Biology/Chemistry/Physics; Arts/Commercial electives) are a natural phase-two extension once the core is validated with a pilot cohort.

| Term | Mathematics | English Language | Civic Education | AI Integration Examples |
|---|---|---|---|---|
| 1 | Algebra, functions, indices and logarithms | Comprehension, lexis and structure, essay writing | Citizenship, rights and responsibilities | AI walks through algebra/logarithm problems step by step, explaining reasoning not just the answer; AI critiques essay structure and argument before a student submits it |
| 2 | Trigonometry, introductory statistics | Summary writing, oral English fundamentals | Democracy, rule of law, civic participation | AI-generated WASSCE-style past questions for targeted practice; AI-supported discussion prep for civic topics (debate framing, not opinions handed to the student) |
| 3 | Mensuration, further statistics and probability | Full exam-style revision: comprehension, essay, objectives | Revision and current-affairs application | Timed past-question drilling with AI-generated variations; AI-built personalised revision plan based on identified weak areas. For SS3 — shift to pure revision, no new topics, given the WASSCE exam window. |

---

### Assessment Approach

| Level | Type | Notes |
|---|---|---|
| **Module-level (Track A)** | Short, low-stakes | Quizzes, sorting exercises, short written/verbal responses, hands-on demos. For Band A, favour verbal/drawn responses over reading-heavy tests. |
| **Subject-level (Track B)** | Continuous-assessment style | Short tests and class exercises. AI-generated extra practice is used for revision, not as the graded assessment itself, so results reflect the child's own understanding. |
| **Term-level (both tracks)** | Kid Innovator milestone | An idea + drawing (Band A) → project + pitch (Band B) → full pitch with Q&A (Band C) → portfolio-ready capstone (Band D, rebrand as "Young Innovator" for 16–17 year olds). |

> **Consistency check:** every module assessment should be answerable using only what was taught in that module. Avoid testing skills or vocabulary not yet introduced.

---

### Open Items Before Building

1. **Track B topic ordering** — topics above are representative scope based on the NERDC 9-Year Basic Education Curriculum. Validate exact term-by-term ordering against the specific scheme of work once you onboard a pilot school, as it can vary slightly by state and school.

2. **Open chat vs. structured interaction** — decide per band how much free-form prompting is allowed. Recommended approach:
   - Band A: fully structured/guided AI interaction, no open chat
   - Band B: scoped/guided chat within exercises
   - Band C: more open prompting practice, given the explicit Track A focus on prompting skills
   - Band D: full open prompting with academic integrity guardrails active

3. **Kid Innovator showcase format** — should scale with band: idea + drawing (Band A) → project + short pitch (Band B) → full pitch with Q&A (Band C) → portfolio-ready capstone (Band D).

4. **Band D stream electives gap** — Band D's Track B currently covers only the compulsory core. Science/Arts/Commercial stream electives are a real gap for a full WASSCE prep offering. Decide whether to add these before or after the first pilot, as they significantly expand build scope.

5. **Band D audience scope** — Band D (16–17) sits outside the 7–15 range originally scoped for AI Small Small. Confirm this is an intentional widening of the target audience, and therefore of parent/school messaging, pricing tiers, and marketing — rather than just a content addition.

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
