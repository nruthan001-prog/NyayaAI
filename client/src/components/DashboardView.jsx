import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Bookmark, 
  ShieldCheck, 
  PhoneCall, 
  ArrowRight, 
  Scale, 
  Clock, 
  Trash2, 
  FileText,
  Plus
} from 'lucide-react';

export default function DashboardView({
  stats = {},
  conversations = [],
  helplines = [],
  onSelectConversation = () => {},
  onDeleteConversation = () => {},
  onNewConsultation = () => {},
  onOpenEmergency = () => {}
}) {
  const savedConversations = conversations.filter(c => c.is_saved);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left">
      
      {/* Dashboard Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Citizen Command Centre</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Citizen Rights Dashboard</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Access your saved guidance, track past inquiries, and quickly contact verified authorities.
          </p>
        </div>
        <button
          onClick={onNewConsultation}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-sky-600/30 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ask NyayaGuide</span>
        </button>
      </div>

      {/* Stats Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center mb-2">
            <MessageSquare className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-white">{conversations.length}</p>
          <p className="text-xs text-slate-400 mt-0.5">Total Consultations</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
            <Bookmark className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-white">{savedConversations.length}</p>
          <p className="text-xs text-slate-400 mt-0.5">Saved Guidance Items</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-white">{stats.verifiedSourcesCount || 13}</p>
          <p className="text-xs text-slate-400 mt-0.5">Verified Govt Portals</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-2">
            <PhoneCall className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-white">{helplines.length || 8}</p>
          <p className="text-xs text-slate-400 mt-0.5">National Helplines</p>
        </div>

      </div>

      {/* Two Column Layout: Recent Consultations & Helplines Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 spans): Saved & Recent Consultations */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Saved Consultations */}
          {savedConversations.length > 0 && (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Bookmark className="w-4 h-4 fill-current" />
                <span>Bookmarked Consultations</span>
              </h2>
              <div className="space-y-2">
                {savedConversations.map(c => (
                  <div
                    key={c.id}
                    onClick={() => onSelectConversation(c.id)}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div>
                      <h3 className="font-semibold text-white text-xs sm:text-sm">{c.title}</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5 capitalize">{c.category} • Saved</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Inquiries */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Recent Consultations</span>
              </h2>
              <span className="text-xs text-slate-500">{conversations.length} total</span>
            </div>

            {conversations.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-500">
                You haven’t started any consultations yet.
              </div>
            ) : (
              <div className="space-y-2.5">
                {conversations.slice(0, 8).map(c => (
                  <div
                    key={c.id}
                    onClick={() => onSelectConversation(c.id)}
                    className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-sky-500/30 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div>
                      <h3 className="font-semibold text-white text-xs sm:text-sm group-hover:text-sky-300 transition-colors">
                        {c.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span className="capitalize">{c.category}</span>
                        <span>•</span>
                        <span>{new Date(c.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(c.id);
                        }}
                        className="p-1.5 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: 24x7 Helplines Directory */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Emergency & Redressal</span>
              <h2 className="text-base font-bold text-white mt-0.5">National Helplines Directory</h2>
              <p className="text-slate-400 text-xs mt-1">Official toll-free citizen grievance numbers across India.</p>
            </div>

            <div className="space-y-2.5">
              {helplines.map((h, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    h.urgent 
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-200' 
                      : 'bg-slate-900/60 border-slate-800 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white font-mono">{h.number}</span>
                      {h.urgent && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500 text-white font-bold uppercase">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-xs text-slate-300 mt-0.5">{h.title}</p>
                    <p className="text-[10px] text-slate-400">{h.coverage}</p>
                  </div>
                  <a
                    href={`tel:${h.number}`}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 shrink-0"
                    title={`Call ${h.number}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenEmergency}
                className="w-full py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Open Emergency Dialler</span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
