import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  CheckCircle, 
  Plus, 
  Filter, 
  ShieldCheck, 
  Calendar, 
  Building
} from 'lucide-react';

export default function VerifiedSourcesView({
  sources = [],
  categories = [],
  onAddSource = () => {}
}) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Add Source Form State
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newPortalName, setNewPortalName] = useState('');
  const [newCategory, setNewCategory] = useState('government');
  const [newSummary, setNewSummary] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newOrg.trim() || !newUrl.trim()) return;

    onAddSource({
      title: newTitle.trim(),
      organization: newOrg.trim(),
      url: newUrl.trim(),
      portalName: newPortalName.trim() || newTitle.trim(),
      category: newCategory,
      summary: newSummary.trim()
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewOrg('');
    setNewUrl('');
    setNewPortalName('');
    setNewSummary('');
  };

  const filteredSources = sources.filter(s => {
    const matchCat = selectedCategory ? s.category === selectedCategory : true;
    const matchSearch = searchQuery
      ? s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.summary?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      
      {/* Directory Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Genuine Official Portals</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Verified Legal & Government Sources Directory
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            NyayaGuide AI does not invent laws or authorities. All guidance is grounded in these authenticated Government of India (.gov.in / .nic.in) portals and statutory frameworks.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-400" />
          <span>Add Official Source</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by statutory act, authority, portal name, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-500/60"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            <option value="">All Categories ({sources.length})</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Verified Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSources.map((src) => (
          <div
            key={src.id}
            className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/30 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                  {src.category}
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              </div>

              <h3 className="font-bold text-white text-sm leading-snug">
                {src.title}
              </h3>
              
              <p className="text-slate-400 text-xs mt-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="line-clamp-1">{src.organization}</span>
              </p>

              {src.summary && (
                <p className="text-slate-300 text-xs mt-3 leading-relaxed line-clamp-3 bg-slate-950/40 p-2.5 rounded-lg border border-slate-900">
                  {src.summary}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Checked: {src.lastChecked || '2025'}
              </span>
              <a
                href={src.url}
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
              >
                <span>Visit Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredSources.length === 0 && (
        <div className="text-center py-16 glass-panel rounded-2xl border border-slate-800">
          <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-2" />
          <p className="text-slate-300 text-sm font-semibold">No verified sources match your filter.</p>
          <p className="text-slate-500 text-xs mt-1">Try resetting the category filter or searching different terms.</p>
        </div>
      )}

      {/* Admin Add Source Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-lg w-full border border-slate-700 text-left space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Add Official Government Source (Admin)</span>
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Source Title / Act Name *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. UGC Notification on Retention of Certificates"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Official Organization / Ministry *</label>
                <input
                  type="text"
                  required
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  placeholder="e.g. University Grants Commission, Ministry of Education"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Portal Name</label>
                  <input
                    type="text"
                    value={newPortalName}
                    onChange={(e) => setNewPortalName(e.target.value)}
                    placeholder="e.g. UGC e-Samadhan"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Verified Official URL (.gov.in / .nic.in preferred) *</label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://samadhaan.ugc.ac.in"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Summary of Applicable Provisions</label>
                <textarea
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Brief summary of citizen rights and institutional mandates..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs"
                >
                  Save Verified Source
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
