import React, { useState } from 'react';
import { 
  Scale, 
  ShieldAlert, 
  MapPin, 
  Settings, 
  BookOpen, 
  LayoutDashboard, 
  MessageSquare,
  Menu,
  X,
  PhoneCall
} from 'lucide-react';

export const INDIAN_STATES = [
  { id: '', name: 'All India (Central Rules)' },
  { id: 'karnataka', name: 'Karnataka' },
  { id: 'maharashtra', name: 'Maharashtra' },
  { id: 'delhi', name: 'Delhi (NCT)' },
  { id: 'tamilnadu', name: 'Tamil Nadu' },
  { id: 'uttarpradesh', name: 'Uttar Pradesh' }
];

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  selectedState, 
  setSelectedState, 
  onOpenSettings,
  onOpenEmergency
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'consultation', label: 'AI Guidance', icon: MessageSquare },
    { id: 'landing', label: 'Explore Rights', icon: Scale },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sources', label: 'Verified Sources', icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-950/50 group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-heading">
                  Nyaya<span className="text-sky-400">Guide</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-md">
                  AI Beta
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
                Know Your Rights. Know Your Next Step.
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: State selector, Emergency, Settings */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* State Selector */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 shadow-inner">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer pr-1"
                aria-label="Select Jurisdiction State"
              >
                {INDIAN_STATES.map(st => (
                  <option key={st.id} value={st.id} className="bg-slate-900 text-slate-200">
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Emergency Helplines Button */}
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition-all shadow-sm group"
              title="24x7 Emergency Helplines (112, 1930, 1098, 181)"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Helplines</span>
            </button>

            {/* Settings Trigger */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700"
              title="Application Settings & API Configuration"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenEmergency}
              className="p-2 text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg"
              title="Emergency Helplines"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-sm font-medium ${
                    isActive 
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' 
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile State Selector */}
          <div className="pt-2 border-t border-slate-800/80">
            <label className="text-[11px] font-medium text-slate-400 block mb-1.5">
              Select Jurisdiction State
            </label>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent text-slate-200 text-xs w-full focus:outline-none"
              >
                {INDIAN_STATES.map(st => (
                  <option key={st.id} value={st.id} className="bg-slate-900 text-slate-200">
                    {st.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                onOpenEmergency();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-300 bg-rose-500/15 border border-rose-500/30"
            >
              <PhoneCall className="w-4 h-4" />
              Emergency Helplines (112, 1930)
            </button>
            <button
              onClick={() => {
                onOpenSettings();
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
