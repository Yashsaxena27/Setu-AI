# Setu AI — National Welfare Scheme Discovery Assistant

Setu AI is a premium, production-grade civic-tech SaaS application designed to bridge the gap between eligibility guidelines and the citizens who deserve welfare benefits.

---

## 📖 Project Overview
Navigating bureaucratic requirements to find applicable government subsidies, health plans, or educational scholarships is often complex. Setu AI parses official eligibility parameters and uses intelligent matching algorithms to recommend exact qualifications in seconds, generating copy-ready application drafts.

### 🔴 Problem Statement
Millions of citizens miss out on essential welfare schemes because:
1. **Information Fragmentation**: Guidelines are spread across hundreds of federal and state directories.
2. **Textual Complexity**: Legal criteria are written in hard-to-understand bureaucratic language.
3. **Application Friction**: Formatting custom cover letters or finding mandatory checklist documentation requires manual visits to local centers.

### 🟢 Solution
Setu AI creates a unified, explainable, and accessible gateway:
- **Premium Design System**: Apple, Linear, and Vercel inspired typography and layout.
- **Explainable RAG Matching**: Decoupled constraint filters (Age, State, Income, Occupation) combined with NLP semantic searches.
- **Eligibility Simulator Sandbox**: Real-time modeling of career or income adjustments.
- **Application Draft preparation**: Exportable pre-filled documents.

---

## 🛠️ Architecture & Tech Stack

Setu AI is engineered with a decoupled client-server architecture:

```
[ Vite Frontend (Vite + React + TS) ]  <--->  [ Express API Gateway (Node + Express + TS) ]
                                                            |
                                                            v
                                            [ Gemini API (gemini-2.5-flash) ]
                                            [ MongoDB (Rule Filters & Vector Search) ]
```

### Frontend Stack
- **Framework**: React 19 (TypeScript)
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4, custom design variables
- **Animations**: Framer Motion
- **Libraries**: `html2canvas` & `jsPDF` for PDF rendering, `react-hot-toast`, `react-icons`

### Backend Stack
- **Runtime**: Node.js & Express (TypeScript)
- **Database**: MongoDB (Mongoose) with Vector Search indices
- **AI/LLM**: Google Gemini SDK (`@google/genai` with `gemini-2.5-flash`)
- **Security**: Helmet, CORS, JWT session authorization, Bcrypt credentials hashing

---

## ⚙️ Environment Variables Setup

Create your `.env` configuration keys matching these variables:

### Client configuration (`client/.env`)
```env
VITE_API_URL=http://localhost:5000
```

### Server configuration (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/setu-ai
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key_here
TWILIO_ACCOUNT_SID=your_twilio_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

---

## 🚀 Running Locally

Follow these steps to spin up the development environment:

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas cluster) with a vector index defined

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```

### 2. Seeding Data
To load standard welfare schemes into MongoDB:
```bash
cd server
npm run seed
npm run embeddings
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗺️ Future Scope & Roadmap
- **Multimodal Document Upload (OCR)**: Automatically parse Ration Cards or Income Certificates using Gemini Vision to pre-fill profile wizards.
- **Regional Script Translation**: Support translations to regional Indian scripts (Tamil, Telugu, Bengali) for local accessibility.
- **WhatsApp Cron Reminder Alerts**: Periodic notifications notifying subscribers of newly seeded schemes.
