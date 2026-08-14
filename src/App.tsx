import React, { useState, useEffect } from 'react';
import { TabType, ConnectedApp, PriorityTask } from './types';
import { INITIAL_APPS, INITIAL_TASKS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CommandBar } from './components/CommandBar';
import { ChronaAiModal } from './components/ChronaAiModal';
import { FocusSessionModal } from './components/FocusSessionModal';
import { ConnectAppModal } from './components/ConnectAppModal';
import { HomeView } from './views/HomeView';
import { CodingWorkspaceView } from './views/CodingWorkspaceView';
import { ConnectedAppsView } from './views/ConnectedAppsView';
import { TasksView } from './views/TasksView';
import { WorkspacesView } from './views/WorkspacesView';
import { AnalyticsView } from './views/AnalyticsView';
import { NotificationsView } from './views/NotificationsView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [apps, setApps] = useState<ConnectedApp[]>(INITIAL_APPS);
  const [tasks, setTasks] = useState<PriorityTask[]>(INITIAL_TASKS);

  // Modals
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  // Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsAiModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenAiCommand = (query: string = '') => {
    setAiQuery(query);
    setIsAiModalOpen(true);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (title: string, category: string = 'Productivity') => {
    const newTask: PriorityTask = {
      id: `task-${Date.now()}`,
      title,
      category,
      dueText: 'Today',
      completed: false,
      isUrgent: false
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleToggleAppStatus = (appId: string) => {
    setApps((prev) =>
      prev.map((a) => {
        if (a.id === appId) {
          const nextStatus = a.status === 'Connected' ? 'Disconnected' : 'Connected';
          return {
            ...a,
            status: nextStatus,
            lastSynced: nextStatus === 'Connected' ? 'Just now' : a.lastSynced
          };
        }
        return a;
      })
    );
  };

  const handleAddApp = (newApp: ConnectedApp) => {
    setApps((prev) => [newApp, ...prev]);
  };

  const handleExecuteAiAction = (actionName: string) => {
    if (actionName === 'start_focus') {
      setIsFocusModalOpen(true);
    } else if (actionName === 'connect_app') {
      setIsConnectModalOpen(true);
    } else if (actionName === 'open_coding') {
      setActiveTab('coding');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0B] text-[#e5e2e3] font-body-md overflow-x-hidden antialiased">
      {/* Desktop Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenAiCommand={() => handleOpenAiCommand('')}
        unreadCount={2}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[280px] flex flex-col min-h-screen pb-24 md:pb-8">
        {/* Universal Search Command Bar */}
        <CommandBar onOpenAiCommand={handleOpenAiCommand} />

        {/* Dynamic View Canvas */}
        <div className="flex-1 px-4 md:px-10 py-6 max-w-7xl mx-auto w-full">
          {activeTab === 'home' && (
            <HomeView
              onSelectTab={setActiveTab}
              onOpenFocusModal={() => setIsFocusModalOpen(true)}
              onOpenConnectAppModal={() => setIsConnectModalOpen(true)}
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
            />
          )}

          {activeTab === 'coding' && (
            <CodingWorkspaceView
              onOpenConnectAppModal={() => setIsConnectModalOpen(true)}
            />
          )}

          {activeTab === 'apps' && (
            <ConnectedAppsView
              apps={apps}
              onOpenConnectModal={() => setIsConnectModalOpen(true)}
              onToggleAppStatus={handleToggleAppStatus}
              onSelectTab={setActiveTab}
            />
          )}

          {activeTab === 'tasks' && (
            <TasksView
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              onSelectTab={setActiveTab}
            />
          )}

          {activeTab === 'workspaces' && (
            <WorkspacesView
              onSelectTab={setActiveTab}
              onOpenConnectModal={() => setIsConnectModalOpen(true)}
            />
          )}

          {activeTab === 'analytics' && <AnalyticsView />}

          {activeTab === 'notifications' && (
            <NotificationsView onSelectTab={setActiveTab} />
          )}

          {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenAiCommand={() => handleOpenAiCommand('')}
        unreadCount={2}
      />

      {/* Chrona AI Command Center Modal / Overlay */}
      <ChronaAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectTab={setActiveTab}
        initialQuery={aiQuery}
        onExecuteAction={handleExecuteAiAction}
      />

      {/* Focus Session Modal */}
      <FocusSessionModal
        isOpen={isFocusModalOpen}
        onClose={() => setIsFocusModalOpen(false)}
        initialTaskTitle="LeetCode Daily: Two Sum Optimization"
        onCompleteSession={() => {
          handleAddTask('Completed Deep Focus Session: Two Sum', 'Coding');
        }}
      />

      {/* Connect Application Modal */}
      <ConnectAppModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onAddApp={handleAddApp}
        existingApps={apps}
      />
    </div>
  );
}
