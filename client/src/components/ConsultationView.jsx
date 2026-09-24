import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Plus, 
  Bookmark, 
  Trash2, 
  Printer, 
  FileText, 
  ExternalLink, 
  ShieldAlert, 
  CheckSquare, 
  Square, 
  Compass, 
  Building2, 
  GitMerge, 
  Scale, 
  AlertTriangle, 
  Mic, 
  Paperclip, 
  Sparkles, 
  ChevronRight, 
  Check, 
  Copy,
  Search,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { INDIAN_STATES } from './Navbar.jsx';

export default function ConsultationView({
  conversations = [],
  currentConversation = null,
  activeGuidance = null,
  isLoading = false,
  selectedCategory = 'other',
  setSelectedCategory = () => {},
  selectedState = '',
  setSelectedState = () => {},
  categories = [],
  demoScenarios = [],
  onNewConsultation = () => {},
  onSelectConversation = () => {},
  onDeleteConversation = () => {},
  onToggleSave = () => {},
  onSubmitConsultation = () => {},
  onOpenDraftModal = () => {},
  onOpenEmergency = () => {}
}) {
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState('actions'); // 'actions' | 'authorities' | 'evidence' | 'escalation' | 'sources'
  const [checkedDocs, setCheckedDocs] = useState({});
  const [historySearch, setHistorySearch] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [ocrModalOpen, setOcrModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages, activeGuidance, isLoading]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSubmitConsultation(inputText.trim());
    setInputText('');
  };

  const handleToggleDocCheck = (docId) => {
    setCheckedDocs(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };

  const handleCopySummary = () => {
    if (!activeGuidance?.summary) return;
    const textToCopy = `NyayaGuide AI - Situation Guidance\n\nTitle: ${activeGuidance.title}\nCategory: ${activeGuidance.category}\n\nSummary:\n${activeGuidance.summary}\n\nImmediate Actions:\n${activeGuidance.immediate_actions?.map(a => `${a.step}. ${a.title}: ${a.description}`).join('\n')}\n\nSource: https://nyayaguide.in`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleSimulateVoice = () => {
    setMicActive(true);
    setTimeout(() => {
      setInputText("My college is refusing to return my original certificates and demanding extra fees.");
      setMicActive(false);
    }, 1200);
  };

  const filteredHistory = conversations.filter(c => 
    c.title.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 h-[calc(100vh-5rem)] flex flex-col md:flex-row gap-4">
      
      {/* Left Sidebar: History & Quick Controls */}
      <aside className="w-full md:w-80 shrink-0 glass-panel rounded-2xl p-4 flex flex-col border border-slate-800/80 h-auto md:h-full overflow-hidden">
        
        {/* New Consultation CTA */}
        <button
          onClick={onNewConsultation}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-sky-600/20 transition-all cursor-pointer mb-3"
        >
          <Plus className="w-4 h-4" />
          <span>New Consultation</span>
        </button>

        {/* History Search */}
        <div className="relative mb-3">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={historySearch}
            onChange={(e) => setHistorySearch(e.target.value)}
            placeholder="Search past consultations..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-slate-700"
          />
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
          <div className="text-[11px] font-semibold text-slate-400 px-1 py-1 uppercase tracking-wider flex items-center justify-between">
            <span>Recent Queries</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
              {filteredHistory.length}
            </span>
          </div>

          {filteredHistory.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No consultations yet. Ask a question to begin.
            </div>
          ) : (
            filteredHistory.map((item) => {
              const isSelected = currentConversation?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectConversation(item.id)}
                  className={`group relative p-2.5 rounded-xl cursor-pointer text-left transition-all border ${
                    isSelected 
                      ? 'bg-sky-500/15 border-sky-500/30 text-white' 
                      : 'bg-slate-900/40 border-transparent hover:border-slate-800 hover:bg-slate-900/70 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-xs font-medium line-clamp-2 leading-snug">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(item.id);
                        }}
                        className={`p-1 rounded hover:bg-slate-800 ${item.is_saved ? 'text-amber-400' : 'text-slate-400'}`}
                        title="Bookmark consultation"
                      >
                        <Bookmark className="w-3 h-3 fill-current" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(item.id);
                        }}
                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400"
                        title="Delete consultation"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500">
                    <span className="capitalize">{item.category || 'General'}</span>
                    <span>•</span>
                    <span>{new Date(item.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Emergency Quick Box */}
        <div className="pt-3 mt-2 border-t border-slate-800/80">
          <div 
            onClick={onOpenEmergency}
            className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-between cursor-pointer hover:bg-rose-500/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-[11px]">Emergency Helplines</p>
                <p className="text-[10px] text-rose-300/80">112 Police • 1930 Cyber</p>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-rose-400" />
          </div>
        </div>

      </aside>

      {/* Main Conversation & Guidance Area */}
      <main className="flex-1 glass-panel rounded-2xl flex flex-col border border-slate-800/80 overflow-hidden">
        
        {/* Consultation Header */}
        <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
              {currentConversation?.title || 'Interactive Citizen Rights Consultation'}
            </h2>
            {selectedState && (
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 border border-slate-700 text-sky-300 hidden sm:inline-block capitalize">
                {selectedState}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activeGuidance && (
              <>
                <button
                  onClick={handleCopySummary}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 px-2.5"
                  title="Copy guidance summary"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{copiedSummary ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 px-2.5 no-print"
                  title="Print Citizen Action Report"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Print Report</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Welcome banner if no messages */}
          {(!currentConversation?.messages || currentConversation.messages.length === 0) && !activeGuidance && (
            <div className="text-center py-10 max-w-xl mx-auto space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto shadow-inner">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">How can NyayaGuide assist you today?</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Describe any dispute or question involving education, rent, consumer issues, workplace, 
                  cyber harassment, or delayed public documents.
                </p>
              </div>

              {/* Demo Scenario Pills */}
              <div className="pt-4 text-left">
                <p className="text-[11px] font-semibold text-slate-400 mb-2">Try one of these real situations:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {demoScenarios.slice(0, 4).map(demo => (
                    <button
                      key={demo.id}
                      onClick={() => onSubmitConsultation(demo.prompt)}
                      className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/30 text-left text-xs text-slate-300 hover:text-sky-300 transition-colors"
                    >
                      <p className="font-semibold text-[11px] text-white">{demo.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{demo.prompt}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Render User & Assistant Messages */}
          {currentConversation?.messages?.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div key={msg.id || idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                {isUser ? (
                  <div className="max-w-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm p-4 text-xs sm:text-sm shadow-md">
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    <span className="block text-[9px] text-sky-200/80 mt-1.5 text-right">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ) : (
                  <div className="max-w-2xl bg-slate-900/70 border border-slate-800 text-slate-200 rounded-2xl rounded-tl-sm p-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 text-sky-400 font-semibold text-xs mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Situation Assessment</span>
                    </div>
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="glass-card p-4 rounded-2xl flex items-center gap-3 text-xs text-slate-300">
                <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                <span>Consulting verified statutory framework & formulating action plan...</span>
              </div>
            </div>
          )}

          {/* Structured Guidance Card */}
          {activeGuidance && (
            <div className="glass-card rounded-2xl border border-sky-500/25 overflow-hidden shadow-xl shadow-sky-950/20 text-left">
              
              {/* Emergency Alert Banner (if triggered) */}
              {activeGuidance.emergency_alert && (
                <div className="bg-rose-500/20 border-b border-rose-500/30 p-4 text-xs text-rose-200 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-rose-300 text-sm">EMERGENCY PROTOCOL ACTIVATED</h4>
                    <p className="mt-0.5 leading-relaxed">{activeGuidance.emergency_alert.message}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <a href="tel:112" className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1">
                        Call 112 (Police / Emergency)
                      </a>
                      <a href="tel:1930" className="px-3 py-1 rounded bg-rose-600/80 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1">
                        Call 1930 (Cyber Fraud)
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Guidance Card Header */}
              <div className="p-4 sm:p-6 bg-slate-900/60 border-b border-slate-800/80">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/10 border border-sky-500/30 text-sky-400 capitalize">
                      {activeGuidance.category}
                    </span>
                    {activeGuidance.stateApplied && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
                        Jurisdiction: {activeGuidance.stateApplied}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Curated Statutory Sources
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {activeGuidance.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                  {activeGuidance.summary}
                </p>

                {/* Draft Complaint CTA */}
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {activeGuidance.complaint_draft_template && activeGuidance.complaint_draft_template.length > 50 && (
                    <button
                      onClick={() => onOpenDraftModal(activeGuidance)}
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Generate Formal Complaint Letter</span>
                    </button>
                  )}
                  <button
                    onClick={handleCopySummary}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-all"
                  >
                    {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSummary ? 'Copied' : 'Share Summary'}</span>
                  </button>
                </div>
              </div>

              {/* Interactive Navigation Tabs */}
              <div className="px-4 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-1 overflow-x-auto">
                {[
                  { id: 'actions', label: 'Action Plan & Rights', icon: Compass },
                  { id: 'authorities', label: 'Who to Approach', icon: Building2 },
                  { id: 'evidence', label: 'Evidence Checklist', icon: CheckSquare },
                  { id: 'escalation', label: 'Escalation Flow', icon: GitMerge },
                  { id: 'sources', label: 'Verified Sources', icon: Scale }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isActive 
                          ? 'border-sky-400 text-sky-300 bg-sky-500/5' 
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Display */}
              <div className="p-4 sm:p-6 bg-slate-900/30">
                
                {/* Tab 1: Action Plan & Rights */}
                {activeTab === 'actions' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-1.5">
                        <Compass className="w-4 h-4" />
                        <span>Recommended Immediate Steps</span>
                      </h4>
                      <div className="space-y-3">
                        {activeGuidance.immediate_actions?.map(act => (
                          <div key={act.step} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {act.step}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="font-semibold text-white text-xs sm:text-sm">{act.title}</h5>
                                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                                  act.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-slate-400'
                                }`}>
                                  {act.priority} Priority
                                </span>
                              </div>
                              <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                                {act.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Relevant Rules & Provisions */}
                    <div className="pt-4 border-t border-slate-800/80">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-indigo-400" />
                        <span>Possible Applicable Rules & Statutory Framework</span>
                      </h4>
                      <div className="space-y-2.5">
                        {activeGuidance.possible_rights_or_rules?.map((rule, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                            <h5 className="font-semibold text-sky-300 text-xs">{rule.rule}</h5>
                            <p className="text-slate-300 text-xs mt-1 leading-relaxed">{rule.description}</p>
                            {rule.cautionary_note && (
                              <p className="text-amber-300/90 text-[11px] mt-1.5 bg-amber-500/10 p-2 rounded border border-amber-500/20 flex items-start gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                                <span><strong>Caution:</strong> {rule.cautionary_note}</span>
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Authority Finder */}
                {activeTab === 'authorities' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
                      Appropriate Authorities & Dispute Mechanisms
                    </h4>
                    {activeGuidance.authority?.map((auth, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h5 className="font-bold text-white text-sm">{auth.name}</h5>
                          {auth.url && (
                            <a
                              href={auth.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 shrink-0"
                            >
                              <span>{auth.portal || 'Official Portal'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          <strong>Jurisdiction & Role:</strong> {auth.role}
                        </p>
                        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1">
                          <p><strong>How to Approach:</strong> {auth.how_to_approach}</p>
                          {auth.contact_note && (
                            <p className="text-emerald-400"><strong>Contact / Helpline:</strong> {auth.contact_note}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 3: Evidence Checklist */}
                {activeTab === 'evidence' && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
                          Required Documents & Evidence Checklist
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          {Object.values(checkedDocs).filter(Boolean).length} of {activeGuidance.documents?.length || 0} gathered
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs mb-3">
                        Preserve these documents in safe digital and physical custody before approaching any authority.
                      </p>
                    </div>

                    <div className="space-y-2">
                      {activeGuidance.documents?.map(doc => {
                        const isChecked = !!checkedDocs[doc.id];
                        return (
                          <div
                            key={doc.id}
                            onClick={() => handleToggleDocCheck(doc.id)}
                            className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                              isChecked 
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-200' 
                                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                            }`}
                          >
                            <button className="mt-0.5 text-slate-400 focus:outline-none">
                              {isChecked ? (
                                <CheckSquare className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Square className="w-4 h-4" />
                              )}
                            </button>
                            <div className="flex-1 text-xs">
                              <div className="flex items-center gap-2">
                                <span className={`font-semibold ${isChecked ? 'line-through text-slate-400' : 'text-white'}`}>
                                  {doc.name}
                                </span>
                                {doc.is_essential && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
                                    Essential
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-400 text-[11px] mt-0.5">{doc.purpose}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tab 4: Escalation Pathway */}
                {activeTab === 'escalation' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">
                        4-Tier Procedural Escalation Matrix
                      </h4>
                      <p className="text-slate-400 text-xs">
                        If the initial institution or authority fails to resolve your grievance, follow this statutory pathway.
                      </p>
                    </div>

                    <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
                      {activeGuidance.escalation?.map((tier, idx) => (
                        <div key={idx} className="relative group">
                          {/* Dot indicator */}
                          <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-sky-400" />
                          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                                Tier {tier.tier}: {tier.level}
                              </span>
                            </div>
                            <h5 className="font-bold text-white text-xs sm:text-sm">{tier.authority}</h5>
                            <p className="text-slate-400 text-xs"><strong>Trigger Condition:</strong> {tier.condition}</p>
                            <p className="text-emerald-300 text-xs"><strong>Next Action:</strong> {tier.next_step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 5: Verified Sources */}
                {activeTab === 'sources' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">
                      Curated Official Statutory Sources
                    </h4>
                    <p className="text-slate-400 text-xs mb-3">
                      All guidance is synthesized from authenticated portals, gazettes, and statutory legislation.
                    </p>
                    <div className="space-y-2.5">
                      {activeGuidance.sources?.map((src, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h5 className="font-semibold text-white text-xs">{src.title}</h5>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                {src.sourceType || 'Government'}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                                Verified
                              </span>
                            </div>
                            <p className="text-slate-400 text-[11px] mt-0.5">{src.organization}</p>
                          </div>
                          {src.url && (
                            <a
                              href={src.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs flex items-center gap-1 shrink-0"
                            >
                              <span>Official Site</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Guided Follow-Up Questions (Interactive refinement) */}
              {activeGuidance.guided_questions?.length > 0 && (
                <div className="p-4 bg-indigo-950/30 border-t border-indigo-500/20">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 mb-2">
                    <HelpCircle className="w-4 h-4 text-indigo-400" />
                    <span>Quick Follow-Up to Refine Your Guidance:</span>
                  </div>
                  {activeGuidance.guided_questions.map((q) => (
                    <div key={q.id} className="space-y-1.5 mb-3 last:mb-0">
                      <p className="text-xs text-slate-300">{q.question}</p>
                      <div className="flex flex-wrap gap-2">
                        {q.options?.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => onSubmitConsultation(`${q.question}: ${opt}`)}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-900/40 hover:bg-indigo-800/60 border border-indigo-700/60 text-indigo-200 transition-colors cursor-pointer"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Warning Footer */}
              <div className="p-3 bg-amber-500/10 border-t border-amber-500/20 text-[11px] text-amber-200/90 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>{activeGuidance.warning}</p>
              </div>

            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar & Controls */}
        <div className="p-3 sm:p-4 border-t border-slate-800/80 bg-slate-950/80">
          
          {/* Quick Category & State pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                <option value="other">Category: Auto-Detect</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                {INDIAN_STATES.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Simulated Voice / OCR Helper */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <button
                type="button"
                onClick={handleSimulateVoice}
                className={`p-1.5 rounded-lg border transition-all ${
                  micActive 
                    ? 'bg-rose-500 text-white border-rose-400 animate-pulse' 
                    : 'bg-slate-900 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
                title="Voice Input (Speech Recognition Simulation)"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setOcrModalOpen(true)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-all text-slate-400"
                title="Explain Legal Notice / Document OCR (Preview)"
              >
                <Paperclip className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Consultation Input Form */}
          <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              rows={2}
              placeholder="Describe your situation in everyday language (e.g. My college is refusing to return my certificates...)"
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500/60 resize-none"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="h-11 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-sky-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shrink-0 cursor-pointer transition-all"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </main>

      {/* OCR Document Explainer Modal (Future Scope preview) */}
      {ocrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-md w-full border border-slate-700 text-left space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-sky-400" />
                <span>Notice & Document Explainer (OCR)</span>
              </h4>
              <button 
                onClick={() => setOcrModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upload a photograph or PDF of a college notice, eviction letter, landlord notice, or consumer receipt. NyayaGuide will extract and summarize the contents in plain language.
            </p>
            <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center text-xs text-slate-400 hover:border-sky-500/50 cursor-pointer">
              <FileText className="w-8 h-8 mx-auto mb-2 text-slate-500" />
              <p className="font-medium text-slate-300">Click to upload document photo or PDF</p>
              <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, PDF up to 10MB</p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOcrModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setOcrModalOpen(false);
                  setInputText("I received a notice from my college stating that my original marks cards will be retained due to alleged non-payment of extra unapproved fees.");
                }}
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
              >
                Simulate Notice OCR
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
