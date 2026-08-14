import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Plus, 
  Sparkles, 
  ShieldCheck, 
  Loader2,
  Lock,
  Globe,
  Zap
} from 'lucide-react';
import { ConnectedApp, AppCategory } from '../types';

interface ConnectAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddApp: (app: ConnectedApp) => void;
  existingApps: ConnectedApp[];
}

export const ConnectAppModal: React.FC<ConnectAppModalProps> = ({
  isOpen,
  onClose,
  onAddApp,
  existingApps
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('discord');
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState<AppCategory>('Productivity');
  const [customDescription, setCustomDescription] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [syncAi, setSyncAi] = useState(true);

  const availablePresets = [
    {
      id: 'discord',
      name: 'Discord',
      category: 'Communication' as AppCategory,
      description: 'Stream status, coding session channel notifications, and bot controls.',
      icon: 'forum'
    },
    {
      id: 'jira',
      name: 'Jira Software',
      category: 'Productivity' as AppCategory,
      description: 'Bi-directional epic & sprint ticket synchronization with smart subtasking.',
      icon: 'assignment'
    },
    {
      id: 'gitlab',
      name: 'GitLab',
      category: 'Development' as AppCategory,
      description: 'Merge request reviews, pipeline failures and CI runner logs directly in workspace.',
      icon: 'code'
    },
    {
      id: 'spotify',
      name: 'Spotify Focus',
      category: 'Creative' as AppCategory,
      description: 'Automatic lo-fi focus soundtrack trigger upon starting deep work sessions.',
      icon: 'draw'
    },
    {
      id: 'zoom',
      name: 'Zoom Meetings',
      category: 'Communication' as AppCategory,
      description: 'One-click meeting prep summary and automatic status "In a Meeting".',
      icon: 'forum'
    },
    {
      id: 'obsidian',
      name: 'Obsidian Vault',
      category: 'Productivity' as AppCategory,
      description: 'Local markdown sync with bidirectional graph link extraction.',
      icon: 'description'
    }
  ];

  if (!isOpen) return null;

  const handleConnect = () => {
    setIsConnecting(true);

    setTimeout(() => {
      let newApp: ConnectedApp;
      if (selectedPreset === 'custom') {
        newApp = {
          id: `custom-${Date.now()}`,
          name: customName || 'Custom Service',
          category: customCategory,
          description: customDescription || 'Custom webhook and event integration.',
          icon: 'api',
          status: 'Connected',
          lastSynced: 'Just now',
          accountEmail: 'alex.rivera@custom.io',
          isAiSynced: syncAi,
          syncItemCount: 1,
          features: ['Custom webhook listener', 'AI triage']
        };
      } else {
        const preset = availablePresets.find((p) => p.id === selectedPreset);
        if (!preset) return;
        newApp = {
          id: preset.id,
          name: preset.name,
          category: preset.category,
          description: preset.description,
          icon: preset.icon,
          status: 'Connected',
          lastSynced: 'Just now',
          accountEmail: `alex.rivera@${preset.id}.com`,
          isAiSynced: syncAi,
          syncItemCount: 4,
          features: ['Real-time event stream', 'Smart Chrona sync']
        };
      }

      onAddApp(newApp);
      setIsConnecting(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[620px] bg-[#161618] border border-[#2a2a2b] rounded-2xl shadow-2xl overflow-hidden p-6 relative ai-glow max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262626] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center text-[#adc6ff]">
              <Plus className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <div>
              <h3 className="font-geist font-bold text-white text-lg">Connect New Application</h3>
              <p className="text-xs text-[#8c909f]">Integrate seamlessly with your Chrona ecosystem</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[#8c909f] hover:text-white hover:bg-[#201f20] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset List */}
        <div className="my-4 overflow-y-auto flex-1 custom-scrollbar pr-1">
          <label className="text-xs font-geist font-semibold uppercase tracking-wider text-[#8c909f] block mb-3">
            Select Integration
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
            {availablePresets.map((preset) => {
              const isAlreadyAdded = existingApps.some((a) => a.name.toLowerCase() === preset.name.toLowerCase());
              const isSelected = selectedPreset === preset.id;

              return (
                <button
                  key={preset.id}
                  disabled={isAlreadyAdded}
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    isAlreadyAdded
                      ? 'opacity-40 bg-[#131314] border-[#201f20] cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#201f20] border-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                      : 'bg-[#131314] border-[#262626] hover:bg-[#1c1b1c] hover:border-[#424754]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-geist font-semibold text-sm text-white">
                      {preset.name}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#3B82F6]" />}
                    {isAlreadyAdded && <span className="text-[10px] text-[#4edea3]">Connected</span>}
                  </div>
                  <p className="text-xs text-[#8c909f] line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Custom Webhook Option */}
          <div className="pt-2 border-t border-[#262626]">
            <button
              onClick={() => setSelectedPreset('custom')}
              className={`w-full p-3 rounded-xl border text-left transition-all ${
                selectedPreset === 'custom'
                  ? 'bg-[#201f20] border-[#3B82F6]'
                  : 'bg-[#131314] border-[#262626] hover:bg-[#1c1b1c]'
              }`}
            >
              <div className="flex items-center gap-2 font-geist font-semibold text-sm text-white mb-1">
                <Globe className="w-4 h-4 text-[#3B82F6]" />
                <span>Custom API / Webhook Connector</span>
              </div>
              <p className="text-xs text-[#8c909f]">
                Connect any self-hosted service, REST API, or internal webhook trigger.
              </p>
            </button>

            {selectedPreset === 'custom' && (
              <div className="mt-3 space-y-2.5 bg-[#0e0e0f] p-3 rounded-xl border border-[#262626]">
                <div>
                  <label className="text-[11px] text-[#8c909f] block mb-1">App Name</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Postgres Sync Bot"
                    className="w-full bg-[#161618] border border-[#262626] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-[#8c909f] block mb-1">Category</label>
                    <select
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value as AppCategory)}
                      className="w-full bg-[#161618] border border-[#262626] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                    >
                      <option value="Communication">Communication</option>
                      <option value="Development">Development</option>
                      <option value="Productivity">Productivity</option>
                      <option value="Creative">Creative</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8c909f] block mb-1">Short Description</label>
                    <input
                      type="text"
                      value={customDescription}
                      onChange={(e) => setCustomDescription(e.target.value)}
                      placeholder="e.g. Database schema alerts"
                      className="w-full bg-[#161618] border border-[#262626] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Synchronization Toggle */}
          <div className="mt-4 p-3 rounded-xl bg-[#1c1b1c] border border-[#262626] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#3B82F6]" />
              <div>
                <div className="text-xs font-semibold text-white">Enable Chrona AI Auto-Sync</div>
                <div className="text-[11px] text-[#8c909f]">Allows AI Command Center to summarize data from this app</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={syncAi}
              onChange={(e) => setSyncAi(e.target.checked)}
              className="rounded bg-[#201f20] border-[#424754] text-[#3B82F6] focus:ring-0 w-4 h-4 cursor-pointer"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-[#262626] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-[#8c909f]">
            <Lock className="w-3.5 h-3.5 text-[#4edea3]" />
            <span>End-to-end encrypted token storage</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-geist text-[#8c909f] hover:text-white hover:bg-[#201f20] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="px-5 py-2 rounded-lg text-xs font-geist font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(59,130,246,0.3)] disabled:opacity-50"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Authorizing...
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" /> Authorize & Connect
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
