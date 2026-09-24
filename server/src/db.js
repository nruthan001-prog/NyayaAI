/**
 * NyayaGuide AI - Relational Database Layer
 * 
 * Persistent structured store managing Users, Conversations,
 * Messages, Guidance Records, and Verified Sources.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { VERIFIED_SOURCES_DIRECTORY } from './data/verifiedSources.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DB_PATH = path.join(DATA_DIR, 'nyayaguide_db.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class Database {
  constructor() {
    this.data = {
      users: [
        {
          id: 'user-default',
          name: 'Citizen User',
          email: 'citizen@nyayaguide.in',
          created_at: new Date().toISOString()
        }
      ],
      conversations: [],
      messages: [],
      guidance: [],
      sources: [...VERIFIED_SOURCES_DIRECTORY],
      saved_items: []
    };

    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_PATH)) {
        const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
        const parsed = JSON.parse(fileContent);

        // Merge verified directory with any custom added sources
        const sourceMap = new Map();
        for (const src of VERIFIED_SOURCES_DIRECTORY) {
          sourceMap.set(src.id, { ...src });
        }
        if (parsed.sources && Array.isArray(parsed.sources)) {
          for (const s of parsed.sources) {
            if (!sourceMap.has(s.id)) {
              sourceMap.set(s.id, s);
            }
          }
        }

        this.data = {
          users: parsed.users || this.data.users,
          conversations: parsed.conversations || [],
          messages: parsed.messages || [],
          guidance: parsed.guidance || [],
          sources: Array.from(sourceMap.values()),
          saved_items: parsed.saved_items || []
        };
        this.persist();
      } else {
        this.persist();
      }
    } catch (err) {
      console.error('Error loading database, resetting to clean defaults:', err.message);
      this.persist();
    }
  }

  persist() {
    try {
      const tempPath = `${DB_PATH}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_PATH);
    } catch (err) {
      console.error('Failed to write database file:', err.message);
    }
  }

  // --- Conversations ---
  getConversations(userId = 'user-default') {
    return this.data.conversations
      .filter(c => c.user_id === userId)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }

  getConversationById(id) {
    const conv = this.data.conversations.find(c => c.id === id);
    if (!conv) return null;
    const messages = this.data.messages.filter(m => m.conversation_id === id);
    const guidance = this.data.guidance.filter(g => g.conversation_id === id);
    return { ...conv, messages, guidance };
  }

  createConversation({ id, title, category, state, district, userId = 'user-default' }) {
    const newConv = {
      id: id || `conv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      user_id: userId,
      title: title || 'New Legal Consultation',
      category: category || 'other',
      state: state || '',
      district: district || '',
      is_saved: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.data.conversations.unshift(newConv);
    this.persist();
    return newConv;
  }

  updateConversation(id, updates) {
    const idx = this.data.conversations.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.data.conversations[idx] = {
        ...this.data.conversations[idx],
        ...updates,
        updated_at: new Date().toISOString()
      };
      this.persist();
      return this.data.conversations[idx];
    }
    return null;
  }

  deleteConversation(id) {
    this.data.conversations = this.data.conversations.filter(c => c.id !== id);
    this.data.messages = this.data.messages.filter(m => m.conversation_id !== id);
    this.data.guidance = this.data.guidance.filter(g => g.conversation_id !== id);
    this.persist();
    return true;
  }

  clearAllConversations(userId = 'user-default') {
    const convIds = new Set(this.data.conversations.filter(c => c.user_id === userId).map(c => c.id));
    this.data.conversations = this.data.conversations.filter(c => !convIds.has(c.id));
    this.data.messages = this.data.messages.filter(m => !convIds.has(m.conversation_id));
    this.data.guidance = this.data.guidance.filter(g => !convIds.has(g.conversation_id));
    this.persist();
    return true;
  }

  // --- Messages ---
  addMessage({ conversation_id, role, content }) {
    const newMsg = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      conversation_id,
      role, // 'user' | 'assistant'
      content,
      created_at: new Date().toISOString()
    };
    this.data.messages.push(newMsg);
    this.updateConversation(conversation_id, {});
    this.persist();
    return newMsg;
  }

  // --- Structured Guidance ---
  addGuidance({ conversation_id, structured_data }) {
    const newGuidance = {
      id: `guide_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      conversation_id,
      category: structured_data.category,
      summary: structured_data.summary,
      data: structured_data,
      created_at: new Date().toISOString()
    };
    this.data.guidance.push(newGuidance);
    this.persist();
    return newGuidance;
  }

  // --- Verified Sources ---
  getSources(filterCategory = null, query = '') {
    return this.data.sources.filter(s => {
      const matchCat = filterCategory ? s.category === filterCategory : true;
      const matchQuery = query
        ? s.title?.toLowerCase().includes(query.toLowerCase()) ||
          s.organization?.toLowerCase().includes(query.toLowerCase()) ||
          s.description?.toLowerCase().includes(query.toLowerCase()) ||
          s.summary?.toLowerCase().includes(query.toLowerCase())
        : true;
      return matchCat && matchQuery;
    });
  }

  addSource(source) {
    const today = new Date().toISOString().split('T')[0];
    const newSrc = {
      id: source.id || `src_${Date.now()}`,
      title: source.title,
      organization: source.organization,
      url: source.url,
      portalName: source.portalName || source.title,
      portalUrl: source.portalUrl || source.url,
      category: source.category || 'other',
      description: source.description || source.summary || '',
      verified: source.verified !== false,
      lastVerified: source.lastVerified || source.lastChecked || today,
      jurisdiction: source.jurisdiction || 'India',
      state: source.state || '',
      sourceType: source.sourceType || 'Government'
    };
    this.data.sources.push(newSrc);
    this.persist();
    return newSrc;
  }

  // --- Stats for Dashboard ---
  getDashboardStats() {
    return {
      totalConsultations: this.data.conversations.length,
      savedGuidanceCount: this.data.conversations.filter(c => c.is_saved).length,
      verifiedSourcesCount: this.data.sources.length,
      categoriesCount: 12
    };
  }
}

export const db = new Database();
