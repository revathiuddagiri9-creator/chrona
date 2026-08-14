import React from 'react';
import { Home, Grid, Code2, Bell, Sparkles } from 'lucide-react';
import { TabType } from '../types';

interface MobileBottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenAiCommand: () => void;
  unreadCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenAiCommand,
  unreadCount = 2
}) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'coding' as TabType, label: 'Workspace', icon: Code2 },
    { id: 'apps' as TabType, label: 'Apps', icon: Grid },
    { id: 'notifications' as TabType, label: 'Alerts', icon: Bell, badgeCount: unreadCount }
  ];

  return (
    <>
      {/* Floating AI Command Button (Bottom Right) */}
      <button
        id="floating-ai-button"
        onClick={onOpenAiCommand}
        className="fixed bottom-20 md:bottom-8 right-5 md:right-8 w-14 h-14 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#60A5FA] shadow-[0_0_25px_rgba(59,130,246,0.5)] flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all group border border-[#adc6ff]/40"
        aria-label="Open Chrona AI Assistant"
      >
        <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300 animate-pulse" />
        <span className="sr-only">Open Chrona AI</span>
      </button>

      {/* Mobile Bottom Dock Navigation Bar */}
      <nav 
        id="mobile-bottom-nav"
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 w-full z-40 bg-[#0e0e0f]/95 backdrop-blur-xl border-t border-[#2a2a2b] shadow-2xl flex justify-around items-center h-16 px-4 pb-safe"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-tab-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 relative transition-all duration-200 ${
                isActive ? 'text-[#adc6ff] font-bold scale-105' : 'text-[#8c909f] hover:text-[#e5e2e3]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#adc6ff]' : 'text-[#8c909f]'}`} />
                {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#ffb4ab]" />
                )}
              </div>
              <span className="font-geist text-[11px] mt-1 tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#3B82F6] mt-0.5" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
