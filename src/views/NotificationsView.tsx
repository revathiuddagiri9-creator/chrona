import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Sparkles, 
  Mail, 
  Code2, 
  MessageSquare, 
  Calendar, 
  Trash2,
  ExternalLink
} from 'lucide-react';
import { TabType } from '../types';

interface NotificationsViewProps {
  onSelectTab: (tab: TabType) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ onSelectTab }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 'n-1',
      title: 'LeetCode Streak Warning',
      body: 'Your 5-day coding streak is pending today. Two Sum problem is scheduled for completion.',
      time: '15 mins ago',
      type: 'coding',
      icon: Code2,
      unread: true,
      actionTab: 'coding' as TabType
    },
    {
      id: 'n-2',
      title: 'PR #248 Approved by Devin AI',
      body: 'GitHub integration synced: "Refactor auth token encryption" passed all CI tests.',
      time: '1 hour ago',
      type: 'github',
      icon: Code2,
      unread: true,
      actionTab: 'coding' as TabType
    },
    {
      id: 'n-3',
      title: 'Gmail Action Items Extracted',
      body: 'Sarah Chen: "Please review the revised Chrona mobile wireframes before 3 PM".',
      time: '2 hours ago',
      type: 'mail',
      icon: Mail,
      unread: false,
      actionTab: 'apps' as TabType
    },
    {
      id: 'n-4',
      title: 'Calendar Focus Block Protected',
      body: 'Chrona automatically rescheduled your lunch check-in to preserve a 90-min deep work block.',
      time: '3 hours ago',
      type: 'calendar',
      icon: Calendar,
      unread: false,
      actionTab: 'home' as TabType
    }
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b border-[#262626]">
        <div>
          <h2 className="font-geist text-2xl md:text-3xl font-semibold text-[#e5e2e3]">
            Notifications & Triage
          </h2>
          <p className="text-sm text-[#8c909f] mt-1">
            Real-time cross-app event stream powered by Chrona AI Intelligence.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161618] hover:bg-[#201f20] border border-[#262626] text-xs font-geist text-[#adc6ff] transition-colors"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark all read</span>
        </button>
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                  n.unread
                    ? 'bg-[#161618] border-[#3B82F6]/40 shadow-sm'
                    : 'bg-[#131314]/80 border-[#262626] opacity-75'
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                    n.unread ? 'bg-[#3B82F6]/20 text-[#adc6ff]' : 'bg-[#201f20] text-[#8c909f]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-geist text-sm font-semibold text-white">
                        {n.title}
                      </h4>
                      {n.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                      )}
                    </div>
                    <p className="text-xs text-[#c2c6d6] leading-relaxed font-geist">
                      {n.body}
                    </p>
                    <span className="text-[11px] text-[#8c909f] font-mono mt-1.5 block">
                      {n.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onSelectTab(n.actionTab)}
                    className="px-2.5 py-1 rounded bg-[#201f20] hover:bg-[#2a2a2b] text-xs text-[#adc6ff] font-geist flex items-center gap-1 transition-colors"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => removeNotification(n.id)}
                    className="p-1 text-[#8c909f] hover:text-[#ffb4ab] rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-[#161618] rounded-xl border border-[#262626] text-[#8c909f] text-sm">
            All caught up! No active notifications.
          </div>
        )}
      </div>
    </div>
  );
};
