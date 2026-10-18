# FF ELITE ARENA — ESPORTS TOURNAMENT PLATFORM

> **Brand Slogan:** *Play Fair. Compete Hard. Win Big.*

A professional, high-performance esports platform for Free Fire custom room tournaments, engineered with React, Tailwind CSS, TypeScript, and a responsive tactical esports design.

---

## 🎮 Core Tournament Economics & Configuration
- **Entry Fee:** ₹30 per player (Solo: ₹30, Duo: ₹60, Squad: ₹120)
- **Booyah Victory Reward:** ₹115 per match
- **Verified Kill Bounty:** ₹15 per audited kill
- **Planned Daily Schedule:** 7 matches daily (11:00 AM, 1:00 PM, 3:00 PM, 5:00 PM, 7:00 PM, 9:00 PM, 10:30 PM)
- **Room Capacity:** Up to 48/50 players per custom room

---

## 🌟 Key Features Built

### 1. Brand Identity & Original Logo
- Original esports shield crest featuring crimson flame wings, beveled titanium border, and faceted ruby core.
- Custom typography using Rajdhani, Chakra Petch, and Teko for a clean, competitive gaming aesthetic.

### 2. Player Registration & Payment Workflow
- In-game Name, Free Fire UID validation (8–12 digits), WhatsApp number validation (10 digits).
- Mode selection: **Solo, Duo, and Squad** with dynamic teammate inputs.
- Real-time entry fee calculation.
- Configurable UPI ID display with one-click copy, and 12-digit UTR Transaction ID submission.
- Automatic unique Reference ID generator (`FFA-M<match>-<rand>`).
- Strict privacy enforcement: phone numbers and UIDs are masked on public pages.

### 3. Room Pass & Status Tracker
- Instant player lookup via Registration Reference ID, WhatsApp number, or Free Fire UID.
- Shows live status: **Pending**, **Verified**, or **Rejected** (with admin reason).
- Once marked **Verified**, players can view and copy the Custom Room ID and Password 15 minutes before match start.

### 4. Interactive Reward Calculator
- Allows players to simulate earnings before registering by adjusting kill sliders and toggling the ₹115 Booyah prize.

### 5. Leaderboard & Results Archive
- Seasonal standings with clear **DEMO** notices for sample records.
- Results archive displaying verified Booyah winners, top fraggers, and UPI prize disbursement logs.

### 6. Full Administrative Console (Password: `admin`)
- **Overview:** Live counter of total registrations, pending UTR verifications, verified players, and revenue collected.
- **Registrations & Payments Desk:** Approve or reject payments with custom rejection reasons; auto-allocate slot numbers.
- **Matches & Room Pass Desk:** Set and publish Custom Room IDs and passwords for each match.
- **Publish Results Desk:** Select completed match, enter winner details, and auto-calculate payouts.
- **Settings Manager:** Change WhatsApp community link, Admin WhatsApp number, UPI ID, Merchant name, and announcement ticker.
- **Export Data:** One-click CSV export of all player registrations and slot sheets.

---

## 🛠️ Local Development & Running

### Requirements
- Node.js 18+ and npm

### Steps
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Production Deployment & Database Setup

### Option A: PostgreSQL with Supabase
1. Create a new project on [Supabase](https://supabase.com).
2. Run the SQL schema provided in the Admin Dashboard (`Production Backend Guide` tab).
3. Connect your frontend via `@supabase/supabase-js`.

### Option B: Firebase Firestore
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable Firestore Database and Firebase Authentication.
3. Configure collections: `tournaments`, `registrations`, `leaderboard`, `results`.

---

## 🔒 Security & Privacy Rules
- **No Hardcoded Secrets:** Passwords and keys reside in environment variables.
- **Player Privacy:** Public views mask player names and UIDs (`Thund***`, `1098***911`).
- **Banking Safety:** The site only collects public 12-digit UPI UTR reference codes. It never asks for UPI PINs, passwords, or OTPs.
- **Zero Emulators:** Custom room settings block PC emulators to protect touch players.
