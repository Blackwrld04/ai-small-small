# AI Small Small - Full-Stack Scaffold

A real, working React + Node.js foundation for the AI Small Small platform:
AI literacy + Nigerian curriculum support for kids 7–17.

## What's built in this first pass

- **Auth**: real signup/login with roles (parent, learner, school), JWT sessions, hashed passwords
- **Parent-created child accounts**: matches Khan Academy's actual model - a parent creates a username + password *for* their child (the child never self-registers). The child logs in separately at `/kid-login` with those credentials
- **Parent dashboard**: add children, see each child's curriculum band, jump to their chat history
- **Learner/child dashboard**: entry point to curriculum and chat, shared by both self-directed 16+ learners and logged-in children
- **School dashboard**: placeholder landing point for the pilot-setup flow (roster management is the next build phase)
- **Curriculum browser**: Track A (AI Literacy, by skill level) and Track B (Nigerian curriculum, by age band) - served live from the backend, using the actual curriculum framework content
- **AI chat**: working chat UI wired to a real backend endpoint. Replies are currently mocked with guardrail logic (redirects "just do it for me" requests back to teaching) - this is where a real model call (e.g. the Anthropic API) plugs in next
- **Parent-visible chat history with real access control**: a child's chats are automatically tied to their own account (not passed loosely from the client), and the backend enforces that only *that child's own parent* - or the child themselves - can view them. Verified end-to-end: an unrelated parent gets a 403.
- **Profile page**: basic account info for any logged-in user
- Same visual design system as the marketing landing page throughout (indigo/marigold/leaf palette, Baloo 2 + Work Sans + IBM Plex Mono)

## What's NOT built yet (intentionally, so the first pass ships)

- Real AI model integration (currently rule-based mock replies)
- School roster / class management
- Kid Innovator submission flow
- Payments / subscriptions
- Production database (currently a JSON file - fine for development, swap for Postgres before real users)
- WhatsApp integration
- A "learner" (16+, self-signup) account currently can't yet be *linked* to a parent's dashboard - it's fully independent, which is the right call for an older teen managing their own account, but worth revisiting if younger self-directed learners end up using that path too
- Payments / subscriptions
- Production database (currently a JSON file - fine for development, swap for Postgres before real users)
- WhatsApp integration

## Running it locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

### 1. Start the backend
```
cd backend
npm install
cp .env.example .env    # then edit JWT_SECRET to something random
npm run dev
```
Runs on http://localhost:4000

### 2. Start the frontend (in a new terminal)
```
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173 and proxies `/api` calls to the backend automatically.

### 3. Try it
Open http://localhost:5173, sign up as a Parent, add a child, and browse the curriculum.

## Project structure
```
backend/
  server.js            - Express app entry point
  db.js                - JSON-file data layer (swap for a real DB later)
  data/curriculum.js   - seeded Track A / Track B content
  routes/              - auth, children, curriculum, chat
  middleware/auth.js   - JWT verification + role guards

frontend/
  src/
    pages/             - route-level screens
    pages/dashboard/   - role-specific dashboards
    components/        - Nav, ProtectedRoute
    styles/tokens.css  - shared design system (ported from the landing page)
    api.js             - typed fetch wrapper for the backend
    AuthContext.jsx     - session state
```

## Suggested next build steps, in order
1. Wire a real AI model into `backend/routes/chat.js`
2. School roster management
3. Move `db.js` to Postgres
4. WhatsApp delivery layer for the between-session curriculum
