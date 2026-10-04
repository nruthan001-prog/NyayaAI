/**
 * HTML Templates for Human-Friendly Browser Access to NyayaGuide API Endpoints
 * Prevents "raw unstyled JSON" confusion when users open backend links directly in browser.
 */

export function renderHealthHtml({ status, service, tagline, timestamp, aiEngine, version, port }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NyayaGuide AI - Backend API Status</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #0b1120;
      color: #e2e8f0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 16px;
      max-width: 680px;
      width: 100%;
      padding: 32px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid #10b981;
      color: #34d399;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
    }
    .dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.4; }
      100% { opacity: 1; }
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      color: #f8fafc;
      margin-top: 16px;
      margin-bottom: 6px;
    }
    .tagline {
      color: #94a3b8;
      font-size: 15px;
      margin-bottom: 24px;
    }
    .cta-box {
      background: linear-gradient(135deg, rgba(30, 58, 138, 0.5), rgba(30, 64, 175, 0.3));
      border: 1px solid #3b82f6;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 28px;
      text-align: center;
    }
    .cta-box p {
      font-size: 14px;
      color: #bfdbfe;
      margin-bottom: 12px;
    }
    .cta-btn {
      display: inline-block;
      background: #2563eb;
      color: #ffffff;
      font-weight: 600;
      font-size: 15px;
      padding: 10px 24px;
      border-radius: 8px;
      text-decoration: none;
      transition: background 0.2s, transform 0.1s;
    }
    .cta-btn:hover {
      background: #1d4ed8;
      transform: translateY(-1px);
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 24px;
    }
    .stat {
      background: #0f172a;
      border: 1px solid #334155;
      padding: 14px 16px;
      border-radius: 10px;
    }
    .stat-label {
      font-size: 12px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .stat-val {
      font-size: 14px;
      font-weight: 600;
      color: #cbd5e1;
    }
    .endpoints {
      margin-top: 20px;
      border-top: 1px solid #334155;
      padding-top: 20px;
    }
    .endpoints h3 {
      font-size: 14px;
      color: #94a3b8;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .api-link {
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.25);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      text-decoration: none;
      font-family: monospace;
    }
    .api-link:hover {
      background: rgba(56, 189, 248, 0.2);
    }
    .raw-link {
      color: #94a3b8;
      font-size: 12px;
      text-decoration: underline;
      display: block;
      margin-top: 16px;
      text-align: right;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">
      <span class="dot"></span>
      <span>${status.toUpperCase()} &bull; v${version}</span>
    </div>
    <h1>⚖️ ${service}</h1>
    <p class="tagline">${tagline}</p>

    <div class="cta-box">
      <p>Looking for the full Citizen Rights & Legal Guidance Web Application?</p>
      <a href="http://localhost:5173" class="cta-btn" target="_blank">🚀 Open Citizen Web Application (Port 5173)</a>
    </div>

    <div class="grid">
      <div class="stat">
        <div class="stat-label">Active AI Engine</div>
        <div class="stat-val">${aiEngine}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Timestamp</div>
        <div class="stat-val">${new Date(timestamp).toLocaleTimeString()} (${new Date(timestamp).toLocaleDateString()})</div>
      </div>
      <div class="stat">
        <div class="stat-label">Hallucination Defense</div>
        <div class="stat-val" style="color: #34d399;">✓ Strict Grounded RAG + Fallback</div>
      </div>
      <div class="stat">
        <div class="stat-label">API Server Port</div>
        <div class="stat-val">:${port || 5000} (IPv4 / IPv6 Dual Stack)</div>
      </div>
    </div>

    <div class="endpoints">
      <h3>Quick API Links</h3>
      <div class="links">
        <a class="api-link" href="/api/sources">📚 /api/sources</a>
        <a class="api-link" href="/api/meta/categories">🏷️ /api/meta/categories</a>
        <a class="api-link" href="/api/meta/stats">📊 /api/meta/stats</a>
      </div>
      <a class="raw-link" href="/api/health?format=json">View raw JSON response &rarr;</a>
    </div>
  </div>
</body>
</html>`;
}

export function renderSourcesHtml({ sources, count }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NyayaGuide AI - Verified Statutory Sources</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #0b1120;
      color: #e2e8f0;
      min-height: 100vh;
      padding: 32px 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    header {
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    h1 {
      font-size: 24px;
      color: #f8fafc;
    }
    .cta-btn {
      background: #2563eb;
      color: #ffffff;
      font-weight: 600;
      font-size: 14px;
      padding: 8px 18px;
      border-radius: 8px;
      text-decoration: none;
    }
    .badge {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid #10b981;
      color: #34d399;
      border-radius: 6px;
      padding: 2px 8px;
      font-size: 12px;
      font-weight: 600;
    }
    .sources-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .source-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 20px;
    }
    .source-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
      gap: 12px;
    }
    .source-title {
      font-size: 16px;
      font-weight: 600;
      color: #f1f5f9;
    }
    .source-org {
      font-size: 13px;
      color: #94a3b8;
      margin-bottom: 8px;
    }
    .source-desc {
      font-size: 14px;
      color: #cbd5e1;
      line-height: 1.5;
      margin-bottom: 12px;
    }
    .source-links {
      display: flex;
      gap: 12px;
      font-size: 13px;
    }
    .source-links a {
      color: #38bdf8;
      text-decoration: none;
    }
    .source-links a:hover {
      text-decoration: underline;
    }
    .footer-links {
      margin-top: 24px;
      text-align: center;
    }
    .footer-links a {
      color: #94a3b8;
      font-size: 13px;
      margin: 0 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <h1>⚖️ Verified Statutory Sources & Portals</h1>
        <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Loaded ${count} Official Government of India & State Sources</p>
      </div>
      <a href="http://localhost:5173" class="cta-btn" target="_blank">🚀 Open Web App UI</a>
    </header>

    <div class="sources-list">
      ${sources.map(s => `
        <div class="source-card">
          <div class="source-header">
            <div class="source-title">${s.title}</div>
            <span class="badge">Official &bull; ${s.jurisdiction || 'India'}</span>
          </div>
          <div class="source-org">🏛️ ${s.organization}</div>
          <p class="source-desc">${s.description || ''}</p>
          <div class="source-links">
            <a href="${s.url}" target="_blank" rel="noopener noreferrer">🌐 Official Website &rarr;</a>
            ${s.portalUrl ? `<a href="${s.portalUrl}" target="_blank" rel="noopener noreferrer">📋 Grievance Portal &rarr;</a>` : ''}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="footer-links">
      <a href="/api/sources?format=json">View raw JSON data</a> &bull;
      <a href="/api/health">System Health</a> &bull;
      <a href="http://localhost:5173">Citizen Assistant Web App</a>
    </div>
  </div>
</body>
</html>`;
}
