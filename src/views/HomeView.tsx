import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  Calendar, 
  Terminal, 
  ListTodo, 
  CheckCircle2, 
  Circle, 
  ArrowUpRight, 
  Plus, 
  Code2, 
  PenTool, 
  Mail, 
  Clock, 
  Flame, 
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { TabType, PriorityTask } from '../types';

interface HomeViewProps {
  onSelectTab: (tab: TabType) => void;
  onOpenFocusModal: () => void;
  onOpenConnectAppModal: () => void;
  tasks: PriorityTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string, category?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onOpenFocusModal,
  onOpenConnectAppModal,
  tasks,
  onToggleTask,
  onAddTask
}) => {
  const [newTaskInput, setNewTaskInput] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskInput.trim()) {
      onAddTask(newTaskInput.trim(), 'General');
      setNewTaskInput('');
      setIsAddingTask(false);
    }
  };

  const recentWorkspaces = [
    {
      id: 'ws-vscode',
      name: 'VS Code',
      icon: Code2,
      color: 'text-[#4edea3]',
      target: 'coding' as TabType,
      desc: 'Algorithm sandbox'
    },
    {
      id: 'ws-figma',
      name: 'Figma',
      icon: PenTool,
      color: 'text-[#f24e1e]',
      target: 'apps' as TabType,
      desc: 'Chrona Design System'
    },
    {
      id: 'ws-superhuman',
      name: 'Superhuman',
      icon: Mail,
      color: 'text-[#adc6ff]',
      target: 'apps' as TabType,
      desc: '3 Unread Priority'
    },
    {
      id: 'ws-cron',
      name: 'Cron / Calendar',
      icon: Calendar,
      color: 'text-[#ffb95f]',
      target: 'apps' as TabType,
      desc: 'Next sync at 3:00 PM'
    }
  ];

  return (
    <div id="home-view-container" className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-8 pb-12">
      {/* Greeting Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#e5e2e3] font-geist flex items-center gap-2">
          {getGreeting()}, Alex 👋
        </h1>
        <p className="text-sm md:text-base text-[#8c909f]">
          Your digital workspace is ready.
        </p>
      </header>

      {/* AI Focus Card (Hero Pattern) */}
      <section 
        id="chrona-insight-hero-card"
        className="bg-[#161618] rounded-xl p-5 md:p-6 border border-[#262626] ai-border-pulse relative overflow-hidden group shadow-lg"
      >
        {/* Ambient background light */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#3B82F6]/15 rounded-full blur-3xl group-hover:bg-[#3B82F6]/25 transition-all duration-700 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 text-[#3B82F6]">
              <Sparkles className="w-4 h-4 text-[#3B82F6] animate-pulse" />
              <span className="font-geist text-xs uppercase tracking-widest font-bold text-[#adc6ff]">
                Chrona Insight
              </span>
            </div>

            <p className="text-base md:text-lg text-[#e5e2e3] max-w-2xl leading-relaxed font-geist">
              You have a <strong className="text-white font-semibold">LeetCode task due today</strong> and{' '}
              <strong className="text-white font-semibold">3 important emails</strong> waiting. I recommend starting with your coding workspace to maintain your 5-day streak.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <button
              id="start-focus-session-btn"
              onClick={onOpenFocusModal}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2.5 rounded-lg font-geist text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.35)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Focus Session
            </button>

            <button
              id="view-coding-schedule-btn"
              onClick={() => onSelectTab('coding')}
              className="bg-[#222224] hover:bg-[#2a2a2b] border border-[#262626] hover:border-[#424754] text-[#e5e2e3] px-4 py-2.5 rounded-lg font-geist text-sm font-medium transition-all flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4 text-[#adc6ff]" />
              Open Coding Workspace
            </button>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout for Dashboard Data */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current Focus (Bento Large - 8 columns) */}
        <section 
          id="current-focus-card"
          className="lg:col-span-8 bg-[#161618] rounded-xl p-5 border border-[#262626] flex flex-col relative overflow-hidden shadow-sm"
        >
          <div className="flex justify-between items-center mb-4 z-10 relative">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#4edea3]/10 text-[#4edea3]">
                <Terminal className="w-4 h-4" />
              </div>
              <h2 className="font-geist text-lg font-semibold text-[#e5e2e3]">
                Current Focus: Coding
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-[#4edea3] font-mono">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4edea3]" />
                </span>
                Active Session
              </span>

              <button
                onClick={() => onSelectTab('coding')}
                className="text-xs text-[#adc6ff] hover:underline flex items-center gap-1 font-geist"
              >
                <span>Launch IDE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Code Snippet Mockup Area */}
          <div 
            onClick={() => onSelectTab('coding')}
            className="flex-1 bg-[#0A0A0B] border border-[#262626] hover:border-[#3B82F6]/50 rounded-lg p-4 font-mono-code text-xs md:text-sm text-[#8c909f] relative z-10 overflow-hidden cursor-pointer group transition-all"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between mb-3 border-b border-[#262626] pb-2.5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffb95f]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#4edea3]/80" />
              </div>
              <span className="text-[11px] text-[#8c909f] font-mono">solution.py • Two Sum</span>
              <span className="text-[10px] text-[#adc6ff] bg-[#3B82F6]/10 px-1.5 py-0.5 rounded border border-[#3B82F6]/20 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to edit
              </span>
            </div>

            {/* Code lines */}
            <pre className="text-xs md:text-sm leading-relaxed overflow-x-auto custom-scrollbar">
              <code>
                <span className="text-[#adc6ff]">function</span> <span className="text-[#4edea3]">solveTwoSum</span>(nums, target) &#123;{'\n'}
                {'  '}<span className="text-[#adc6ff]">const</span> map = <span className="text-[#adc6ff]">new</span> <span className="text-[#ffb95f]">Map</span>();{'\n'}
                {'  '}<span className="text-[#adc6ff]">for</span> (<span className="text-[#adc6ff]">let</span> i = 0; i &lt; nums.length; i++) &#123;{'\n'}
                {'    '}<span className="text-[#adc6ff]">const</span> complement = target - nums[i];{'\n'}
                {'    '}<span className="text-[#adc6ff]">if</span> (map.<span className="text-[#ffb95f]">has</span>(complement)) &#123;{'\n'}
                {'      '}<span className="text-[#adc6ff]">return</span> [map.<span className="text-[#4edea3]">get</span>(complement), i];{'\n'}
                {'    '}&#125;{'\n'}
                {'    '}<span className="text-[#8c909f]">// Processing algorithm with O(1) hash map lookup...</span>{'\n'}
                {'    '}map.<span className="text-[#ffb95f]">set</span>(nums[i], i);{'\n'}
                {'  '}&#125;{'\n'}
                &#125;
              </code>
            </pre>
          </div>
        </section>

        {/* Today's Priorities (Bento Small - 4 columns) */}
        <section 
          id="priorities-card"
          className="lg:col-span-4 bg-[#161618] rounded-xl p-5 border border-[#262626] flex flex-col shadow-sm"
        >
          <div className="flex justify-between items-center mb-4 border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#ffb95f]/10 text-[#ffb95f]">
                <ListTodo className="w-4 h-4" />
              </div>
              <h2 className="font-geist text-lg font-semibold text-[#e5e2e3]">
                Priorities
              </h2>
            </div>
            <span className="font-geist text-xs text-[#8c909f] bg-[#222224] px-2 py-0.5 rounded border border-[#2a2a2b]">
              {tasks.filter((t) => !t.completed).length} items
            </span>
          </div>

          {/* Task list items */}
          <ul className="space-y-2 flex-1 overflow-y-auto max-h-[220px] custom-scrollbar pr-1">
            {tasks.map((task) => (
              <li
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`flex items-start gap-3 p-2.5 rounded-lg transition-all border cursor-pointer group ${
                  task.completed
                    ? 'bg-[#131314]/50 border-transparent opacity-60'
                    : 'bg-[#131314] hover:bg-[#201f20] border-[#262626] hover:border-[#3B82F6]/30'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-[#8c909f] group-hover:text-[#adc6ff] transition-colors"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#8c909f] group-hover:border-[#3B82F6]" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className={`font-geist text-xs font-semibold text-[#e5e2e3] truncate ${
                    task.completed ? 'line-through text-[#8c909f]' : ''
                  }`}>
                    {task.title}
                  </div>
                  <div className={`text-[11px] font-geist mt-0.5 flex items-center gap-1.5 ${
                    task.isUrgent && !task.completed ? 'text-[#ffb4ab]' : 'text-[#8c909f]'
                  }`}>
                    {task.isUrgent && <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]" />}
                    {task.dueText}
                  </div>
                </div>

                {task.workspaceLink && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTab(task.workspaceLink!);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-[#adc6ff] hover:bg-[#3B82F6]/20 rounded transition-opacity"
                    title="Jump to workspace"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Quick Add Task */}
          <div className="mt-3 pt-3 border-t border-[#262626]">
            {isAddingTask ? (
              <form onSubmit={handleCreateTask} className="flex gap-2">
                <input
                  type="text"
                  autoFocus
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  placeholder="New priority task..."
                  className="flex-1 bg-[#0A0A0B] border border-[#3B82F6] rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded-lg bg-[#3B82F6] text-white text-xs font-bold font-geist"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="px-2 py-1 rounded-lg bg-[#201f20] text-[#8c909f] text-xs"
                >
                  ✕
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingTask(true)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-dashed border-[#262626] hover:border-[#424754] text-[#8c909f] hover:text-[#e5e2e3] text-xs font-geist transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Quick Priority</span>
              </button>
            )}
          </div>
        </section>
      </div>

      {/* Recently Used Apps / Workspaces Carousel */}
      <section className="mt-2">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-geist text-xs font-semibold text-[#8c909f] uppercase tracking-wider">
            Recent Workspaces
          </h3>
          <button 
            onClick={() => onSelectTab('workspaces')}
            className="text-xs text-[#adc6ff] hover:underline flex items-center gap-1 font-geist"
          >
            <span>View All</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar snap-x">
          {recentWorkspaces.map((ws) => {
            const Icon = ws.icon;
            return (
              <div
                key={ws.id}
                onClick={() => onSelectTab(ws.target)}
                className="min-w-[150px] md:min-w-[170px] bg-[#161618] border border-[#262626] hover:border-[#3B82F6]/50 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#201f20] transition-all cursor-pointer snap-start group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#201f20] group-hover:bg-[#2a2a2b] flex items-center justify-center transition-colors border border-[#262626]">
                  <Icon className={`w-6 h-6 ${ws.color} group-hover:scale-110 transition-transform`} />
                </div>
                <span className="font-geist text-sm font-semibold text-[#e5e2e3] group-hover:text-white">
                  {ws.name}
                </span>
                <span className="text-[11px] text-[#8c909f] text-center truncate max-w-[130px]">
                  {ws.desc}
                </span>
              </div>
            );
          })}

          {/* Connect New Workspace card */}
          <div
            onClick={onOpenConnectAppModal}
            className="min-w-[150px] md:min-w-[170px] bg-transparent border border-dashed border-[#262626] hover:border-[#adc6ff] rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#161618]/40 transition-all cursor-pointer snap-start text-[#8c909f] hover:text-[#adc6ff] group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#161618] group-hover:bg-[#201f20] flex items-center justify-center transition-colors border border-[#262626]">
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-geist text-sm font-semibold">Connect</span>
            <span className="text-[11px] text-[#8c909f]">New integration</span>
          </div>
        </div>
      </section>
    </div>
  );
};
