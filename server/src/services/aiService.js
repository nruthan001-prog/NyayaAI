/**
 * NyayaGuide AI - Unified AI Service Layer
 * 
 * Supports pluggable LLM backends (Google Gemini / OpenAI compatible)
 * with automatic fallback to the deterministic Verified RAG Knowledge Engine.
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

    // Step 1: Execute RAG Retrieval from Verified Statutory Knowledge Base
    const ragContext = ragEngine.retrieveKnowledge({
      query,
      category,
      state,
      district,
      answers
    });

    const apiKey = customApiKey || this.defaultApiKey;

    // Step 2: If external LLM API key is present, attempt live synthesis
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const llmResult = await this.callGeminiWithContext(query, ragContext, apiKey, state, district);
        if (llmResult) {
          // Merge LLM enhanced output with guaranteed verified sources and draft template
          return {
            ...ragContext,
            ...llmResult,
            sources: ragContext.sources, // Keep verified official URLs intact
            complaint_draft_template: ragContext.complaint_draft_template,
            emergency_alert: ragContext.emergency_alert,
            generated_by: 'gemini-augmented-rag'
          };
        }
      } catch (err) {
        console.warn('External LLM synthesis encountered an issue, falling back to Verified RAG Engine:', err.message);
      }
    }

    // Step 3: Pure Verified Statutory RAG Engine output
    return {
      ...ragContext,
      generated_by: 'verified-rag-engine'
    };
  }

  /**
   * Invokes Google Gemini API with RAG context and strict JSON schema
   */
  async callGeminiWithContext(userQuery, ragContext, apiKey, state, district) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${apiKey}`;

    const systemPrompt = `You are NyayaGuide AI, an Indian Citizen Rights & Legal Guidance Assistant.
Your mission is to convert everyday citizen problems into structured, practical guidance without pretending to be a lawyer or replacing formal legal advice.

STRICT SAFETY AND CIVIC GUIDANCE RULES:
1. Ground your reasoning primarily on the verified statutory framework provided in the context.
2. Use cautious guidance phrasing ("This may fall under...", "Depending on circumstances...", "The applicable administrative procedure is...").
3. NEVER promise legal outcomes or say "you will definitely win" or "this is definitely illegal".
4. NEVER fabricate laws, sections, phone numbers, or government portals.
5. Location: State is "${state || 'India'}", District is "${district || 'Local'}".

VERIFIED CONTEXT FROM OFFICIAL SOURCES:
Title: ${ragContext.title}
Category: ${ragContext.category}
Summary of Applicable Law: ${ragContext.summary}
Relevant Rules: ${JSON.stringify(ragContext.possible_rights_or_rules)}
Primary Authority: ${JSON.stringify(ragContext.authority)}

Respond ONLY with valid JSON matching this schema:
{
  "summary": "Short, clear summary explaining the citizen's situation in simple language",
  "category": "${ragContext.category}",
  "title": "${ragContext.title}",
  "possible_rights_or_rules": [
    {
      "rule": "Name of specific Act or Regulation",
      "description": "Simple 1-2 sentence explanation of what this rule means for the citizen",
      "cautionary_note": "Crucial condition or limitation to remember"
    }
  ],
  "immediate_actions": [
    {
      "step": 1,
      "title": "Action title",
      "description": "Specific practical advice on what to do first",
      "priority": "High"
    }
  ],
  "authority": [
    {
      "name": "Authority Name",
      "role": "Why they are relevant",
      "portal": "Portal Name",
      "url": "Official URL",
      "contact_note": "Helpline or how to reach",
      "how_to_approach": "Practical steps to contact them"
    }
  ],
  "documents": [
    {
      "id": "doc-1",
      "name": "Document Name",
      "purpose": "Why to keep this evidence",
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
  "warning": "Mandatory legal disclaimer and advice on when to consult an advocate"
}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

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
          temperature: 0.2,
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
      // If LLM returned json inside markdown code fence
      const cleanJson = textOutput.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanJson);
    }
  }
}

export const aiService = new AiService();
