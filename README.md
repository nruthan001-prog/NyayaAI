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

## 1. Problem Statement

Millions of citizens in India face everyday disputes involving **higher education institutions, consumer transactions, tenancy agreements, workplace salaries, cyber harassment, and delayed public services**.

Ordinary citizens face acute difficulties:
- **Complex Legal Terminology:** Official gazettes and statutory acts are written in dense legalese.
- **Wrong Authority Approached:** Citizens frequently complain to the wrong forum (e.g. approaching a local police station for a civil rent dispute, or getting trapped in circular customer support chats for defective products).
- **Critical Evidence is Lost:** Crucial documents—such as uncropped screenshots, stamped receiving receipts, key handover acknowledgements, or original purchase invoices—are discarded or deleted.
- **Absence of Escalation Knowledge:** When the first administrative representation or customer support ticket is ignored, citizens give up because they do not know the next statutory appellate tier.
- **Risk of Misinformation:** Relying on unverified social media claims or unregulated intermediaries often leads to worsening disputes.

---

## 2. Proposed Solution & Innovation

**NyayaGuide AI** is not another open-ended chatbot that guesses laws. It is a specialized, structured **Citizen Guidance & Information Platform** that guides citizens through a structured 7-stage resolution journey:

```text
[Citizen Natural Language Problem]
                ↓
    [1. Intent Classification & Safety Pre-Check]
       (Detects emergency, outcome traps, contact traps, out-of-domain)
                ↓
    [2. Multi-Factor RAG Retrieval]
       (Scored against Curated Statutory Knowledge Base + State Overrides)
                ↓
    [3. Grounded AI / Rule Synthesis]
       (Strict anti-hallucination prompt, cautious civic guidance wording)
                ↓
    [4. Numbered Action Plan & Document Checklist]
                ↓
    [5. Authority Finder (.gov.in / .nic.in Nodal Portals)]
                ↓
    [6. 4-Tier Procedural Escalation Matrix]
                ↓
    [7. Formal Grievance Representation Letter Draft Generator]
```

> **Mandatory Legal Disclaimer:**  
> *NyayaGuide AI provides general legal, civic, and administrative information for educational and guidance purposes only. It is not a law firm, does not pretend to be an advocate, and is not a substitute for a qualified lawyer or official authority. All guidance is grounded in authentic Government of India statutory sources.*

---

## 3. System Architecture & RAG Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                 React 19 Frontend (Vite)                    │
│   Landing Page  •  Consultation Hub  •  Dashboard  • Admin   │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON (CORS + Rate Limited)
┌──────────────────────────────▼──────────────────────────────┐
│                    Express.js Backend                       │
│    /api/consultation  •  /api/conversations  •  /api/sources│
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
┌──────────────▼─────────────┐ ┌──────────────▼───────────────┐
│     Unified AI Service     │ │     Curated Official Indian  │
│  (Gemini LLM / Strict JSON)│ │      Statutory Knowledge     │
└──────────────┬─────────────┘ └──────────────┬───────────────┘
               │                              │
               └──────────────┬───────────────┘
                              │
               ┌──────────────▼───────────────┐
               │    Relational Data Store     │
               │  (Conversations, Sources, DB)│
               └──────────────────────────────┘
```

### RAG Retrieval & Multi-Factor Scoring
1. **Query Tokenization & Relevance:** Analyzes natural language problem statements using keyword token matching and n-gram overlap.
2. **Category & Domain Alignment:** Automatically identifies or accepts user category (Education, Consumer, Cyber, Housing, Employment, Government Services, Banking, Senior Citizens, Women & Child Protection, RTI).
3. **Location & Jurisdiction Augmentation:** Applies state-specific legislation (e.g. Karnataka Sakala Act, Maharashtra Right to Public Services, Delhi Citizen Services Act) and local nodal cyber cells.
4. **Curated Official Source Integration:** Injects authentic Government of India (`.gov.in` / `.nic.in`) and statutory regulatory authorities.

---

## 4. Source Metadata & Trusted Verification

Every official source record in NyayaGuide AI carries explicit provenance metadata:

```json
{
  "id": "src-ugc-certificates",
  "title": "UGC Public Notice on Non-Retention of Original Certificates by Higher Education Institutions",
  "organization": "University Grants Commission (UGC), Ministry of Education",
  "category": "education",
  "url": "https://www.ugc.gov.in",
  "portalName": "UGC e-Samadhan Portal",
  "portalUrl": "https://samadhaan.ugc.ac.in",
  "description": "Statutory mandate prohibiting Higher Education Institutions (HEIs) from retaining original certificates beyond physical verification.",
  "verified": true,
  "lastVerified": "2025-02-15",
  "jurisdiction": "India",
  "state": "",
  "sourceType": "Statutory Body"
}
```

### Source Hierarchy
1. Government of India Ministries (`.gov.in`)
2. Official State Government Portals (`.gov.in`, `.nic.in`)
3. Statutory Authorities (UGC, RBI, EPFO, NCPCR)
4. Judicial & Legal Aid Authorities (Supreme Court, NALSA, DLSA)
5. Central Public Grievance Portals (CPGRAMS, NCH, NCRP, e-Daakhil)

---

## 5. Security & Responsible AI Guardrails

1. **Anti-Hallucination Constraints:**
   - The AI is barred from inventing laws, non-existent sections, fake phone numbers, or unverified emails.
   - Strictly uses cautious language: *"This may fall under..."*, *"Depending on the circumstances..."*, *"Possible options include..."*.
   - Never guarantees legal outcomes (*"Under Indian law, no statute guarantees a specific victory; outcomes depend on evidence, facts, and judicial discretion"*).
2. **Emergency Protocol Safeguards:**
   - Immediate detection of physical danger, domestic violence, sexual assault, self-harm, or active financial cyber extortion.
   - Activates high-priority emergency banner with one-click dialling to **112** (National Emergency), **1930** (Cyber Fraud Golden Hour), **1098** (Childline), **181** (Women Helpline), and **14416** (Tele-MANAS Mental Crisis).
3. **Production Security Architecture:**
   - **CORS Protection:** Configurable `CLIENT_URL` for production, with restricted allowed origins.
   - **In-Memory Rate Limiting:** Enforces request quotas (max 60 requests/minute per IP) to prevent automated abuse and denial of service.
   - **Admin Protected Endpoints:** `POST /api/sources` is secured by an `x-admin-key` matching `ADMIN_SECRET` in `.env`.
   - **Input Validation & Sanitization:** Strict payload bounds (max 2,500 chars), parameter trimming, and non-empty checks.
   - **Privacy-Preserving Logs:** Personal problem narratives and user payload bodies are never logged to console or disk.

---

## 6. Installation & Execution Guide

### Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **npm:** v9 or higher

### 1. Install Dependencies
```bash
npm run install-all
```
*(Installs dependencies across both `server` and `client`)*

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Key variables in `.env`:
```env
PORT=5000
CLIENT_URL=http://localhost:5173
ADMIN_SECRET=nyaya_admin_secret
AI_API_KEY=
AI_MODEL=gemini-1.5-flash
DATABASE_URL=file:./data/nyayaguide_db.json
NODE_ENV=development
```

> 💡 **Zero-Setup Guarantee:**  
> An external AI API key is **NOT required** to run the application. NyayaGuide AI includes a built-in deterministic Curated Statutory Knowledge Base that powers all features out of the box.

### 3. Run the Development Server
```bash
npm run dev
```
*(Starts Express backend on port 5000 and Vite frontend on port 5173 concurrently)*

Access the application in your browser at:
```
http://127.0.0.1:5173/
```

---

## 7. Automated Test Suite (10 Core Scenarios)

The project includes an automated test runner validating the 10 mandatory audit test cases:

```bash
node server/test-scenarios.js
```

### Verified Test Cases:
| # | Test Scenario | Verified Behavior |
|---|---|---|
| **1** | **College Certificates** | Grounded in UGC 2018 Regulation; routes to Principal, SGRC, and UGC e-Samadhan. |
| **2** | **Teacher Bullying** | Grounded in RTE Act Sec 17 & NCPCR; advises maintaining incident journal. |
| **3** | **Online Threats** | Grounded in IT Act Sec 66E/67 & BNS; routes to NCRP (cybercrime.gov.in / 1930); advises uncropped screenshots. |
| **4** | **Company Refund Denial** | Grounded in Consumer Protection Act 2019; routes to NCH 1915 & e-Daakhil. |
| **5** | **Landlord Deposit** | Grounded in Model Tenancy Act; routes to DLSA Pre-Litigation Mediation & Rent Court. |
| **6** | **Government Delay** | Grounded in State Public Services Act & CPGRAMS; requires application token receipt. |
| **7** | **Guaranteed Win Trap** | Rejects outcome guarantees; explains burden of proof under Indian Evidence Act. |
| **8** | **Officer Phone Trap** | Refuses to invent private phone numbers; directs to official `.gov.in` directories. |
| **9** | **Insufficient Details** | Notes facts are required; provides guided clarifying questions. |
| **10** | **Out of Domain Query** | Declines non-legal topics (e.g. recipes, coding); zero hallucinated laws. |

---

## 8. Presentation Guide ("How to Explain This Project")

When demonstrating NyayaGuide AI to judges, evaluators, or project mentors, use this 4-step presentation narrative:

### 1. The Real-World Problem
> *"In India, over 70% of citizens who encounter problems like certificate withholding by colleges, denied e-commerce refunds, or withheld rental deposits give up or approach the wrong department. When they search online, they encounter complicated legal jargon, unverified forum advice, or fraudulent agents."*

### 2. The Core Solution
> *"NyayaGuide AI is a civic-technology guidance platform. A citizen simply describes what happened in everyday language. The AI maps the problem to authentic Indian statutory frameworks and produces a complete, structured citizen journey."*

### 3. The Differentiator: Structured Citizen Journey
> *"Unlike general chatbots that produce loose, conversational paragraphs, NyayaGuide produces structured, actionable cards:*
> 1. **Situation Assessment & Category**
> 2. **Applicable Statutory Rule** (e.g. UGC 2018 Notification, CPA 2019)
> 3. **Numbered Action Plan** (Immediate practical steps)
> 4. **Authority Finder** (Exact nodal officer & official .gov.in portal)
> 5. **Interactive Evidence Checklist** (Checkable boxes for document preservation)
> 6. **4-Tier Escalation Matrix** (Internal → Ombudsman → Commission → Legal Aid)
> 7. **Formal Grievance Letter Generator** (Ready-to-file editable representation)*

### 4. Safety & Responsibility
> *"We strictly adhere to legal safety: the platform never says 'you will definitely win', never fabricates sections or phone numbers, grounds all guidance on verified `.gov.in` and `.nic.in` domains, and detects urgent physical danger to flag National Emergency 112 and Cyber 1930."*

---

## 9. Project Limitations

1. **Not Legal Representation:** NyayaGuide AI provides educational and procedural guidance; it cannot represent citizens in court or execute formal legal filings on their behalf.
2. **Regulatory Updates:** Administrative circulars and departmental rules are subject to amendment; users are always directed to the official government portal to confirm current guidelines.
3. **No Outcome Guarantees:** Wording strictly avoids outcome promises, using cautious guidance terms (*"may apply"*, *"depending on circumstances"*).
4. **Emergency Prioritization:** Active physical violence or criminal intimidation requires law enforcement intervention rather than digital guidance.

---

## 10. Future Roadmap

- [ ] **Indian Multilingual Voice Assistant:** Speech-to-speech interaction in Kannada, Hindi, Tamil, Telugu, and Bengali.
- [ ] **Document OCR & Legal Notice Explainer:** Deep OCR parsing of eviction notices, show-cause notices, and court summons into simple language.
- [ ] **Direct Lok Adalat / DLSA Integration:** Forwarding pre-litigation mediation requests to District Legal Services Authorities.
- [ ] **WhatsApp & Mobile Extension:** Expanding citizen access via WhatsApp Business API for rural accessibility.

---

*Developed with pride for Indian Citizen Empowerment • NyayaGuide AI Team*
