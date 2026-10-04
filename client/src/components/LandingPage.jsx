import React, { useState } from 'react';
import { 
  Scale, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck2, 
  Building, 
  GitMerge, 
  Compass, 
  Sparkles, 
  AlertTriangle,
  GraduationCap,
  ShoppingBag,
  ShieldAlert,
  Briefcase,
  Building2,
  Home,
  Users,
  HeartHandshake,
  FileText,
  Landmark,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const CATEGORY_ICONS = {
  education: GraduationCap,
  consumer: ShoppingBag,
  cyber: ShieldAlert,
  employment: Briefcase,
  government: Building2,
  housing: Home,
  women_child: Users,
  senior_citizens: HeartHandshake,
  documents: FileText,
  banking: Landmark,
  rti: Search,
  other: Scale
};

export default function LandingPage({ 
  categories = [], 
  demoScenarios = [], 
  onSelectCategory, 
  onSelectDemoScenario, 
  onStartConsultation,
  onExploreSources
}) {
  const [quickInput, setQuickInput] = useState('');

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (quickInput.trim()) {
      onStartConsultation(quickInput.trim());
    }
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-gradient-to-r from-sky-600/20 via-indigo-600/15 to-purple-600/20 blur-3xl -z-10 pointer-events-none rounded-full" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 border border-sky-500/20 text-sky-300 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>AI-Powered Citizen Rights & Legal Guidance Platform for India</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
          Know Your Rights. <br className="hidden sm:inline" />
          <span className="gradient-text-sky">Know Your Next Step.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Describe your problem in everyday language and get verified, AI-powered guidance on possible rights, 
          actionable next steps, responsible authorities, evidence checklists, and escalation pathways.
        </p>

        {/* Quick Problem Input Bar */}
        <div className="mt-10 max-w-3xl mx-auto">
          <form onSubmit={handleQuickSubmit} className="relative glass-card p-2 rounded-2xl border border-sky-500/30 shadow-2xl shadow-sky-950/40 focus-within:border-sky-400 transition-all">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="Describe your issue (e.g. My landlord refuses to return my deposit...)"
                className="w-full px-4 py-3.5 bg-transparent text-slate-100 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-sky-600/30 transition-all cursor-pointer"
              >
                <span>Get Guidance</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick suggestions */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="text-slate-500">Try asking:</span>
            <button 
              onClick={() => onStartConsultation("My college is refusing to return my original certificates.")}
              className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-sky-300 transition-colors"
            >
              "College withholding certificates"
            </button>
            <button 
              onClick={() => onStartConsultation("I bought a product online and the company refused my refund.")}
              className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-sky-300 transition-colors"
            >
              "Online refund denied"
            </button>
            <button 
              onClick={() => onStartConsultation("Someone is sending threatening messages to me online.")}
              className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-sky-300 transition-colors"
            >
              "Online threats & blackmail"
            </button>
          </div>
        </div>

        {/* Hero CTA buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onStartConsultation()}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-white font-semibold text-sm border border-slate-700 shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Start Full Consultation</span>
            <ChevronRight className="w-4 h-4 text-sky-400" />
          </button>
          <button
            onClick={onExploreSources}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-transparent hover:bg-slate-900 text-slate-300 hover:text-white font-semibold text-sm border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Verified Sources</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">The Citizen Workflow</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">How NyayaGuide AI Works</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            No complex legal jargon required. We convert real-world grievances into systematic civic resolution steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="glass-card p-6 rounded-2xl relative group">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-base mb-4 group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="font-semibold text-white text-base">Describe Your Problem</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Explain what happened in your own words. Whether it's college, rent, workplace, cyber safety, or consumer fraud.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-card p-6 rounded-2xl relative group">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-base mb-4 group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="font-semibold text-white text-base">AI Analyzes & Classifies</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Our verified RAG engine maps your situation to Indian statutory frameworks, rules, and applicable legal provisions.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-card p-6 rounded-2xl relative group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-base mb-4 group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="font-semibold text-white text-base">Get Practical Action Plan</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Receive numbered immediate steps, evidence checklists to preserve, and formal complaint letter drafts ready to file.
            </p>
          </div>

          {/* Step 4 */}
          <div className="glass-card p-6 rounded-2xl relative group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-base mb-4 group-hover:scale-110 transition-transform">
              4
            </div>
            <h3 className="font-semibold text-white text-base">Reach Authority & Escalate</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Know exactly which official portal or authority to approach, and how to escalate step-by-step if they ignore you.
            </p>
          </div>

        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Built for Every Indian Citizen</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              Transforming legal ambiguity into actionable clarity without false promises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm">Actionable Action Plans</h4>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Step-by-step instructions on what to do first, what written notices to send, and how to protect yourself legally.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm">Official Authority Finder</h4>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Connect with the exact department, ombudsman, or commission (NCH, CPGRAMS, e-Daakhil, UGC e-Samadhan).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm">Dynamic Document Checklist</h4>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Interactive checklist of essential evidence, receipts, and chat logs you must preserve before filing a grievance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                <GitMerge className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm">4-Tier Escalation Matrix</h4>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Visual escalation pathway if the initial authority refuses or fails to respond within the statutory timeframe.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm">100% Verified Sources</h4>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Direct citations to genuine Government of India gazettes, portals (.gov.in, .nic.in), and statutory regulations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm">Responsible AI Safeguards</h4>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                No false legal claims. Built-in emergency detection flags immediate physical danger to 112 / 1930 / 1098.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Demo Scenarios Showcase (1-Click Test) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Interactive Demos</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Realistic Citizen Scenarios</h2>
            <p className="text-slate-400 text-sm mt-1">
              Select any real-world scenario to observe how the AI processes and structures guidance.
            </p>
          </div>
          <span className="text-xs text-slate-500 mt-2 sm:mt-0">Click any card to start</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {demoScenarios.map((demo) => {
            const Icon = CATEGORY_ICONS[demo.category] || Scale;
            return (
              <div
                key={demo.id}
                onClick={() => onSelectDemoScenario(demo)}
                className="glass-card p-5 rounded-2xl cursor-pointer group hover:border-sky-500/40 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {demo.badge}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
                  </div>
                  <h4 className="font-semibold text-white text-sm group-hover:text-sky-300 transition-colors">
                    {demo.title}
                  </h4>
                  <p className="text-slate-400 text-xs mt-2 line-clamp-2">
                    "{demo.prompt}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-sky-400 font-medium group-hover:translate-x-1 transition-transform">
                  <span>View Structured Guidance</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Problem Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Jurisdiction Areas</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Browse Problem Categories</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-1">
            Choose a domain to focus your inquiry, or simply describe your issue directly.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Scale;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="glass-card p-4 rounded-xl cursor-pointer group hover:border-sky-500/30 text-left transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 text-sky-400 flex items-center justify-center mb-2.5 group-hover:bg-sky-500/20 group-hover:scale-105 transition-all">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-white text-xs group-hover:text-sky-300 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-slate-400 text-[11px] mt-1 line-clamp-2">
                  {cat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Prominent Legal Safety & Responsible AI Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-300 text-xs sm:text-sm leading-relaxed flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <h4 className="font-bold text-amber-300 text-sm">
              Citizen Legal Information Disclaimer & Responsible AI Mandate
            </h4>
            <p className="text-slate-300">
              <strong>NyayaGuide AI provides general legal, civic, and administrative information for educational and guidance purposes only.</strong> It is not a law firm, does not pretend to be an advocate, and is not a substitute for a qualified lawyer or judicial authority.
            </p>
            <p className="text-slate-400 text-xs">
              Laws and administrative circulars are subject to change. Always verify information via the linked official government portals (.gov.in / .nic.in). For criminal matters, urgent safety threats, or court representation, please consult a licensed advocate or contact the National Legal Services Authority (15100).
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
