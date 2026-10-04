# ⚖️ NyayaGuide AI

> **"Know Your Rights. Know Your Next Step."**  
> *AI-Powered Citizen Rights & Legal Guidance Assistant for India*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-cyan.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-blue.svg)](https://tailwindcss.com/)
[![Civic Tech](https://img.shields.io/badge/CivicTech-India-orange.svg)]()

---

## 1. Executive Summary & Problem Statement

Millions of citizens in India encounter everyday problems involving **higher education, consumer disputes, rental tenancy, workplace dues, cyber threats, and public administrative delays**.

However, ordinary citizens frequently struggle because:
- **Legal Terminology is Complicated:** Statutory acts and circulars are written in dense legalese.
- **Wrong Authority Approached:** People approach police stations for civil disputes, or complain to customer service bots that repeatedly deny refunds.
- **Critical Evidence is Lost:** Receipts, uncropped screenshots, or written handover acknowledgements are discarded.
- **Absence of Escalation Knowledge:** Citizens give up when their first grievance or letter is ignored.
- **Misinformation on Social Media:** People rely on unreliable forum advice or predatory intermediaries.

### The Proposed Solution

**NyayaGuide AI** is not another generic chatbot. It is a specialized, structured **Citizen Rights & Grievance Guidance Assistant** that converts everyday natural language complaints into a 7-stage structured citizen action plan:

```
[Citizen Natural Language Problem]
                ↓
    [1. AI Situation Classification]
                ↓
    [2. Applicable Statutory Rules (UGC / CPA 2019 / IT Act / Tenancy / RTI)]
                ↓
    [3. Numbered Practical Action Plan]
                ↓
    [4. Authority Finder (.gov.in / .nic.in Nodal Portals)]
                ↓
    [5. Interactive Evidence & Document Checklist]
                ↓
    [6. 4-Tier Procedural Escalation Matrix]
                ↓
    [7. Formal Grievance Representation Letter Draft Generator]
```

> **Important Legal Disclaimer:**  
> *NyayaGuide AI provides general legal, civic, and administrative information for educational and guidance purposes only. It is not a law firm, does not pretend to be an advocate, and is not a substitute for a qualified lawyer or judicial authority. All guidance is grounded in authentic Government of India statutory sources.*

---

## 2. Core Features & Capabilities

1. **Natural Language Intake:** Citizens describe their issue in plain words (e.g. *"My college is withholding my original degree certificates"*). No legal vocabulary needed.
2. **Deterministic Verified Statutory RAG Engine:** Built-in knowledge base with real Indian laws (UGC 2018 Certificate Regulations, Consumer Protection Act 2019, IT Act 2000, Model Tenancy Act, Sakala / Right to Public Services, Payment of Wages Act, PoSH Act 2013, Senior Citizens Act 2007).
3. **Pluggable External AI LLM Layer:** Seamless integration with Google Gemini API (`gemini-1.5-flash`) or OpenAI endpoints. If no API key is supplied, NyayaGuide automatically runs on its built-in deterministic Verified RAG Engine without breaking.
4. **Jurisdiction & Location Awareness:** Select State (Karnataka, Maharashtra, Delhi, Tamil Nadu, Uttar Pradesh, All India) to dynamically inject state-specific public service acts (e.g., Sakala in Karnataka, Aaple Sarkar in Maharashtra) and state cyber cells.
5. **Interactive Evidence Checklist:** Citizens can check off gathered documents (fee slips, stamped receipt copies, uncropped chat exports) with progress tracking.
6. **4-Tier Visual Escalation Matrix:** Clear roadmap (Tier 1: Internal Head → Tier 2: Statutory Ombudsman → Tier 3: Regulatory Commission → Tier 4: Legal Aid / High Court Mandamus).
7. **One-Click Formal Representation Draft Generator:** Automatically populates a formal legal representation letter complete with statutory citations, facts, and relief sought, ready to print or export.
8. **Print & Export Citizen Action Reports:** Clean printer-friendly stylesheet for filing physical paperwork.
9. **Emergency Protocol Safeguards:** Automatically detects words indicating physical violence, extortion, or active threats, and immediately activates emergency banners with direct links to 112, 1930, 1098, and 181.
10. **Verified Official Portals Directory:** Directory of authenticated Government of India portals (`.gov.in` / `.nic.in`) with admin capabilities to add newly notified circulars.

---

## 3. Technology Stack & Architecture

### Frontend
- **Framework:** React 19 (SPA with Vite 8)
- **Styling:** Tailwind CSS v4 + Vanilla Design System (`client/src/index.css`)
- **Icons:** Lucide React (`lucide-react`)
- **Typography:** Plus Jakarta Sans & Inter (Google Fonts)
- **Aesthetics:** Glassmorphism, high-contrast dark theme, accessible badges

### Backend
- **Runtime:** Node.js (v20+ / v24+)
- **Server:** Express.js REST API (`server/src/index.js`)
- **Architecture:** Modular RAG Engine (`ragEngine.js`) + AI Service Layer (`aiService.js`)
- **Database:** Persistent Relational JSON Store (`server/src/db.js`) managing Users, Conversations, Messages, Guidance Records, and Sources.

```
┌─────────────────────────────────────────────────────────────┐
│                 React 19 Frontend (Vite)                    │
│   Landing Page  •  Consultation Hub  •  Dashboard  • Admin   │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON
┌──────────────────────────────▼──────────────────────────────┐
│                    Express.js Backend                       │
│    /api/consultation  •  /api/conversations  •  /api/sources│
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
┌──────────────▼─────────────┐ ┌──────────────▼───────────────┐
│     Unified AI Service     │ │     Verified Indian Legal    │
│  (Gemini LLM / Custom API) │ │          RAG Engine          │
└──────────────┬─────────────┘ └──────────────┬───────────────┘
               │                              │
               └──────────────┬───────────────┘
                              │
               ┌──────────────▼───────────────┐
               │    Relational Data Store     │
               │  (Conversations, Sources, DB)│
               └──────────────────────────────┘
```

---

## 4. Installation & Setup Instructions

### Prerequisites
- **Node.js** (v18.0.0 or higher, v20/v24 recommended)
- **npm** (v9 or higher)

### 1. Clone or Open Project
```bash
cd NyayaAI
```

### 2. Install Dependencies
Run the root helper command to install dependencies for both client and server:
```bash
npm run install-all
```
*(Or install manually: `npm --prefix server install` and `npm --prefix client install`)*

### 3. Environment Configuration (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Default contents of `.env`:
```env
PORT=5000
AI_API_KEY=
AI_MODEL=gemini-1.5-flash
DATABASE_URL=file:./data/nyayaguide_db.json
NODE_ENV=development
```

> 💡 **Note on AI Keys:**  
> An API key is **NOT required** for full functionality! NyayaGuide AI includes a built-in deterministic Verified Indian Legal RAG Engine that handles all real-world scenarios out of the box. You can also configure an API key dynamically in the in-app **Settings** modal.

### 4. Run the Full-Stack Application
Start both the backend server and frontend development server with a single command:
```bash
npm run dev
```

Or start them individually in separate terminals:
- **Backend Server:** `npm run server` (runs on `http://localhost:5000`)
- **Frontend Client:** `npm run client` (runs on `http://127.0.0.1:5173`)

### 5. Open in Browser
Open your browser and navigate to:
```
http://127.0.0.1:5173/
```

---

## 5. Built-in Demo Scenarios

NyayaGuide AI includes ready-to-test scenarios aligned with the project requirements:

| # | Scenario Title | User Prompt | Primary Legal Basis & Authority |
|---|---|---|---|
| **1** | **College Certificates** | *"My college is refusing to return my original certificates."* | UGC 2018 Notification / UGC e-Samadhan (`samadhaan.ugc.ac.in`) |
| **2** | **Teacher Bullying** | *"My teacher keeps publicly humiliating and bullying me. What should I do?"* | RTE Act 2009 Section 17 / NCPCR e-BaalNidan (`ebaalnidan.nic.in`) |
| **3** | **E-Commerce Refund** | *"I purchased a product online but the company is refusing to refund me."* | Consumer Protection Act 2019 / NCH 1915 / e-Daakhil (`edaakhil.nic.in`) |
| **4** | **Cyber Threats** | *"Someone is threatening me through messages and I have screenshots."* | IT Act 2000 (Sec 66E/67) / 1930 / NCRP (`cybercrime.gov.in`) |
| **5** | **Delayed Govt Service** | *"I applied for a government document but my application has not been processed."* | State Sakala / Public Services Act / CPGRAMS (`pgportal.gov.in`) |
| **6** | **Landlord Deposit** | *"My landlord is refusing to return my security deposit after vacating."* | Model Tenancy Act / DLSA Pre-Litigation Mediation (`nalsa.gov.in`) |
| **7** | **Unpaid Salary** | *"My previous company is not paying my pending salary and final settlement."* | Payment of Wages Act / Shram Suvidha / EPFO (`epfigms.gov.in`) |
| **8** | **Unauthorized Bank Debit** | *"Money was debited from my bank account without my OTP or permission."* | RBI 72-Hour Zero Liability / 1930 Golden Hour / RBI CMS 14448 |

---

## 6. How to Explain This Project (Presentation Guide)

When presenting NyayaGuide AI to judges, evaluators, or hackathon mentors, follow this structured narrative:

### 1. The Core Problem
> *"In India, over 70% of citizens who encounter problems like certificate withholding by colleges, denied e-commerce refunds, or withheld rental deposits give up or approach the wrong department. When they search online, they encounter complicated legal jargon or unverified forum advice."*

### 2. The Solution
> *"NyayaGuide AI is a civic-tech guidance platform. A citizen describes what happened in everyday English or their local language. The AI maps the problem to real Indian statutory frameworks and provides a complete, structured citizen journey."*

### 3. The 6-Stage Citizen Journey (Our Differentiator)
> *"Unlike general chatbots that produce loose paragraphs, NyayaGuide produces structured, actionable cards:*
> 1. **Situation Assessment & Category**
> 2. **Applicable Statutory Rule** (e.g. UGC 2018 Regulation)
> 3. **Numbered Action Plan** (Immediate steps)
> 4. **Authority Finder** (Exact nodal officer & official portal)
> 5. **Evidence Checklist** (Interactive checklist with document preservation advice)
> 6. **4-Tier Escalation Flow & Formal Complaint Letter Generator**

### 4. Responsible AI & Safety
> *"We strictly adhere to legal safety: the platform never says 'you will definitely win', never fabricates sections or phone numbers, grounds all guidance on verified `.gov.in` and `.nic.in` domains, and detects urgent physical danger to flag National Emergency 112 and Cyber 1930."*

---

## 7. Project Limitations & Ethical Safeguards

1. **Not Legal Representation:** The platform provides educational procedural guidance and does not represent citizens in judicial courts.
2. **Subject to Regulatory Updates:** Administrative rules change; users are always provided direct links to the official government portal to confirm current guidelines.
3. **No Outcome Guarantees:** Wording strictly employs cautious phrasing (*"This may fall under..."*, *"The applicable procedure is..."*).
4. **Emergency Protocols:** In situations involving imminent physical assault or violence, conversations are prioritized with emergency alerts rather than legal debate.

---

## 8. Future Roadmap

- [ ] **Indian Multilingual Voice Assistant:** Speech-to-speech in Hindi, Kannada, Tamil, Telugu, and Marathi.
- [ ] **Document OCR & Legal Notice Explainer:** Deep OCR parsing of eviction notices, show-cause notices, and court summons into simple language.
- [ ] **Direct Lok Adalat / DLSA Integration:** One-click forwarding of pre-litigation mediation requests to District Legal Services Authorities.
- [ ] **WhatsApp & Telegram Citizen Bot:** Bringing NyayaGuide to mobile messaging for rural accessibility.

---

## 9. Verification & Testing

To verify all core scenarios and statutory mappings across the engine, execute the automated verification test suite:

```bash
node server/test-scenarios.js
```

Expected output:
```text
⚖️ Running NyayaGuide AI Statutory Verification Test Suite...

✅ [PASS] College Certificates Withholding
✅ [PASS] Teacher Bullying & Humiliation
✅ [PASS] Consumer E-Commerce Refund Denial
✅ [PASS] Cyber Threat & Blackmail
✅ [PASS] Government Document Delay
✅ [PASS] Landlord Deposit Withholding

=================================================
Results: 6/6 scenarios verified successfully!
=================================================
```

---

*Developed with pride for Indian Citizen Empowerment • NyayaGuide AI Team*
