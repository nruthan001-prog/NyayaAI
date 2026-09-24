/**
 * NyayaGuide AI - Frontend API Service Client
 */

const API_BASE = '/api';

export const api = {
  // Consultation
  async submitConsultation({ query, category, state, district, conversationId, answers, customApiKey }) {
    const res = await fetch(`${API_BASE}/consultation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, category, state, district, conversationId, answers, customApiKey })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Error ${res.status}: Failed to process consultation`);
    }
    return res.json();
  },

  async generateDraft({ title, category, userQuery, primaryAuthority, state, district }) {
    const res = await fetch(`${API_BASE}/consultation/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, userQuery, primaryAuthority, state, district })
    });
    return res.json();
  },

  // Conversations
  async getConversations() {
    const res = await fetch(`${API_BASE}/conversations`);
    return res.json();
  },

  async getConversation(id) {
    const res = await fetch(`${API_BASE}/conversations/${id}`);
    return res.json();
  },

  async toggleSaveConversation(id) {
    const res = await fetch(`${API_BASE}/conversations/${id}/toggle-save`, { method: 'PATCH' });
    return res.json();
  },

  async deleteConversation(id) {
    const res = await fetch(`${API_BASE}/conversations/${id}`, { method: 'DELETE' });
    return res.json();
  },

  async clearAllConversations() {
    const res = await fetch(`${API_BASE}/conversations`, { method: 'DELETE' });
    return res.json();
  },

  // Verified Sources
  async getSources(category = null, query = '') {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (query) params.set('q', query);
    const res = await fetch(`${API_BASE}/sources?${params.toString()}`);
    return res.json();
  },

  async addSource(source, adminKey = null) {
    const key = adminKey || localStorage.getItem('nyayaguide_admin_key') || 'nyaya_admin_secret';
    const res = await fetch(`${API_BASE}/sources`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-key': key
      },
      body: JSON.stringify(source)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Error ${res.status}: Failed to add source`);
    }
    return res.json();
  },

  // Meta & Stats
  async getCategories() {
    const res = await fetch(`${API_BASE}/meta/categories`);
    return res.json();
  },

  async getHelplines() {
    const res = await fetch(`${API_BASE}/meta/helplines`);
    return res.json();
  },

  async getStats() {
    const res = await fetch(`${API_BASE}/meta/stats`);
    return res.json();
  },

  async getDemoScenarios() {
    const res = await fetch(`${API_BASE}/meta/demo-scenarios`);
    return res.json();
  },

  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  }
};
