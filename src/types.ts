export type TabType = 
  | 'home'
  | 'coding'
  | 'apps'
  | 'workspaces'
  | 'tasks'
  | 'notifications'
  | 'analytics'
  | 'settings';

export type AppCategory = 'Communication' | 'Development' | 'Productivity' | 'Creative';

export type ConnectionStatus = 'Connected' | 'Disconnected' | 'Syncing';

export interface ConnectedApp {
  id: string;
  name: string;
  category: AppCategory;
  description: string;
  icon: string; // Lucide icon name or Material Symbol name
  status: ConnectionStatus;
  lastSynced?: string;
  accountEmail?: string;
  isAiSynced?: boolean;
  syncItemCount?: number;
  features?: string[];
}

export interface PriorityTask {
  id: string;
  title: string;
  dueText: string;
  category: string;
  completed: boolean;
  isUrgent?: boolean;
  workspaceLink?: TabType;
}

export interface LeetCodeProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    python: string;
    javascript: string;
  };
  solutionCode: {
    python: string;
    javascript: string;
  };
  testCases: {
    input: string;
    expected: string;
  }[];
  complexity: {
    time: string;
    space: string;
    explanation: string;
  };
}

export interface DocRef {
  id: string;
  title: string;
  category: string;
  syntax: string;
  description: string;
  example: string;
}

export interface AiCommand {
  id: string;
  title: string;
  description: string;
  icon: string;
  targetTab?: TabType;
  action?: string;
}

export interface AiInsight {
  id: string;
  title: string;
  metricOld: string | number;
  metricNew: string | number;
  description: string;
  highlight: string;
}

export interface WorkspacePreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  apps: string[];
  activeTab: TabType;
  lastUsed: string;
}
