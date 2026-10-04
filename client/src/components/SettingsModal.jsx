import React, { useState } from 'react';
import { Settings, Key, MapPin, Trash2, Download, Check, X, Shield, Activity } from 'lucide-react';
import { INDIAN_STATES } from './Navbar.jsx';

export default function SettingsModal({
  customApiKey = '',
  setCustomApiKey = () => {},
  selectedState = '',
  setSelectedState = () => {},
  selectedDistrict = '',
  setSelectedDistrict = () => {},
  onClearHistory = () => {},
  conversations = [],
  onClose = () => {}
}) {
  const [keyInput, setKeyInput] = useState(customApiKey);
  const [savedKeyMsg, setSavedKeyMsg] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const handleSaveKey = (e) => {
    e.preventDefault();
    setCustomApiKey(keyInput.trim());
    localStorage.setItem('nyayaguide_custom_api_key', keyInput.trim());
    setSavedKeyMsg(true);
    setTimeout(() => setSavedKeyMsg(false), 2000);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(conversations, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nyayaguide_history_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-slate-700 overflow-hidden text-left shadow-2xl">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Application Settings</h3>
              <p className="text-[11px] text-slate-400">Configure AI engine preferences and jurisdiction defaults</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* AI Engine Configuration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <Key className="w-3.5 h-3.5 text-sky-400" />
                <span>Google Gemini API Key (Optional)</span>
              </label>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Verified RAG Engine Active
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              NyayaGuide AI includes a built-in deterministic Verified Indian Legal RAG Engine that operates out of the box without any API key. If you wish to enable dynamic generative LLM synthesis, you may supply your own Google Gemini API key below.
            </p>

            <form onSubmit={handleSaveKey} className="flex gap-2">
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy... (Leave empty to use built-in RAG engine)"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-all cursor-pointer shrink-0"
              >
                {savedKeyMsg ? 'Saved!' : 'Save Key'}
              </button>
            </form>
          </div>

          {/* Jurisdiction Defaults */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <label className="text-xs font-bold text-white flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Default Jurisdiction</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">State</label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    localStorage.setItem('nyayaguide_default_state', e.target.value);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {INDIAN_STATES.map(st => (
                    <option key={st.id} value={st.id}>{st.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">District / City (Optional)</label>
                <input
                  type="text"
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    localStorage.setItem('nyayaguide_default_district', e.target.value);
                  }}
                  placeholder="e.g. Mysuru / Bengaluru / Pune"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Data Privacy & History Management */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <label className="text-xs font-bold text-white flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>Data Privacy & Storage</span>
            </label>
            <p className="text-slate-400 text-xs leading-relaxed">
              NyayaGuide AI does not store unnecessary personal information. You can export or wipe your local consultation history at any time.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={handleExportData}
                disabled={conversations.length === 0}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Consultations ({conversations.length})</span>
              </button>

              {confirmClear ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onClearHistory();
                      setConfirmClear(false);
                    }}
                    className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                  >
                    Confirm Wipe
                  </button>
                  <button
                    onClick={() => setConfirmClear(false)}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClear(true)}
                  disabled={conversations.length === 0}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1.5 border border-rose-500/30 transition-all disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All History</span>
                </button>
              )}
            </div>
          </div>

          {/* Engine Status */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Backend Status: Online</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">v1.0.0</span>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
