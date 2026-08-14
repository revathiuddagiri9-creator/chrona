import React, { useState } from 'react';
import { 
  Plus, 
  MoreVertical, 
  Sparkles, 
  Mail, 
  MessageSquare, 
  Code2, 
  FileText, 
  Calendar, 
  Terminal, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  X,
  ShieldCheck,
  Zap,
  Power
} from 'lucide-react';
import { ConnectedApp, AppCategory } from '../types';

interface ConnectedAppsViewProps {
  apps: ConnectedApp[];
  onOpenConnectModal: () => void;
  onToggleAppStatus: (appId: string) => void;
  onSelectTab: (tab: any) => void;
}

export const ConnectedAppsView: React.FC<ConnectedAppsViewProps> = ({
  apps,
  onOpenConnectModal,
  onToggleAppStatus,
  onSelectTab
}) => {
  const [selectedAppDetail, setSelectedAppDetail] = useState<ConnectedApp | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const getIconComponent = (appName: string) => {
    const lower = appName.toLowerCase();
    if (lower.includes('gmail') || lower.includes('mail')) return Mail;
    if (lower.includes('slack') || lower.includes('discord')) return MessageSquare;
    if (lower.includes('github') || lower.includes('gitlab')) return Code2;
    if (lower.includes('notion') || lower.includes('obsidian')) return FileText;
    if (lower.includes('calendar') || lower.includes('cron')) return Calendar;
    if (lower.includes('leetcode')) return Terminal;
    return Sparkles;
  };

  const handleSyncApp = (appId: string) => {
    setSyncingId(appId);
    setTimeout(() => {
      setSyncingId(null);
    }, 1200);
  };

  const categories: AppCategory[] = ['Communication', 'Development', 'Productivity', 'Creative'];

  return (
    <div id="connected-apps-container" className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-geist text-2xl md:text-3xl font-semibold text-[#e5e2e3] tracking-tight">
            Connected Apps
          </h2>
          <p className="text-sm md:text-base text-[#8c909f] mt-1">
            Manage your integrations and workflow connections.
          </p>
        </div>

        <button
          id="connect-app-header-btn"
          onClick={onOpenConnectModal}
          className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-[#3B82F6] text-white rounded-lg font-geist text-sm font-semibold hover:bg-[#2563EB] transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Connect App</span>
        </button>
      </div>

      {/* Bento Grid by Category */}
      <div className="space-y-8">
        {categories.map((category) => {
          const categoryApps = apps.filter((a) => a.category === category);
          if (categoryApps.length === 0 && category !== 'Development') return null;

          return (
            <div key={category} className="space-y-4">
              {/* Category Header */}
              <h3 className="font-geist text-lg font-medium text-[#e5e2e3] border-b border-[#262626] pb-2">
                {category}
              </h3>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {categoryApps.map((app) => {
                  const Icon = getIconComponent(app.name);
                  const isConnected = app.status === 'Connected';
                  const isSyncing = app.status === 'Syncing' || syncingId === app.id;
                  const isDisconnected = app.status === 'Disconnected';

                  return (
                    <div
                      key={app.id}
                      className={`bg-[#161618] border border-[#262626] rounded-xl p-4 md:p-5 flex flex-col hover:border-[#3B82F6]/40 transition-all group relative overflow-hidden shadow-sm ${
                        isSyncing || app.isAiSynced ? 'ai-glow' : ''
                      }`}
                    >
                      {/* Ambient corner light for Slack or active cards */}
                      {isDisconnected && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/5 rounded-bl-full pointer-events-none" />
                      )}

                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-[#201f20] border border-[#262626] flex items-center justify-center text-[#e5e2e3] group-hover:border-[#3B82F6]/30 transition-colors">
                            <Icon className="w-6 h-6 text-[#e5e2e3]" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-geist text-sm md:text-base font-semibold text-[#e5e2e3]">
                                {app.name}
                              </h4>
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isConnected || isSyncing
                                    ? 'bg-[#4edea3] shadow-[0_0_6px_rgba(78,222,163,0.8)]'
                                    : 'bg-[#ffb4ab]'
                                }`}
                              />
                            </div>

                            <span
                              className={`text-xs font-geist ${
                                isSyncing
                                  ? 'text-[#adc6ff]'
                                  : isConnected
                                  ? 'text-[#4edea3]'
                                  : 'text-[#ffb4ab]'
                              }`}
                            >
                              {isSyncing
                                ? 'Connected • Syncing'
                                : isConnected
                                ? 'Connected'
                                : 'Disconnected'}
                            </span>
                          </div>
                        </div>

                        {/* Top right icon (Sparkle if syncing, or more vert) */}
                        <div className="flex items-center gap-1">
                          {isSyncing && (
                            <Sparkles className="w-4 h-4 text-[#3B82F6] animate-pulse" />
                          )}
                          <button
                            onClick={() => setSelectedAppDetail(app)}
                            className="p-1 rounded-md text-[#8c909f] hover:text-white hover:bg-[#201f20] transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs md:text-sm text-[#8c909f] mb-4 flex-1 relative z-10 leading-relaxed font-geist">
                        {app.description}
                      </p>

                      {/* Bottom Action Row */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#262626]/50 relative z-10">
                        <span className="text-[11px] text-[#8c909f] font-mono">
                          {app.lastSynced ? `Synced ${app.lastSynced}` : ''}
                        </span>

                        {isDisconnected ? (
                          <button
                            onClick={() => onToggleAppStatus(app.id)}
                            className="px-3 py-1.5 bg-[#3B82F6]/15 text-[#adc6ff] hover:bg-[#3B82F6]/25 border border-[#3B82F6]/40 rounded-md font-geist text-xs font-semibold transition-colors flex items-center gap-1.5"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Reconnect</span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSyncApp(app.id)}
                              disabled={isSyncing}
                              className="p-1.5 border border-[#2a2a2b] rounded-md text-[#8c909f] hover:text-[#adc6ff] hover:bg-[#201f20] transition-colors"
                              title="Force Sync"
                            >
                              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#3B82F6]' : ''}`} />
                            </button>
                            <button
                              onClick={() => setSelectedAppDetail(app)}
                              className="px-3 py-1.5 border border-[#2a2a2b] hover:border-[#424754] rounded-md text-[#e5e2e3] font-geist text-xs hover:bg-[#201f20] transition-colors"
                            >
                              Open
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* LeetCode Custom Placeholder Card (matches Image 1) */}
                {category === 'Development' && !apps.some((a) => a.id === 'leetcode' && a.status === 'Connected') && (
                  <div
                    onClick={() => {
                      const lc = apps.find((a) => a.id === 'leetcode');
                      if (lc) onToggleAppStatus('leetcode');
                      else onOpenConnectModal();
                    }}
                    className="bg-[#161618] border border-[#262626] border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center opacity-85 hover:opacity-100 transition-all cursor-pointer hover:border-[#3B82F6]/50 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#201f20] flex items-center justify-center text-[#8c909f] group-hover:text-[#ffb95f] mb-3 transition-colors border border-[#262626]">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <h4 className="font-geist text-sm font-semibold text-[#e5e2e3] mb-1">
                      LeetCode
                    </h4>
                    <p className="text-xs text-[#8c909f] mb-4">
                      Track daily problems and streaks.
                    </p>
                    <button className="text-[#3B82F6] font-geist text-xs font-semibold flex items-center gap-1.5 group-hover:underline">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Connect</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Connect Button */}
      <button
        onClick={onOpenConnectModal}
        className="md:hidden w-full mt-4 flex items-center justify-center gap-2 px-4 py-3.5 bg-[#3B82F6] text-white rounded-xl font-geist text-sm font-semibold hover:bg-[#2563EB] transition-colors shadow-lg shadow-[#3B82F6]/20"
      >
        <Plus className="w-4 h-4" />
        <span>Connect New App</span>
      </button>

      {/* Detailed App Modal / Drawer */}
      {selectedAppDetail && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedAppDetail(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[540px] bg-[#161618] border border-[#2a2a2b] rounded-2xl p-6 shadow-2xl space-y-5 relative ai-glow"
          >
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#201f20] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="font-geist text-lg font-bold text-white">
                    {selectedAppDetail.name} Settings
                  </h3>
                  <p className="text-xs text-[#8c909f]">
                    Account: {selectedAppDetail.accountEmail || 'alex.rivera@workspace.io'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAppDetail(null)}
                className="p-1 text-[#8c909f] hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#0e0e0f] p-3.5 rounded-xl border border-[#262626] space-y-2">
                <div className="text-[#e5e2e3] font-semibold flex items-center justify-between">
                  <span>Connection Status</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                    selectedAppDetail.status === 'Connected' ? 'bg-[#4edea3]/10 text-[#4edea3]' : 'bg-[#ffb4ab]/10 text-[#ffb4ab]'
                  }`}>
                    {selectedAppDetail.status}
                  </span>
                </div>
                <p className="text-[#8c909f] leading-relaxed">
                  {selectedAppDetail.description}
                </p>
              </div>

              {selectedAppDetail.features && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8c909f]">
                    Active AI Capabilities
                  </span>
                  <ul className="space-y-1 text-[#c2c6d6]">
                    {selectedAppDetail.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
              <button
                onClick={() => {
                  onToggleAppStatus(selectedAppDetail.id);
                  setSelectedAppDetail(null);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-geist font-semibold flex items-center gap-1.5 transition-colors ${
                  selectedAppDetail.status === 'Connected'
                    ? 'text-[#ffb4ab] hover:bg-[#ffb4ab]/10 border border-[#ffb4ab]/30'
                    : 'text-[#4edea3] hover:bg-[#4edea3]/10 border border-[#4edea3]/30'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{selectedAppDetail.status === 'Connected' ? 'Disconnect Integration' : 'Reconnect Integration'}</span>
              </button>

              <button
                onClick={() => setSelectedAppDetail(null)}
                className="px-4 py-2 rounded-lg bg-[#3B82F6] text-white text-xs font-geist font-bold hover:bg-[#2563EB] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
