import React, { useState } from 'react';
import { 
  Plus, 
  Sliders, 
  Save, 
  Pin, 
  MoreHorizontal, 
  Play, 
  CloudUpload, 
  BookOpen, 
  Search, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  Code2, 
  Layers, 
  RefreshCw, 
  Copy, 
  Check,
  ChevronDown
} from 'lucide-react';
import { LEETCODE_PROBLEMS, DOC_REFS } from '../data/mockData';
import { LeetCodeProblem, DocRef } from '../types';

interface CodingWorkspaceViewProps {
  onOpenConnectAppModal?: () => void;
}

export const CodingWorkspaceView: React.FC<CodingWorkspaceViewProps> = ({
  onOpenConnectAppModal
}) => {
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const [selectedLang, setSelectedLang] = useState<'python' | 'javascript'>('python');
  const currentProblem: LeetCodeProblem = LEETCODE_PROBLEMS[selectedProblemIndex] || LEETCODE_PROBLEMS[0];

  const [code, setCode] = useState<string>(currentProblem.starterCode[selectedLang]);
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocRef | null>(null);
  
  // Execution & Submission State
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [runResult, setRunResult] = useState<{
    status: 'success' | 'failed' | 'idle';
    output: string;
    passedCount: number;
    totalCount: number;
    runtimeMs: number;
  } | null>(null);
  const [showTerminalDrawer, setShowTerminalDrawer] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [saveSuccessBanner, setSaveSuccessBanner] = useState(false);

  // Update code when problem or language changes
  const handleSelectProblem = (index: number) => {
    setSelectedProblemIndex(index);
    setCode(LEETCODE_PROBLEMS[index].starterCode[selectedLang]);
    setRunResult(null);
    setShowTerminalDrawer(false);
  };

  const handleSelectLanguage = (lang: 'python' | 'javascript') => {
    setSelectedLang(lang);
    setCode(currentProblem.starterCode[lang]);
    setRunResult(null);
  };

  // Run Code logic
  const handleRunCode = () => {
    setIsRunningTests(true);
    setShowTerminalDrawer(true);

    setTimeout(() => {
      setIsRunningTests(false);
      setRunResult({
        status: 'success',
        passedCount: currentProblem.testCases.length,
        totalCount: currentProblem.testCases.length,
        runtimeMs: 42,
        output: `[Chrona Test Engine] Running ${currentProblem.title} test suite (${selectedLang})...\n` +
          currentProblem.testCases.map((tc, idx) => `✔ Case ${idx + 1}: Input: ${tc.input} -> Output: ${tc.expected} [Passed, 1.2ms]`).join('\n') +
          `\n\nAll ${currentProblem.testCases.length} sample test cases passed successfully! Code is ready for submission.`
      });
    }, 600);
  };

  // Submit Code logic
  const handleSubmitCode = () => {
    setIsRunningTests(true);
    setShowTerminalDrawer(true);

    setTimeout(() => {
      setIsRunningTests(false);
      setRunResult({
        status: 'success',
        passedCount: 48,
        totalCount: 48,
        runtimeMs: 38,
        output: `🎉 ACCEPTED (LeetCode Sync Active)\n` +
          `Runtime: 38 ms (Beats 94.2% of Python3 submissions)\n` +
          `Memory Usage: 17.4 MB (Beats 82.1% of Python3 submissions)\n\n` +
          `✨ Chrona AI Auto-Synced with LeetCode & updated your 5-day continuous streak!`
      });
    }, 900);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  const handleSaveLayout = () => {
    setSaveSuccessBanner(true);
    setTimeout(() => setSaveSuccessBanner(false), 2000);
  };

  // Filter docs
  const filteredDocs = DOC_REFS.filter(
    (d) =>
      d.title.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(docSearchQuery.toLowerCase())
  );

  return (
    <div id="coding-workspace-root" className="flex flex-col h-full gap-4 max-w-7xl mx-auto pb-12">
      {/* Toast banner for layout saved */}
      {saveSuccessBanner && (
        <div className="fixed top-16 right-8 z-50 p-3 rounded-xl bg-[#4edea3]/20 border border-[#4edea3]/40 text-[#4edea3] text-xs font-geist flex items-center gap-2 shadow-2xl animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Workspace layout & editor state saved to Chrona Core!</span>
        </div>
      )}

      {/* Workspace Header & Actions */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0 px-1">
        <div>
          <h1 className="font-geist text-2xl md:text-3xl font-semibold text-[#e5e2e3] flex items-center gap-3">
            <span>Coding Workspace</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.8)]" />
          </h1>
          <div className="flex items-center gap-2 mt-1 text-[#8c909f] font-geist text-xs md:text-sm">
            <span className="flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-[#ffb95f]" /> LeetCode
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-[#adc6ff]" /> GitHub Sync
            </span>
            <span>•</span>
            <span className="text-[#4edea3] font-mono text-xs">5-Day Streak</span>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button 
            onClick={onOpenConnectAppModal}
            className="px-3.5 py-2 rounded-lg bg-[#161618] border border-[#262626] text-[#e5e2e3] hover:bg-[#201f20] hover:border-[#3B82F6]/40 transition-colors font-geist text-xs font-medium flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#adc6ff]" />
            <span>Add App</span>
          </button>

          <div className="relative group">
            <select
              value={selectedProblemIndex}
              onChange={(e) => handleSelectProblem(Number(e.target.value))}
              className="appearance-none bg-[#161618] border border-[#262626] text-[#e5e2e3] hover:bg-[#201f20] rounded-lg px-3 py-2 pr-7 text-xs font-geist font-medium focus:outline-none cursor-pointer"
            >
              {LEETCODE_PROBLEMS.map((p, idx) => (
                <option key={p.id} value={idx}>
                  {p.title} ({p.difficulty})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#8c909f] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button 
            onClick={handleSaveLayout}
            className="px-4 py-2 rounded-lg bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-all font-geist text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(59,130,246,0.35)] active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Layout</span>
          </button>
        </div>
      </header>

      {/* Dynamic Workspace 3-Panel Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[560px]">
        {/* Left Panel: Problem Context (LeetCode) - 4 cols on lg */}
        <section 
          id="problem-description-panel"
          className="lg:col-span-4 flex flex-col bg-[#161618] rounded-xl border border-[#262626] overflow-hidden shadow-sm max-h-[680px]"
        >
          {/* Panel Header */}
          <div className="px-4 py-3 border-b border-[#262626] bg-[#0e0e0f]/80 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#FFA116]/20 flex items-center justify-center border border-[#FFA116]/30">
                <span className="text-[#FFA116] font-bold text-[11px] font-mono">&#123; &#125;</span>
              </div>
              <span className="font-geist text-sm font-bold text-[#e5e2e3]">
                {currentProblem.title}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider font-mono ${
                currentProblem.difficulty === 'Easy'
                  ? 'bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/30'
                  : 'bg-[#ffb95f]/10 text-[#ffb95f] border border-[#ffb95f]/30'
              }`}>
                {currentProblem.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[#8c909f]">
              <button className="p-1 hover:text-[#adc6ff] rounded transition-colors" title="Pin Problem">
                <Pin className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 hover:text-white rounded transition-colors">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Panel Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar text-[#c2c6d6] text-xs md:text-sm space-y-4">
            <div>
              <h3 className="text-[#e5e2e3] font-geist text-base font-semibold mb-2">
                Problem Description
              </h3>
              <p className="leading-relaxed whitespace-pre-line text-[#8c909f] font-geist">
                {currentProblem.description}
              </p>
            </div>

            {/* Examples */}
            <div className="space-y-3 pt-2">
              {currentProblem.examples.map((ex, idx) => (
                <div 
                  key={idx}
                  className="bg-[#0A0A0B] p-3 rounded-lg border border-[#262626] font-mono text-xs space-y-1.5"
                >
                  <p className="text-[#e5e2e3] font-bold text-[11px] uppercase tracking-wider font-geist">
                    Example {idx + 1}:
                  </p>
                  <p><span className="text-[#8c909f]">Input:</span> <span className="text-[#adc6ff]">{ex.input}</span></p>
                  <p><span className="text-[#8c909f]">Output:</span> <span className="text-[#4edea3]">{ex.output}</span></p>
                  {ex.explanation && (
                    <p className="text-[#8c909f] text-[11px] pt-1 border-t border-[#262626]">
                      <span className="font-semibold text-[#e5e2e3]">Explanation:</span> {ex.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints & AI Tips */}
            <div className="p-3 rounded-lg bg-[#201f20] border border-[#2a2a2b] space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-[#ffb95f] font-semibold font-geist">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Chrona Insight Constraints</span>
              </div>
              <ul className="list-disc list-inside text-[#8c909f] text-[11px] space-y-0.5">
                <li>Only one valid answer exists.</li>
                <li>Optimal time target: <strong>{currentProblem.complexity.time}</strong></li>
                <li>Space target: <strong>{currentProblem.complexity.space}</strong></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Center Panel: Code Editor / Working Area - 5 cols on lg */}
        <section 
          id="editor-working-panel"
          className="lg:col-span-5 flex flex-col bg-[#161618] rounded-xl border border-[#262626] overflow-hidden ai-border-pulse relative shadow-sm max-h-[680px]"
        >
          {/* Editor Header */}
          <div className="px-4 py-2.5 border-b border-[#262626] bg-[#0e0e0f]/80 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#3B82F6]" />
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleSelectLanguage('python')}
                  className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
                    selectedLang === 'python' ? 'bg-[#201f20] text-[#adc6ff] font-bold' : 'text-[#8c909f] hover:text-white'
                  }`}
                >
                  solution.py
                </button>
                <button
                  onClick={() => handleSelectLanguage('javascript')}
                  className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
                    selectedLang === 'javascript' ? 'bg-[#201f20] text-[#adc6ff] font-bold' : 'text-[#8c909f] hover:text-white'
                  }`}
                >
                  solution.js
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1 ml-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                <span className="text-[10px] text-[#adc6ff] font-geist">AI Sync Active</span>
              </div>
            </div>

            {/* Run & Submit controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="p-1 text-[#8c909f] hover:text-white rounded transition-colors"
                title="Copy code"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-[#4edea3]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                id="run-code-btn"
                onClick={handleRunCode}
                disabled={isRunningTests}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#201f20] hover:bg-[#2a2a2b] rounded-md border border-[#262626] text-xs font-geist text-[#e5e2e3] transition-colors"
              >
                <Play className="w-3 h-3 fill-current text-[#4edea3]" />
                <span>Run</span>
              </button>

              <button
                id="submit-code-btn"
                onClick={handleSubmitCode}
                disabled={isRunningTests}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 text-[#adc6ff] rounded-md border border-[#3B82F6]/40 text-xs font-geist font-semibold transition-colors"
              >
                <CloudUpload className="w-3.5 h-3.5" />
                <span>Submit</span>
              </button>
            </div>
          </div>

          {/* Interactive Code Editor Area */}
          <div className="flex-1 bg-[#0A0A0B] p-4 font-mono-code text-xs md:text-sm text-[#e5e2e3] relative group overflow-y-auto custom-scrollbar flex flex-col">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full flex-1 min-h-[300px] bg-transparent border-none outline-none text-[#e5e2e3] font-mono-code text-xs md:text-sm leading-relaxed resize-none focus:ring-0 p-0 selection:bg-[#3B82F6]/40"
            />

            {/* AI Suggestion Highlight Callout (matches mockup) */}
            <div className="mt-2 p-2.5 rounded-lg bg-[#3B82F6]/10 border-l-2 border-[#3B82F6] border-y border-r border-[#3B82F6]/20 font-geist text-xs text-[#adc6ff] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>AI Suggestion: Hash map lookups achieve <strong>O(1)</strong> lookup time.</span>
              </div>
              <button
                onClick={() => setCode(currentProblem.solutionCode[selectedLang])}
                className="text-[10px] text-[#4edea3] hover:underline font-bold"
              >
                Auto-Complete
              </button>
            </div>

            {/* AI Ghost Text / Inline Assist (Bottom Right) */}
            <div className="mt-3 bg-[#161618]/90 backdrop-blur border border-[#3B82F6]/30 p-3 rounded-lg shadow-lg flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-[#e5e2e3] font-geist">
                  Time complexity: <strong className="text-[#4edea3]">{currentProblem.complexity.time}</strong> • Space:{' '}
                  <strong className="text-[#ffb95f]">{currentProblem.complexity.space}</strong>
                </p>
                <p className="text-[11px] text-[#8c909f] leading-snug font-geist mt-0.5">
                  {currentProblem.complexity.explanation}
                </p>
              </div>
            </div>
          </div>

          {/* Test Runner Output Drawer */}
          {showTerminalDrawer && (
            <div className="border-t border-[#262626] bg-[#0e0e0f] p-3 text-xs font-mono max-h-44 overflow-y-auto custom-scrollbar animate-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#262626] text-[#8c909f]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#adc6ff]" />
                  <span>Execution Output</span>
                </div>
                <button 
                  onClick={() => setShowTerminalDrawer(false)}
                  className="text-[10px] hover:text-white text-[#8c909f]"
                >
                  ✕ Close
                </button>
              </div>

              {isRunningTests ? (
                <div className="flex items-center gap-2 text-[#adc6ff] py-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Evaluating test vectors in sandboxed worker...</span>
                </div>
              ) : runResult ? (
                <div className="space-y-1 whitespace-pre-line text-[#e5e2e3]">
                  <div className="text-[#4edea3] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{runResult.passedCount}/{runResult.totalCount} Test Cases Passed ({runResult.runtimeMs}ms)</span>
                  </div>
                  <p className="text-[#8c909f] text-[11px]">{runResult.output}</p>
                </div>
              ) : null}
            </div>
          )}
        </section>

        {/* Right Panel: Documentation (Docs & Ref) - 3 cols on lg */}
        <section 
          id="docs-reference-panel"
          className="lg:col-span-3 flex flex-col bg-[#161618] rounded-xl border border-[#262626] overflow-hidden shadow-sm max-h-[680px]"
        >
          {/* Panel Header */}
          <div className="px-4 py-3 border-b border-[#262626] bg-[#0e0e0f]/80 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8c909f]" />
              <span className="font-geist text-sm font-bold text-[#e5e2e3]">
                Docs & Ref
              </span>
            </div>
            <button 
              onClick={() => window.open('https://docs.python.org/3/', '_blank')}
              className="text-[#8c909f] hover:text-[#adc6ff] transition-colors p-1"
              title="Open Official Docs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search within docs */}
          <div className="p-3 border-b border-[#262626]">
            <div className="bg-[#0A0A0B] rounded-lg border border-[#262626] flex items-center px-2.5 py-1.5 focus-within:border-[#3B82F6]/50">
              <Search className="w-3.5 h-3.5 text-[#8c909f] mr-2" />
              <input
                type="text"
                value={docSearchQuery}
                onChange={(e) => setDocSearchQuery(e.target.value)}
                placeholder="Search Python docs..."
                className="bg-transparent border-none text-xs w-full focus:ring-0 p-0 text-[#e5e2e3] placeholder:text-[#8c909f]"
              />
              {docSearchQuery && (
                <button onClick={() => setDocSearchQuery('')} className="text-[10px] text-[#8c909f] hover:text-white">
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Doc List */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2.5 custom-scrollbar">
            {filteredDocs.map((doc) => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(isSelected ? null : doc)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#201f20] border-[#3B82F6]/60 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                      : 'bg-[#131314] border-[#262626] hover:bg-[#201f20] hover:border-[#424754]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-mono font-bold text-[#adc6ff] flex items-center gap-1.5">
                      <Code2 className="w-3 h-3 text-[#3B82F6]" />
                      {doc.title}
                    </h4>
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-[#2a2a2b] text-[#8c909f]">
                      {doc.category}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#8c909f] line-clamp-2 leading-tight font-geist">
                    {doc.description}
                  </p>

                  {/* Expanded Example view */}
                  {isSelected && (
                    <div className="mt-2 pt-2 border-t border-[#2a2a2b] space-y-1 animate-in fade-in">
                      <div className="text-[10px] text-[#8c909f] font-mono">Syntax: {doc.syntax}</div>
                      <div className="bg-[#0A0A0B] p-1.5 rounded font-mono text-[11px] text-[#4edea3]">
                        {doc.example}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCode((prev) => prev + `\n# Inserted from docs\n${doc.example}\n`);
                        }}
                        className="text-[10px] text-[#3B82F6] hover:underline font-geist font-semibold"
                      >
                        + Insert into editor
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
