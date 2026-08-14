import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Mail, 
  Columns2, 
  PlayCircle, 
  TrendingDown, 
  ArrowRight, 
  CornerDownLeft, 
  X, 
  Search,
  Bot,
  Zap,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { AiCommand, TabType } from '../types';

interface ChronaAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabType) => void;
  initialQuery?: string;
  onExecuteAction?: (actionName: string) => void;
}

export const ChronaAiModal: React.FC<ChronaAiModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  initialQuery = '',
  onExecuteAction
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [executedFeedback, setExecutedFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultCommands: AiCommand[] = [
    {
      id: 'cmd-1',
      title: 'Open my coding workspace',
      description: 'Launches VS Code, Terminal, and localhost',
      icon: 'terminal',
      targetTab: 'coding',
      action: 'open_coding'
    },
    {
      id: 'cmd-2',
      title: 'Show important emails',
      description: 'Filters inbox for high-priority senders',
      icon: 'mail',
      targetTab: 'apps',
      action: 'filter_emails'
    },
    {
      id: 'cmd-3',
      title: 'Open GitHub and LeetCode together',
      description: 'Arranges windows in split-view layout',
      icon: 'splitscreen',
      targetTab: 'coding',
      action: 'split_layout'
    },
    {
      id: 'cmd-4',
      title: 'Start 25-min Deep Focus Session',
      description: 'Mutes notifications and activates Pomodoro mode',
      icon: 'play',
      targetTab: 'home',
      action: 'start_focus'
    }
  ];

  // Filter commands based on search
  const filteredCommands = query.trim()
    ? defaultCommands.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
    : defaultCommands;

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setAiResponse(null);
      setExecutedFeedback(null);
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands.length > 0 && selectedIndex >= 0 && selectedIndex < filteredCommands.length) {
          executeCommand(filteredCommands[selectedIndex]);
        } else if (query.trim()) {
          askChronaIntelligence(query);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, query]);

  const executeCommand = (cmd: AiCommand) => {
    setExecutedFeedback(`Executing: "${cmd.title}"...`);
    setTimeout(() => {
      if (cmd.targetTab) {
        onSelectTab(cmd.targetTab);
      }
      if (cmd.action && onExecuteAction) {
        onExecuteAction(cmd.action);
      }
      onClose();
    }, 400);
  };

  const askChronaIntelligence = async (promptText: string) => {
    setIsLoadingAi(true);
    setAiResponse(null);

    // Call server AI endpoint or generate smart local response
    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      });

      if (res.ok) {
        const data = await res.json();
        setAiResponse(data.reply || data.text);
      } else {
        throw new Error('Fallback response');
      }
    } catch {
      // Intelligent built-in response based on query
      const lower = promptText.toLowerCase();
      let fallbackText = '';

      if (lower.includes('two sum') || lower.includes('leetcode') || lower.includes('code')) {
        fallbackText = `💡 **Chrona Optimization for Two Sum:**\nYour current Python solution uses a hash map (\`seen = {}\`) for O(n) time and O(n) space complexity. We noticed you haven't submitted your solution yet to maintain your 5-day streak. Click 'Open my coding workspace' to complete it!`;
      } else if (lower.includes('email') || lower.includes('gmail') || lower.includes('inbox')) {
        fallbackText = `📬 **Chrona Email Triage:**\nYou have 3 high-priority unread emails from Sarah Chen (Design Spec Review), Devin AI Bot (PR #248 approved), and Stripe Billing. Would you like me to draft quick responses?`;
      } else if (lower.includes('focus') || lower.includes('schedule') || lower.includes('pomodoro')) {
        fallbackText = `⏱️ **Focus Intelligence:**\nAlex, you have an open 90-minute block before your 3:00 PM Product Sync. I have pre-configured a 25-minute deep focus session with muted Slack notifications.`;
      } else {
        fallbackText = `✨ **Chrona Intelligence Response:**\nI analyzed your active workspace. You have 4 connected integrations (Gmail, GitHub, Notion, Google Calendar) actively syncing. All systems are operational with 0 pending sync errors.`;
      }

      setAiResponse(fallbackText);
    } finally {
      setIsLoadingAi(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      id="chrona-ai-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2563EB]/25 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Command Center Card */}
      <div
        id="chrona-ai-command-center"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[680px] bg-[#161618]/95 backdrop-blur-2xl border border-[#2a2a2b] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50 relative ai-glow animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header / Input Area */}
        <header className="p-6 border-b border-[#262626] relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-[#adc6ff]">
              <Sparkles className="w-4 h-4 text-[#3B82F6] animate-pulse" />
              <span className="font-geist text-xs font-semibold uppercase tracking-widest text-[#adc6ff]">
                Chrona Intelligence
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#8c909f] hover:text-white hover:bg-[#2a2a2b] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative flex items-center mt-1">
            <input
              ref={inputRef}
              id="ai-command-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want to do?"
              className="w-full bg-transparent border-none text-[#e5e2e3] font-geist text-xl placeholder:text-[#8c909f] focus:ring-0 focus:outline-none p-0 pr-24"
            />
            <div className="absolute right-0 flex items-center gap-1.5 text-[#8c909f] text-xs font-mono">
              <kbd className="px-2 py-0.5 rounded bg-[#201f20] border border-[#424754] text-[#adc6ff]">
                ↵
              </kbd>
              <span className="text-[11px] text-[#8c909f]">to execute</span>
            </div>
          </div>

          {/* Active indicator line */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#adc6ff] to-transparent w-2/5" />
        </header>

        {/* Content Area */}
        <div className="p-6 flex flex-col gap-6 max-h-[480px] overflow-y-auto custom-scrollbar">
          {/* Execution feedback toast */}
          {executedFeedback && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] text-sm animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>{executedFeedback}</span>
            </div>
          )}

          {/* AI Custom Answer View if generated */}
          {isLoadingAi && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#201f20] border border-[#3B82F6]/30 text-sm text-[#adc6ff]">
              <Loader2 className="w-5 h-5 animate-spin text-[#3B82F6]" />
              <span>Chrona Intelligence is synthesizing your request...</span>
            </div>
          )}

          {aiResponse && !isLoadingAi && (
            <div className="p-4 rounded-xl bg-[#1c1b1c] border border-[#3B82F6]/40 shadow-inner flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#adc6ff]">
                <Bot className="w-4 h-4 text-[#3B82F6]" />
                <span>AI Workspace Summary</span>
              </div>
              <p className="text-sm text-[#e5e2e3] whitespace-pre-line leading-relaxed font-geist">
                {aiResponse}
              </p>
            </div>
          )}

          {/* Suggested Commands Section */}
          <section>
            <h3 className="font-geist text-xs font-semibold text-[#8c909f] mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#ffb95f]" />
              Suggested Commands
            </h3>

            <div className="flex flex-col gap-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      id={`suggested-cmd-${cmd.id}`}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center gap-3.5 p-3 rounded-xl border text-left w-full transition-all group relative overflow-hidden ${
                        isSelected
                          ? 'bg-[#201f20] border-[#3B82F6]/60 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                          : 'bg-[#131314] border-[#262626] hover:bg-[#201f20] hover:border-[#3B82F6]/40'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors z-10 ${
                        isSelected ? 'bg-[#3B82F6]/20 text-[#adc6ff]' : 'bg-[#201f20] text-[#8c909f] group-hover:text-[#adc6ff]'
                      }`}>
                        {cmd.icon === 'terminal' && <Terminal className="w-4 h-4" />}
                        {cmd.icon === 'mail' && <Mail className="w-4 h-4" />}
                        {cmd.icon === 'splitscreen' && <Columns2 className="w-4 h-4" />}
                        {cmd.icon === 'play' && <PlayCircle className="w-4 h-4" />}
                      </div>

                      <div className="flex-1 z-10">
                        <div className={`text-sm font-semibold transition-colors ${
                          isSelected ? 'text-white' : 'text-[#e5e2e3] group-hover:text-white'
                        }`}>
                          {cmd.title}
                        </div>
                        <div className="text-xs text-[#8c909f]">
                          {cmd.description}
                        </div>
                      </div>

                      <div className={`z-10 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <ArrowRight className="w-4 h-4 text-[#3B82F6]" />
                      </div>

                      {/* Hover highlight background */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-[#3B82F6]/10 to-transparent transition-opacity ${
                        isSelected ? 'opacity-100' : 'opacity-0'
                      }`} />
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-4 text-xs text-[#8c909f]">
                  No exact command match. Press <kbd className="px-1.5 py-0.5 rounded bg-[#201f20] text-[#adc6ff]">Enter</kbd> to ask Chrona AI.
                </div>
              )}
            </div>
          </section>

          {/* Recent AI Insights Section */}
          <section>
            <h3 className="font-geist text-xs font-semibold text-[#8c909f] mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-[#3B82F6]" />
              Recent AI Insights
            </h3>

            <div className="p-3.5 rounded-xl bg-[#1c1b1c] border border-[#3B82F6]/30 ai-border-pulse relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#3B82F6]/20 rounded-full blur-[40px]" />
              <div className="relative z-10 flex items-start gap-3">
                <div className="mt-0.5 p-2 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm text-[#e5e2e3] mb-0.5 font-medium">
                    Apps switched today:{' '}
                    <span className="text-[#8c909f] line-through mr-1">37</span>
                    <span className="ai-text-gradient font-bold text-base">14</span>
                  </div>
                  <div className="text-xs text-[#c2c6d6]">
                    CHRONA reduced unnecessary app switching by{' '}
                    <span className="text-[#4edea3] font-bold">62%</span>.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="px-6 py-3 border-t border-[#262626] flex justify-between items-center bg-[#0e0e0f]/80 text-xs text-[#8c909f]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <kbd className="px-1.5 py-0.5 rounded bg-[#201f20] border border-[#424754]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-[#201f20] border border-[#424754]">↓</kbd>
              <span className="ml-1 text-[#8c909f]">Navigate</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <kbd className="px-1.5 py-0.5 rounded bg-[#201f20] border border-[#424754]">Esc</kbd>
              <span className="ml-1 text-[#8c909f]">Close</span>
            </div>
          </div>
          <div className="font-geist text-[11px] text-[#8c909f]">
            Chrona Core v2.4
          </div>
        </footer>
      </div>
    </div>
  );
};
