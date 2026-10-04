import { Router } from 'express';
import { aiService } from '../services/aiService.js';
import { ragEngine } from '../services/ragEngine.js';
import { db } from '../db.js';

export const consultationRouter = Router();

/**
 * POST /api/consultation
 * Analyze problem, run RAG retrieval, generate structured guidance
 */
consultationRouter.post('/', async (req, res) => {
  try {
    const { query, category, state, district, conversationId, answers, customApiKey } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({ error: 'Please provide a description of your problem.' });
    }

    // Step 1: Ensure active conversation
    let currentConvId = conversationId;
    let conversation = null;

    if (currentConvId) {
      conversation = db.getConversationById(currentConvId);
    }

    if (!conversation) {
      // Create new conversation titled smartly from user query
      const autoTitle = query.length > 50 ? query.substring(0, 47) + '...' : query;
      conversation = db.createConversation({
        title: autoTitle,
        category: category || 'other',
        state: state || '',
        district: district || ''
      });
      currentConvId = conversation.id;
    } else {
      // Update state/category if changed
      db.updateConversation(currentConvId, {
        category: category || conversation.category,
        state: state || conversation.state,
        district: district || conversation.district
      });
    }

    // Save user message to database
    db.addMessage({
      conversation_id: currentConvId,
      role: 'user',
      content: query
    });

    // Step 2: Execute AI Service (RAG + Optional LLM)
    const guidance = await aiService.generateGuidance({
      query,
      category: category || conversation.category,
      state: state || conversation.state,
      district: district || conversation.district,
      answers: answers || {},
      customApiKey
    });

    // Save structured guidance to DB
    const savedGuidance = db.addGuidance({
      conversation_id: currentConvId,
      structured_data: guidance
    });

    // Save assistant message summary to DB
    db.addMessage({
      conversation_id: currentConvId,
      role: 'assistant',
      content: guidance.summary
    });

    return res.json({
      conversationId: currentConvId,
      conversationTitle: conversation.title,
      guidance: {
        ...guidance,
        id: savedGuidance.id
      }
    });
  } catch (error) {
    console.error('Consultation processing error:', error);
    return res.status(500).json({
      error: 'We encountered an issue analyzing this situation. Please try refining your description or consult an official authority directly.',
      details: error.message
    });
  }
});

/**
 * POST /api/consultation/draft
 * Generate a formal grievance/complaint letter
 */
consultationRouter.post('/draft', (req, res) => {
  try {
    const { title, category, userQuery, primaryAuthority, state, district } = req.body;
    const draft = ragEngine.generateDraftTemplate({
      title: title || 'Formal Citizen Grievance',
      category: category || 'general',
      userQuery: userQuery || '',
      primaryAuthority: primaryAuthority || 'Competent Authority',
      state: state || 'Your State',
      district: district || 'Your District'
    });
    return res.json({ draft });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
