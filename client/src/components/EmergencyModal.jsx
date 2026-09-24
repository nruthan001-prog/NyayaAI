import React from 'react';
import { PhoneCall, ShieldAlert, X, AlertTriangle } from 'lucide-react';

export default function EmergencyModal({
  helplines = [],
  onClose = () => {}
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-rose-500/40 overflow-hidden text-left shadow-2xl">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-rose-500/30 bg-rose-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">National Emergency & Citizen Helplines</h3>
              <p className="text-[11px] text-rose-200/80">Toll-free 24x7 Government Emergency Numbers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency Notice */}
        <div className="p-4 bg-rose-500/10 border-b border-rose-500/20 text-xs text-rose-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <p>
            If you or someone else is in immediate physical danger, medical crisis, or experiencing an active violent threat, call <strong>112</strong> immediately. For unauthorized banking fraud or extortion, call <strong>1930</strong> within the golden hour.
          </p>
        </div>

        {/* Helplines Grid */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-2.5">
          {helplines.map((h, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-xl border flex items-center justify-between ${
                h.urgent 
                  ? 'bg-rose-500/15 border-rose-500/30' 
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base text-white font-mono">{h.number}</span>
                  {h.urgent && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500 text-white font-bold uppercase">
                      Urgent
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-xs text-slate-200 mt-0.5">{h.title}</h4>
                <p className="text-[11px] text-slate-400">{h.coverage}</p>
              </div>

              <a
                href={`tel:${h.number}`}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-950/50"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {h.number}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
