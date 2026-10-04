import { Router } from 'express';
import { db } from '../db.js';

export const sourcesRouter = Router();

/**
 * GET /api/sources
 * List, filter and search verified official sources
 */
sourcesRouter.get('/', (req, res) => {
  try {
    const { category, q } = req.query;
    const sources = db.getSources(category || null, q || '');
    return res.json({ sources, count: sources.length });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/sources
 * Admin endpoint: Add a newly verified official source
 */
sourcesRouter.post('/', (req, res) => {
  try {
    const { title, organization, url, portalName, portalUrl, category, summary } = req.body;
    if (!title || !organization || !url) {
      return res.status(400).json({ error: 'Title, organization and URL are required.' });
    }

    const created = db.addSource({
      title,
      organization,
      url,
      portalName,
      portalUrl,
      category,
      summary
    });

    return res.status(201).json({ source: created });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
