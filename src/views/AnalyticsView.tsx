import React from 'react';
import { 
  BarChart3, 
  TrendingDown, 
  Flame, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { AI_INSIGHTS } from '../data/mockData';

export const AnalyticsView: React.FC = () => {
  const metrics = [
    {
      title: 'Context Switches Saved',
      value: '62%',
      subtext: '37 down to 14 switches/day',
      trend: '+18% vs last week',
      icon: TrendingDown,
      color: 'text-[#4edea3]'
    },
    {
      title: 'Active Coding Streak',
      value: '5 Days',
      subtext: 'Next milestone: 7 days',
      trend: 'Top 5% consistency',
      icon: Flame,
      color: 'text-[#ffb95f]'
    },
    {
      title: 'Deep Work Time',
      value: '3.4 hrs',
      subtext: 'Goal: 4.0 hrs/day',
      trend: '+88% increase',
      icon: Clock,
      color: 'text-[#adc6ff]'
    },
    {
      title: 'AI Drafts & Summaries',
      value: '28 Actions',
      subtext: 'Zero manual context lost',
      trend: 'Saved ~45 mins today',
      icon: Sparkles,
      color: 'text-[#3B82F6]'
    }
  ];

  const appDistribution = [
    { name: 'VS Code & LeetCode Sandbox', time: '1h 45m', percent: 45, color: 'bg-[#3B82F6]' },
    { name: 'GitHub Review & PRs', time: '45m', percent: 20, color: 'bg-[#4edea3]' },
    { name: 'Notion Knowledge Base', time: '35m', percent: 15, color: 'bg-[#ffb95f]' },
    { name: 'Gmail & Communication', time: '25m', percent: 12, color: 'bg-[#ffb4ab]' },
    { name: 'Figma Dev Mode', time: '20m', percent: 8, color: 'bg-[#adc6ff]' }
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="font-geist text-2xl md:text-3xl font-semibold text-[#e5e2e3]">
          Productivity & Focus Analytics
        </h2>
        <p className="text-sm text-[#8c909f] mt-1">
          Measurable telemetry on reduced context switching and flow state longevity.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-[#161618] border border-[#262626] rounded-xl p-4 flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#8c909f] font-geist">{m.title}</span>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold font-geist text-white tracking-tight mb-0.5">
                  {m.value}
                </div>
                <div className="text-[11px] text-[#8c909f]">{m.subtext}</div>
              </div>
              <div className="mt-3 pt-2 border-t border-[#262626] text-[11px] text-[#4edea3] font-mono flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{m.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Telemetry Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* App Distribution */}
        <div className="bg-[#161618] border border-[#262626] rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-geist text-base font-semibold text-white">
            Daily Focus Distribution
          </h3>

          <div className="space-y-3">
            {appDistribution.map((app, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-geist">
                  <span className="text-[#e5e2e3]">{app.name}</span>
                  <span className="text-[#8c909f] font-mono">{app.time} ({app.percent}%)</span>
                </div>
                <div className="h-2 w-full bg-[#201f20] rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${app.color} rounded-full transition-all duration-500`}
                    style={{ width: `${app.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Efficiency Insights */}
        <div className="bg-[#161618] border border-[#262626] rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-geist text-base font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
            <span>AI Automated Optimization</span>
          </h3>

          <div className="space-y-3">
            {AI_INSIGHTS.map((insight) => (
              <div key={insight.id} className="p-3 bg-[#0A0A0B] border border-[#262626] rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-geist text-xs font-bold text-[#adc6ff]">
                    {insight.title}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#3B82F6]/20 text-[#adc6ff] text-[10px] font-mono font-bold">
                    {insight.highlight}
                  </span>
                </div>
                <p className="text-xs text-[#8c909f] leading-relaxed">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
