/**
 * NyayaGuide AI - Unified AI Service Layer
 * 
 * Supports pluggable LLM backends (Google Gemini / OpenAI compatible)
 * with strict prompt safety constraints, grounded RAG synthesis,
 * and robust automatic fallback to the Curated Statutory Knowledge Base.
 */

import { ragEngine } from './ragEngine.js';

export class AiService {
  constructor() {
    this.defaultApiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY || '';
    this.modelName = process.env.AI_MODEL || 'gemini-1.5-flash';
  }

  /**
   * Process consultation request and return structured guidance
   */
  async generateGuidance({ query, category, state, district, answers = {}, customApiKey = null }) {
    if (!query || !query.trim()) {
      throw new Error('Query text is required.');
    }

    // Step 1: Execute Multi-Factor RAG Retrieval from Curated Knowledge Base
    const ragContext = ragEngine.retrieveKnowledge({
      query,
      category,
      state,
      district,
      answers
    });

    // If query was flagged as edge-case (emergency, guarantee trap, officer phone trap, out of domain, insufficient details),
    // return the safe deterministic response directly without allowing external LLM to hallucinate
    const isSpecialIntent = [
      'no_guaranteed_outcome',
      'officer_phone_policy',
      'insufficient_details',
      'out_of_domain'
    ].includes(ragContext.id);

    if (isSpecialIntent || ragContext.emergency_alert?.isEmergency) {
      return {
        ...ragContext,
        generated_by: 'curated-statutory-engine'
      };
    }

    const apiKey = customApiKey || this.defaultApiKey;

    // Step 2: If external LLM API key is present, attempt live synthesis grounded strictly in verified context
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const llmResult = await this.callGeminiWithContext(query, ragContext, apiKey, state, district);
        if (llmResult) {
          // Validate and sanitize LLM output against verified context
          return {
            ...ragContext,
            ...llmResult,
            // Strictly preserve verified official sources and URLs from curated knowledge base
            sources: ragContext.sources,
            complaint_draft_template: ragContext.complaint_draft_template,
            emergency_alert: ragContext.emergency_alert,
            generated_by: 'gemini-grounded-rag'
          };
        }
      } catch (err) {
        console.warn('External LLM synthesis encountered an issue, falling back safely to Curated Knowledge Base:', err.message);
      }
    }

    // Step 3: Pure Curated Statutory RAG Engine output
    return {
      ...ragContext,
      generated_by: 'curated-statutory-engine'
    };
  }

  /**
   * Invokes Google Gemini API with RAG context and strict civic safety constraints
   */
  async callGeminiWithContext(userQuery, ragContext, apiKey, state, district) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${apiKey}`;

    const systemPrompt = `You are NyayaGuide AI, an Indian Citizen Rights & Legal Guidance Assistant.
Your sole mission is to explain citizen rights and practical grievance steps in simple language without acting as a lawyer.

CRITICAL RESPONSIBLE AI & SAFETY CONSTRAINTS:
1. NEVER pretend to be an advocate, lawyer, or provide formal legal representation.
2. NEVER guarantee outcomes or state "you will definitely win" or "this is definitely illegal".
3. ALWAYS use cautious civic guidance wording ("This may fall under...", "Depending on circumstances...", "Possible options include...").
4. STRICT GROUNDING: Rely exclusively on the verified statutory framework provided in the CONTEXT below. Do NOT invent new laws, non-existent sections, fake government departments, fake telephone numbers, or unverified email addresses.
5. If a specific point cannot be determined with certainty, state: "Reliable official information for this specific point could not be verified."
6. Location context: State is "${state || 'India'}", District is "${district || 'Local'}".

VERIFIED CONTEXT FROM CURATED OFFICIAL SOURCES:
Title: ${ragContext.title}
Category: ${ragContext.category}
Statutory Background: ${ragContext.summary}
Relevant Rules: ${JSON.stringify(ragContext.possible_rights_or_rules)}
Primary Authority: ${JSON.stringify(ragContext.authority)}

Respond ONLY with valid JSON matching this schema:
{
  "summary": "Short, objective explanation of the citizen's situation in simple language",
  "category": "${ragContext.category}",
  "title": "${ragContext.title}",
  "possible_rights_or_rules": [
    {
      "rule": "Name of verified Act or Regulation from context",
      "description": "Simple 1-2 sentence explanation of what this means for the citizen using cautious language",
      "cautionary_note": "Important condition, caveat, or limitation"
    }
  ],
  "immediate_actions": [
    {
      "step": 1,
      "title": "Action title",
      "description": "Specific, practical step to take",
      "priority": "High"
    }
  ],
  "authority": [
    {
      "name": "Authority Name from context",
      "role": "Why they are relevant",
      "portal": "Portal Name",
      "url": "Official URL from context",
      "contact_note": "Verified national helpline or portal note (never invent phone numbers)",
      "how_to_approach": "Practical steps to contact them"
    }
  ],
  "documents": [
    {
      "id": "doc-1",
      "name": "Document Name",
      "purpose": "Why to preserve this evidence",
      "is_essential": true
    }
  ],
  "escalation": [
    {
      "tier": 1,
      "level": "Tier name",
      "authority": "Authority name",
      "condition": "Condition to trigger",
      "next_step": "Action to take"
    }
  ],
  "warning": "Visible disclaimer explaining that this is general guidance, not professional legal advice"
}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nUSER SITUATION:\n${userQuery}` }]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: 'application/json'
        }
      })
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textOutput) return null;

    try {
      return JSON.parse(textOutput);
    } catch {
      const cleanJson = textOutput.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanJson);
    }
  }
}

export const aiService = new AiService();
