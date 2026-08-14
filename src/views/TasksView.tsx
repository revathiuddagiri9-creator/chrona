import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Circle, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Filter, 
  Tag, 
  Trash2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { PriorityTask, TabType } from '../types';

interface TasksViewProps {
  tasks: PriorityTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string, category?: string) => void;
  onDeleteTask: (taskId: string) => void;
  onSelectTab: (tab: TabType) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onDeleteTask,
  onSelectTab
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Productivity');

  const categories = ['All', 'Coding', 'Productivity', 'Communication', 'Development', 'General'];

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active' && t.completed) return false;
    if (filter === 'completed' && !t.completed) return false;
    if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;
    return true;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle.trim(), newTaskCategory);
      setNewTaskTitle('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-geist text-2xl md:text-3xl font-semibold text-[#e5e2e3]">
            Tasks & Priorities
          </h2>
          <p className="text-sm text-[#8c909f] mt-1">
            Automated task aggregation across GitHub, Notion, Linear & LeetCode.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-[#161618] border border-[#262626] text-xs text-[#8c909f] font-mono">
            {tasks.filter((t) => !t.completed).length} pending • {tasks.filter((t) => t.completed).length} completed
          </div>
        </div>
      </div>

      {/* Add Task Input Form */}
      <form onSubmit={handleAdd} className="bg-[#161618] p-4 rounded-xl border border-[#262626] flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task or objective..."
          className="flex-1 bg-[#0A0A0B] border border-[#262626] focus:border-[#3B82F6] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none placeholder:text-[#8c909f]"
        />

        <div className="flex items-center gap-2">
          <select
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value)}
            className="bg-[#0A0A0B] border border-[#262626] text-xs text-[#c2c6d6] rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="Coding">Coding</option>
            <option value="Productivity">Productivity</option>
            <option value="Communication">Communication</option>
            <option value="Development">Development</option>
            <option value="General">General</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-geist font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </form>

      {/* Filters Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-[#262626]">
        <div className="flex items-center gap-1.5">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-geist font-medium transition-colors capitalize ${
                filter === f
                  ? 'bg-[#3B82F6]/20 text-[#adc6ff] border border-[#3B82F6]/40'
                  : 'text-[#8c909f] hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-geist transition-colors ${
                categoryFilter === c
                  ? 'bg-[#201f20] text-white font-semibold'
                  : 'text-[#8c909f] hover:text-[#e5e2e3]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Task Cards List */}
      <div className="space-y-2.5">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                task.completed
                  ? 'bg-[#131314]/60 border-[#201f20] opacity-60'
                  : 'bg-[#161618] border-[#262626] hover:border-[#3B82F6]/40'
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => onToggleTask(task.id)}
                  className="text-[#8c909f] hover:text-[#adc6ff] transition-colors shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#4edea3]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#8c909f] hover:text-[#3B82F6]" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className={`font-geist text-sm font-semibold text-[#e5e2e3] truncate ${
                    task.completed ? 'line-through text-[#8c909f]' : ''
                  }`}>
                    {task.title}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#8c909f]">
                    <span className="px-2 py-0.5 rounded bg-[#201f20] text-[10px] uppercase font-bold text-[#adc6ff]">
                      {task.category}
                    </span>
                    <span>•</span>
                    <span className={task.isUrgent && !task.completed ? 'text-[#ffb4ab]' : ''}>
                      {task.dueText}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {task.workspaceLink && (
                  <button
                    onClick={() => onSelectTab(task.workspaceLink!)}
                    className="px-2.5 py-1 rounded bg-[#201f20] hover:bg-[#2a2a2b] text-xs text-[#adc6ff] font-geist flex items-center gap-1 transition-colors"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-1.5 text-[#8c909f] hover:text-[#ffb4ab] rounded transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-[#161618] rounded-xl border border-[#262626] text-[#8c909f] text-sm">
            No tasks found in this view.
          </div>
        )}
      </div>
    </div>
  );
};
