import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import LandingPage from './components/LandingPage.jsx';
import ConsultationView from './components/ConsultationView.jsx';
import DashboardView from './components/DashboardView.jsx';
import VerifiedSourcesView from './components/VerifiedSourcesView.jsx';
import DraftComplaintModal from './components/DraftComplaintModal.jsx';
import EmergencyModal from './components/EmergencyModal.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import { api } from './services/api.js';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'consultation' | 'dashboard' | 'sources'
  
  // Data State
  const [categories, setCategories] = useState([]);
  const [helplines, setHelplines] = useState([]);
  const [sources, setSources] = useState([]);
  const [demoScenarios, setDemoScenarios] = useState([]);
  const [stats, setStats] = useState({});
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [activeGuidance, setActiveGuidance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Preference State
  const [selectedState, setSelectedState] = useState(() => localStorage.getItem('nyayaguide_default_state') || '');
  const [selectedDistrict, setSelectedDistrict] = useState(() => localStorage.getItem('nyayaguide_default_district') || '');
  const [selectedCategory, setSelectedCategory] = useState('other');
  const [customApiKey, setCustomApiKey] = useState(() => localStorage.getItem('nyayaguide_custom_api_key') || '');

  // Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [draftModalGuidance, setDraftModalGuidance] = useState(null);

  // Initial load
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [catRes, helpRes, srcRes, demoRes, statsRes, convsRes] = await Promise.all([
        api.getCategories().catch(() => ({ categories: [] })),
        api.getHelplines().catch(() => ({ helplines: [] })),
        api.getSources().catch(() => ({ sources: [] })),
        api.getDemoScenarios().catch(() => ({ demoScenarios: [] })),
        api.getStats().catch(() => ({ stats: {} })),
        api.getConversations().catch(() => ({ conversations: [] }))
      ]);

      if (catRes.categories) setCategories(catRes.categories);
      if (helpRes.helplines) setHelplines(helpRes.helplines);
      if (srcRes.sources) setSources(srcRes.sources);
      if (demoRes.demoScenarios) setDemoScenarios(demoRes.demoScenarios);
      if (statsRes.stats) setStats(statsRes.stats);
      if (convsRes.conversations) setConversations(convsRes.conversations);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  };

  const handleStartConsultation = (initialPrompt = null) => {
    setActiveTab('consultation');
    if (initialPrompt) {
      handleSubmitConsultation(initialPrompt);
    }
  };

  const handleNewConsultation = () => {
    setCurrentConversation(null);
    setActiveGuidance(null);
    setActiveTab('consultation');
  };

  const handleSelectDemoScenario = (demo) => {
    setSelectedCategory(demo.category);
    setActiveTab('consultation');
    handleSubmitConsultation(demo.prompt, demo.category);
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setActiveTab('consultation');
  };

  const handleSelectConversation = async (id) => {
    try {
      setIsLoading(true);
      const res = await api.getConversation(id);
      if (res.conversation) {
        setCurrentConversation(res.conversation);
        if (res.conversation.guidance?.length > 0) {
          const latest = res.conversation.guidance[res.conversation.guidance.length - 1];
          setActiveGuidance(latest.data);
        } else {
          setActiveGuidance(null);
        }
      }
      setActiveTab('consultation');
    } catch (err) {
      console.error('Failed to load conversation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConversation = async (id) => {
    try {
      await api.deleteConversation(id);
      setConversations(prev => prev.filter(c => c.id !== id));
      if (currentConversation?.id === id) {
        setCurrentConversation(null);
        setActiveGuidance(null);
      }
    } catch (err) {
      console.error('Failed to delete conversation:', err);
    }
  };

  const handleToggleSave = async (id) => {
    try {
      const res = await api.toggleSaveConversation(id);
      if (res.conversation) {
        setConversations(prev => prev.map(c => c.id === id ? res.conversation : c));
        if (currentConversation?.id === id) {
          setCurrentConversation(prev => ({ ...prev, is_saved: res.conversation.is_saved }));
        }
      }
    } catch (err) {
      console.error('Failed to toggle save:', err);
    }
  };

  const handleClearHistory = async () => {
    try {
      await api.clearAllConversations();
      setConversations([]);
      setCurrentConversation(null);
      setActiveGuidance(null);
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  const handleAddSource = async (sourceData) => {
    try {
      const res = await api.addSource(sourceData);
      if (res.source) {
        setSources(prev => [res.source, ...prev]);
      }
    } catch (err) {
      console.error('Failed to add source:', err);
    }
  };

  const handleSubmitConsultation = async (queryText, categoryOverride = null) => {
    if (!queryText || !queryText.trim()) return;

    setIsLoading(true);
    const cat = categoryOverride || selectedCategory || 'other';

    try {
      const res = await api.submitConsultation({
        query: queryText,
        category: cat,
        state: selectedState,
        district: selectedDistrict,
        conversationId: currentConversation?.id || null,
        customApiKey
      });

      if (res.guidance) {
        setActiveGuidance(res.guidance);
        
        // Refresh conversation details
        const updatedConvRes = await api.getConversation(res.conversationId);
        if (updatedConvRes.conversation) {
          setCurrentConversation(updatedConvRes.conversation);
        }

        // Refresh conversation list and stats
        api.getConversations().then(r => r.conversations && setConversations(r.conversations));
        api.getStats().then(r => r.stats && setStats(r.stats));
      }
    } catch (err) {
      console.error('Error submitting consultation:', err);
      alert(err.message || 'Unable to analyze this situation right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            categories={categories}
            demoScenarios={demoScenarios}
            onSelectCategory={handleSelectCategory}
            onSelectDemoScenario={handleSelectDemoScenario}
            onStartConsultation={handleStartConsultation}
            onExploreSources={() => setActiveTab('sources')}
          />
        )}

        {activeTab === 'consultation' && (
          <ConsultationView
            conversations={conversations}
            currentConversation={currentConversation}
            activeGuidance={activeGuidance}
            isLoading={isLoading}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            categories={categories}
            demoScenarios={demoScenarios}
            onNewConsultation={handleNewConsultation}
            onSelectConversation={handleSelectConversation}
            onDeleteConversation={handleDeleteConversation}
            onToggleSave={handleToggleSave}
            onSubmitConsultation={handleSubmitConsultation}
            onOpenDraftModal={(g) => setDraftModalGuidance(g)}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            stats={stats}
            conversations={conversations}
            helplines={helplines}
            onSelectConversation={handleSelectConversation}
            onDeleteConversation={handleDeleteConversation}
            onNewConsultation={handleNewConsultation}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        )}

        {activeTab === 'sources' && (
          <VerifiedSourcesView
            sources={sources}
            categories={categories}
            onAddSource={handleAddSource}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">NyayaGuide AI</span>
            <span>•</span>
            <span>Know Your Rights. Know Your Next Step.</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Civic Technology Platform for Indian Citizens • Educational & Guidance Purpose
          </div>
        </div>
      </footer>

      {/* Modals */}
      {draftModalGuidance && (
        <DraftComplaintModal
          guidance={draftModalGuidance}
          onClose={() => setDraftModalGuidance(null)}
        />
      )}

      {isEmergencyOpen && (
        <EmergencyModal
          helplines={helplines}
          onClose={() => setIsEmergencyOpen(false)}
        />
      )}

      {isSettingsOpen && (
        <SettingsModal
          customApiKey={customApiKey}
          setCustomApiKey={setCustomApiKey}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          onClearHistory={handleClearHistory}
          conversations={conversations}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

    </div>
  );
}
