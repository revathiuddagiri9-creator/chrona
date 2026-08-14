import React from 'react';
import { 
  Home, 
  Grid, 
  Layers, 
  SlidersHorizontal,
  CheckSquare, 
  Bell, 
  Sparkles, 
  BarChart3, 
  Settings, 
  Code2
} from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenAiCommand: () => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenAiCommand,
  unreadCount = 2
}) => {
  const navItems = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'coding' as TabType, label: 'Coding Workspace', icon: Code2, badge: 'Live' },
    { id: 'apps' as TabType, label: 'Connected Apps', icon: Grid },
    { id: 'workspaces' as TabType, label: 'Workspaces', icon: Layers },
    { id: 'tasks' as TabType, label: 'Tasks', icon: CheckSquare },
    { id: 'notifications' as TabType, label: 'Notifications', icon: Bell, badgeCount: unreadCount },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings }
  ];

  return (
    <aside 
      id="desktop-sidebar" 
      aria-label="Desktop Sidebar Navigation"
      className="hidden md:flex h-full w-[280px] fixed left-0 top-0 z-40 bg-[#131314] border-r border-[#2a2a2b] flex-col py-4 select-none"
    >
      {/* Brand Header */}
      <div className="px-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#60A5FA] flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.4)]">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-geist flex items-center gap-1.5">
              Chrona
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2563EB]/20 text-[#adc6ff] border border-[#2563EB]/40 font-mono">
                v2.4
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 px-3 flex-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150 text-left group ${
                isActive
                  ? 'bg-[#201f20] text-[#adc6ff] font-semibold border-l-2 border-[#3B82F6] shadow-sm'
                  : 'text-[#c2c6d6] hover:text-[#e5e2e3] hover:bg-[#2a2a2b]/60 border-l-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#adc6ff]' : 'text-[#8c909f] group-hover:text-white'}`} />
                <span className="font-geist text-[14px]">{item.label}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/30">
                  {item.badge}
                </span>
              )}

              {item.badgeCount !== undefined && item.badgeCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/30 text-[10px] font-bold flex items-center justify-center">
                  {item.badgeCount}
                </span>
              )}
            </button>
          );
        })}

        {/* Chrona AI Trigger Button inside menu */}
        <button
          id="nav-ai-assistant-btn"
          onClick={onOpenAiCommand}
          className="mt-2 flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-[#adc6ff] bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border border-[#3B82F6]/30 transition-all group relative overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#3B82F6] group-hover:scale-110 transition-transform" />
            <span className="font-geist font-medium text-[14px] text-white">AI Assistant</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#201f20] text-[#adc6ff] border border-[#3B82F6]/40 font-mono">
            ⌘K
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/0 via-[#3B82F6]/10 to-[#3B82F6]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </nav>

      {/* User Profile Section at Bottom */}
      <div className="mt-auto border-t border-[#2a2a2b] px-4 pt-3 pb-1">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#201f20] transition-colors cursor-pointer group">
          <div className="relative w-9 h-9 rounded-full bg-[#2a2a2b] flex items-center justify-center overflow-hidden border border-[#424754]">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Alex Rivera"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-bold text-xs text-[#adc6ff]">AR</span>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#4edea3] border-2 border-[#131314]" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-geist text-[13px] font-semibold text-[#e5e2e3] truncate group-hover:text-white">
              Alex Rivera
            </span>
            <span className="font-geist text-[11px] text-[#8c909f] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
              Pro Plan • Online
            </span>
          </div>
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#8c909f] group-hover:text-white" />
        </div>
      </div>
    </aside>
  );
};
