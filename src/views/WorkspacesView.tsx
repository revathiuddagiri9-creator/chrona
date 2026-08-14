import React from 'react';
import { 
  Layers, 
  Code2, 
  PenTool, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { WORKSPACE_PRESETS } from '../data/mockData';
import { TabType, WorkspacePreset } from '../types';

interface WorkspacesViewProps {
  onSelectTab: (tab: TabType) => void;
  onOpenConnectModal: () => void;
}

export const WorkspacesView: React.FC<WorkspacesViewProps> = ({
  onSelectTab,
  onOpenConnectModal
}) => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-geist text-2xl md:text-3xl font-semibold text-[#e5e2e3]">
            Multi-App Workspaces
          </h2>
          <p className="text-sm text-[#8c909f] mt-1">
            Pre-configured layouts that automatically tile and link your favorite dev tools.
          </p>
        </div>

        <button
          onClick={onOpenConnectModal}
          className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-geist font-bold rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>New Workspace Preset</span>
        </button>
      </div>

      {/* Grid of Workspaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WORKSPACE_PRESETS.map((ws) => (
          <div
            key={ws.id}
            onClick={() => onSelectTab(ws.activeTab)}
            className="bg-[#161618] border border-[#262626] hover:border-[#3B82F6]/50 rounded-xl p-5 flex flex-col justify-between hover:bg-[#201f20] transition-all cursor-pointer group relative overflow-hidden shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#201f20] border border-[#262626] group-hover:border-[#3B82F6]/30 flex items-center justify-center text-[#adc6ff]">
                  <Layers className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="font-geist text-base font-bold text-white group-hover:text-[#adc6ff] transition-colors">
                    {ws.name}
                  </h3>
                  <span className="text-xs text-[#8c909f]">Last used: {ws.lastUsed}</span>
                </div>
              </div>

              <div className="p-1.5 rounded-lg bg-[#201f20] text-[#8c909f] group-hover:text-white group-hover:bg-[#3B82F6]/20 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <p className="text-xs md:text-sm text-[#8c909f] mb-4 leading-relaxed font-geist">
              {ws.description}
            </p>

            {/* Apps included in layout */}
            <div className="pt-3 border-t border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                {ws.apps.map((app) => (
                  <span
                    key={app}
                    className="px-2 py-0.5 rounded bg-[#0A0A0B] border border-[#262626] text-[10px] font-mono text-[#c2c6d6]"
                  >
                    {app}
                  </span>
                ))}
              </div>

              <span className="text-xs text-[#3B82F6] font-semibold flex items-center gap-1 group-hover:underline">
                Launch
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
