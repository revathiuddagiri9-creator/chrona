import React, { useState } from 'react';
import { 
  Settings, 
  Sparkles, 
  Moon, 
  Shield, 
  Sliders, 
  Bell, 
  User, 
  Check, 
  Key, 
  Cpu,
  Save
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [modelType, setModelType] = useState('gemini-2.5-flash');
  const [autoTriage, setAutoTriage] = useState(true);
  const [ambientAudio, setAmbientAudio] = useState(true);
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSave = () => {
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-12">
      {savedBanner && (
        <div className="p-3 rounded-xl bg-[#4edea3]/20 border border-[#4edea3]/40 text-[#4edea3] text-xs font-geist flex items-center gap-2 shadow-lg animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Preferences saved successfully to local workspace store.</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="font-geist text-2xl md:text-3xl font-semibold text-[#e5e2e3]">
          System Settings & AI Preferences
        </h2>
        <p className="text-sm text-[#8c909f] mt-1">
          Configure Chrona Intelligence, workspace layouts, and notification shielding.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-[#161618] border border-[#262626] rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-geist text-base font-semibold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-[#3B82F6]" />
          <span>User Profile</span>
        </h3>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#201f20] border-2 border-[#3B82F6]/50 flex items-center justify-center text-lg font-bold text-[#adc6ff]">
            AR
          </div>
          <div>
            <div className="font-geist font-bold text-white text-base">Alex Rivera</div>
            <div className="text-xs text-[#8c909f]">alex.rivera@workspace.io • Pro Plan Active</div>
            <span className="inline-block mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/30">
              Unlimited AI Command Tokens
            </span>
          </div>
        </div>
      </div>

      {/* Chrona AI Configuration */}
      <div className="bg-[#161618] border border-[#262626] rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-geist text-base font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#3B82F6]" />
          <span>Chrona Intelligence Engine</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-[#8c909f] block mb-1.5 font-geist">AI Intelligence Model</label>
            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-[#262626] text-[#e5e2e3] rounded-lg p-2.5 focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (Ultra Low Latency • Default)</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep Code Reasoning & Complexity Optimization)</option>
              <option value="chrona-local">Chrona Local Edge Model (Air-gapped / Privacy-focused)</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#262626]">
            <div>
              <div className="font-semibold text-[#e5e2e3]">Autonomous Triage & Action Items</div>
              <div className="text-[11px] text-[#8c909f]">
                Automatically parses incoming emails and PRs to suggest next steps.
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoTriage}
              onChange={(e) => setAutoTriage(e.target.checked)}
              className="rounded bg-[#201f20] border-[#424754] text-[#3B82F6] w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#262626]">
            <div>
              <div className="font-semibold text-[#e5e2e3]">Deep Focus Shielding</div>
              <div className="text-[11px] text-[#8c909f]">
                Mute non-urgent notifications during LeetCode/IDE sessions.
              </div>
            </div>
            <input
              type="checkbox"
              checked={ambientAudio}
              onChange={(e) => setAmbientAudio(e.target.checked)}
              className="rounded bg-[#201f20] border-[#424754] text-[#3B82F6] w-4 h-4 cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-geist font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};
