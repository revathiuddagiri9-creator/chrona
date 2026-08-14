import React, { useEffect, useState } from 'react';
import { Search, Sparkles, Command } from 'lucide-react';

interface CommandBarProps {
  onOpenAiCommand: (initialQuery?: string) => void;
  placeholder?: string;
}

export const CommandBar: React.FC<CommandBarProps> = ({
  onOpenAiCommand,
  placeholder = 'Search apps, tasks, or ask Chrona...'
}) => {
  const [query, setQuery] = useState('');
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenAiCommand(query);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full px-4 md:px-10 py-3 backdrop-blur-md bg-[#0A0A0B]/80 border-b border-[#262626]/40">
      <div className="max-w-[640px] mx-auto">
        <div 
          id="universal-command-bar"
          onClick={() => onOpenAiCommand()}
          className="rounded-xl bg-[#1c1b1c]/90 backdrop-blur-xl border border-[#2a2a2b] shadow-lg flex items-center px-4 py-2 hover:border-[#3B82F6]/50 focus-within:ring-1 focus-within:ring-[#3B82F6]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 mr-3 text-[#8c909f] group-hover:text-[#adc6ff] transition-colors">
            <Search className="w-4 h-4" />
          </div>

          <input
            id="command-bar-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none outline-none text-[#e5e2e3] placeholder:text-[#8c909f] placeholder:text-sm text-sm focus:ring-0 focus:outline-none p-0"
          />

          <div className="flex items-center gap-2 ml-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenAiCommand(query);
              }}
              className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#2a2a2b] hover:bg-[#353436] text-[#c2c6d6] text-xs font-mono border border-[#424754]/60 transition-colors"
            >
              <Command className="w-3 h-3 text-[#adc6ff]" />
              <span>K</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenAiCommand();
              }}
              className="p-1 rounded-md text-[#3B82F6] hover:bg-[#3B82F6]/20 transition-colors"
              title="Chrona AI Intelligence"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
