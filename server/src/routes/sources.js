import { Router } from 'express';
import { db } from '../db.js';
import { renderSourcesHtml } from '../utils/htmlViews.js';

export const sourcesRouter = Router();

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'nyaya_admin_secret';

/**
 * GET /api/sources
 * List, filter and search verified official sources
 */
sourcesRouter.get('/', (req, res) => {
  try {
    const { category, q, format } = req.query;
    const sources = db.getSources(category || null, q || '');

    // Return human-friendly styled HTML view if accessed directly in a browser
    if (req.headers.accept?.includes('text/html') && format !== 'json') {
      return res.send(renderSourcesHtml({ sources, count: sources.length }));
    }

    return res.json({ sources, count: sources.length });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/sources
 * Admin endpoint: Add a newly verified official source
 * Protected: Requires 'x-admin-key' header
 */
sourcesRouter.post('/', (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key'];
    if (!adminKey || adminKey !== ADMIN_SECRET) {
      return res.status(401).json({
        error: 'Unauthorized: Admin authorization key required in "x-admin-key" header to add official sources.'
      });
    }

    const { 
      title, 
      organization, 
      url, 
      portalName, 
      portalUrl, 
      category, 
      description,
      summary, 
      jurisdiction, 
      state, 
      sourceType 
    } = req.body;

    if (!title?.trim() || !organization?.trim() || !url?.trim()) {
      return res.status(400).json({ error: 'Title, organization, and URL are mandatory.' });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: 'Invalid URL format provided.' });
    }

    const created = db.addSource({
      title: title.trim(),
      organization: organization.trim(),
      url: url.trim(),
      portalName: portalName?.trim() || title.trim(),
      portalUrl: portalUrl?.trim() || url.trim(),
      category: category || 'government',
      description: (description || summary || '').trim(),
      jurisdiction: jurisdiction?.trim() || 'India',
      state: state?.trim() || '',
      sourceType: sourceType?.trim() || 'Government'
    });

    return res.status(201).json({ 
      message: 'Official source verified and added successfully.',
      source: created 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
