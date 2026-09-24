import React, { useState } from 'react';
import { FileText, Copy, Printer, Check, X, Download } from 'lucide-react';

export default function DraftComplaintModal({
  guidance = null,
  onClose = () => {}
}) {
  const [draftContent, setDraftContent] = useState(guidance?.complaint_draft_template || '');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(draftContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([draftContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `NyayaGuide_Formal_Representation_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-slate-700 max-h-[90vh] flex flex-col overflow-hidden text-left shadow-2xl">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Formal Grievance Representation Letter</h3>
              <p className="text-[11px] text-slate-400">Customized according to your facts and applicable authorities</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Info */}
        <div className="px-6 py-2.5 bg-sky-950/30 border-b border-sky-500/20 text-xs text-sky-300 flex items-center justify-between">
          <span>You can edit the placeholders (e.g. [Complainant Name]) directly before printing.</span>
          <span className="text-[10px] bg-sky-500/20 px-2 py-0.5 rounded text-sky-200">Ready to File</span>
        </div>

        {/* Textarea Editor */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-900/50">
          <textarea
            value={draftContent}
            onChange={(e) => setDraftContent(e.target.value)}
            rows={18}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm font-mono text-slate-200 leading-relaxed focus:outline-none focus:border-sky-500/60 resize-none shadow-inner"
          />
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400">
            Send via Registered Post with Acknowledgement Due (RPAD) or official email.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download .txt</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Letter</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
