import { Router } from 'express';
import { db } from '../db.js';

export const conversationsRouter = Router();

/**
 * GET /api/conversations
 * Fetch user consultation history
 */
conversationsRouter.get('/', (req, res) => {
  try {
    const list = db.getConversations();
    return res.json({ conversations: list });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/conversations/:id
 * Fetch single conversation with messages and structured guidance
 */
conversationsRouter.get('/:id', (req, res) => {
  try {
    const item = db.getConversationById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Consultation not found' });
    }
    return res.json({ conversation: item });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/conversations/:id/toggle-save
 * Toggle save/bookmark status
 */
conversationsRouter.patch('/:id/toggle-save', (req, res) => {
  try {
    const item = db.getConversationById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Consultation not found' });
    }
    const updated = db.updateConversation(req.params.id, {
      is_saved: !item.is_saved
    });
    return res.json({ conversation: updated });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/conversations/:id
 * Delete a specific consultation
 */
conversationsRouter.delete('/:id', (req, res) => {
  try {
    db.deleteConversation(req.params.id);
    return res.json({ success: true, message: 'Consultation deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/conversations
 * Clear entire consultation history
 */
conversationsRouter.delete('/', (req, res) => {
  try {
    db.clearAllConversations();
    return res.json({ success: true, message: 'All consultation history cleared' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
