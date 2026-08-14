import { ConnectedApp, PriorityTask, LeetCodeProblem, DocRef, AiCommand, AiInsight, WorkspacePreset } from '../types';

export const INITIAL_APPS: ConnectedApp[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'Communication',
    description: 'Sync emails, extract action items, and automate drafts.',
    icon: 'mail',
    status: 'Connected',
    lastSynced: '2 mins ago',
    accountEmail: 'alex.rivera@gmail.com',
    isAiSynced: true,
    syncItemCount: 3,
    features: ['Smart email triage', 'Action item extraction', 'Calendar invite detection']
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    description: 'Send notifications and command Chrona via chat.',
    icon: 'forum',
    status: 'Disconnected',
    lastSynced: '3 days ago',
    accountEmail: 'alex.rivera@work.slack.com',
    isAiSynced: false,
    syncItemCount: 0,
    features: ['Channel digest summaries', 'DM alerts', 'Slash commands']
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Development',
    description: 'Track PRs, issues, and automate code review summaries.',
    icon: 'code',
    status: 'Syncing',
    lastSynced: 'Just now',
    accountEmail: 'alexrivera-dev',
    isAiSynced: true,
    syncItemCount: 7,
    features: ['Automated PR breakdown', 'Issue prioritization', 'CI/CD alert integration']
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    category: 'Development',
    description: 'Track daily problems and streaks.',
    icon: 'integration_instructions',
    status: 'Disconnected',
    lastSynced: 'Yesterday',
    accountEmail: 'alex_codes_99',
    isAiSynced: true,
    syncItemCount: 1,
    features: ['Daily streak reminder', 'Automated test suite sync', 'Complexity optimizer']
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Productivity',
    description: 'Two-way sync for tasks, docs, and knowledge bases.',
    icon: 'description',
    status: 'Connected',
    lastSynced: '10 mins ago',
    accountEmail: 'alex.notes@workspace.notion.so',
    isAiSynced: true,
    syncItemCount: 14,
    features: ['Doc embedding', 'Database row synchronization', 'Markdown sync']
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    category: 'Productivity',
    description: 'Schedule meetings, block time, and prep for events.',
    icon: 'calendar_month',
    status: 'Connected',
    lastSynced: '5 mins ago',
    accountEmail: 'alex.rivera@gmail.com',
    isAiSynced: true,
    syncItemCount: 4,
    features: ['Focus block auto-protection', 'Meeting prep summaries', 'Conflict resolution']
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Creative',
    description: 'Inspect design components, sync tokens, and track feedback.',
    icon: 'draw',
    status: 'Connected',
    lastSynced: '1 hour ago',
    accountEmail: 'alex@designteam.io',
    isAiSynced: true,
    syncItemCount: 2,
    features: ['Component token extractor', 'Comment alerts', 'Dev mode handoff']
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'Productivity',
    description: 'High-speed issue tracking and sprint backlog synchronizer.',
    icon: 'assignment',
    status: 'Connected',
    lastSynced: '15 mins ago',
    accountEmail: 'alex@startup.linear.app',
    isAiSynced: true,
    syncItemCount: 5,
    features: ['Cycle progress tracking', 'Git branch association', 'Priority queue']
  }
];

export const INITIAL_TASKS: PriorityTask[] = [
  {
    id: 'task-1',
    title: 'Complete LeetCode Daily',
    dueText: 'Due in 4 hours',
    category: 'Coding',
    completed: false,
    isUrgent: true,
    workspaceLink: 'coding'
  },
  {
    id: 'task-2',
    title: 'Review Q3 Roadmaps',
    dueText: 'Product Team',
    category: 'Productivity',
    completed: false,
    isUrgent: false,
    workspaceLink: 'apps'
  },
  {
    id: 'task-3',
    title: 'Reply to Sarah (Design)',
    dueText: 'Inbox zero',
    category: 'Communication',
    completed: false,
    isUrgent: false,
    workspaceLink: 'apps'
  },
  {
    id: 'task-4',
    title: 'Review PR #248 on Auth Microservice',
    dueText: 'GitHub • Urgent',
    category: 'Development',
    completed: false,
    isUrgent: true,
    workspaceLink: 'coding'
  },
  {
    id: 'task-5',
    title: 'Prepare Slide Deck for Sprint Demo',
    dueText: 'Tomorrow 10:00 AM',
    category: 'Productivity',
    completed: true,
    isUrgent: false
  }
];

export const LEETCODE_PROBLEMS: LeetCodeProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1, 2]',
        explanation: 'nums[1] + nums[2] == 6, we return [1, 2].'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0, 1]'
      }
    ],
    starterCode: {
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            # AI Suggestion: Check dictionary before inserting to handle duplicates
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
      javascript: `function solveTwoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    // Processing...
    map.set(nums[i], i);
  }
  return [];
}`
    },
    solutionCode: {
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            comp = target - num
            if comp in seen:
                return [seen[comp], i]
            seen[num] = i
        return []`,
      javascript: `function solveTwoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`
    },
    testCases: [
      { input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
      { input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
      { input: 'nums = [3, 3], target = 6', expected: '[0, 1]' },
      { input: 'nums = [1, 5, 8, 12, 14], target = 22', expected: '[2, 4]' }
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
      explanation: 'Your solution uses a hash map for O(1) average lookups. Single pass through array.'
    }
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: 'true'
      },
      {
        input: 's = "rat", t = "car"',
        output: 'false'
      }
    ],
    starterCode: {
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        
        counts = collections.defaultdict(int)
        for char in s:
            counts[char] += 1
        for char in t:
            counts[char] -= 1
            if counts[char] < 0:
                return False
        return True`,
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let c of s) count[c] = (count[c] || 0) + 1;
  for (let c of t) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}`
    },
    solutionCode: {
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return collections.Counter(s) == collections.Counter(t)`,
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  return s.split('').sort().join('') === t.split('').sort().join('');
}`
    },
    testCases: [
      { input: 's = "anagram", t = "nagaram"', expected: 'true' },
      { input: 's = "rat", t = "car"', expected: 'false' },
      { input: 's = "listen", t = "silent"', expected: 'true' }
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      explanation: 'Since alphabet size is capped at 26 lowercase English letters, space is O(1).'
    }
  },
  {
    id: 'best-time-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
      },
      {
        input: 'prices = [7,6,4,3,1]',
        output: '0',
        explanation: 'In this case, no transactions are done and the max profit = 0.'
      }
    ],
    starterCode: {
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_profit:
                max_profit = price - min_price
        return max_profit`,
      javascript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let p of prices) {
    if (p < minPrice) minPrice = p;
    else if (p - minPrice > maxProfit) maxProfit = p - minPrice;
  }
  return maxProfit;
}`
    },
    solutionCode: {
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)
        return max_profit`,
      javascript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`
    },
    testCases: [
      { input: 'prices = [7,1,5,3,6,4]', expected: '5' },
      { input: 'prices = [7,6,4,3,1]', expected: '0' },
      { input: 'prices = [2,4,1]', expected: '2' }
    ],
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
      explanation: 'Linear scan updating running minimum price and maximum profit difference.'
    }
  }
];

export const DOC_REFS: DocRef[] = [
  {
    id: 'dict-get',
    title: 'dict.get()',
    category: 'Dictionary / Map',
    syntax: 'dict.get(key, default=None)',
    description: 'Return the value for key if key is in the dictionary, else default.',
    example: 'val = seen.get(target - num, -1)'
  },
  {
    id: 'enumerate',
    title: 'enumerate()',
    category: 'Iteration',
    syntax: 'enumerate(iterable, start=0)',
    description: 'Return an enumerate object with (index, value) pairs over sequences.',
    example: 'for i, num in enumerate(nums):'
  },
  {
    id: 'defaultdict',
    title: 'collections.defaultdict',
    category: 'Collections',
    syntax: 'defaultdict(default_factory)',
    description: 'Dict subclass that calls a factory function to supply missing values.',
    example: 'counts = collections.defaultdict(int)'
  },
  {
    id: 'counter',
    title: 'collections.Counter',
    category: 'Collections',
    syntax: 'Counter([iterable-or-mapping])',
    description: 'Dict subclass for counting hashable objects efficiently.',
    example: 'frequency = Counter(nums)'
  },
  {
    id: 'bisect',
    title: 'bisect.bisect_left',
    category: 'Binary Search',
    syntax: 'bisect_left(a, x, lo=0, hi=len(a))',
    description: 'Locate the insertion point for x in a to maintain sorted order.',
    example: 'idx = bisect.bisect_left(sorted_arr, target)'
  },
  {
    id: 'heapq',
    title: 'heapq.heappush / heappop',
    category: 'Priority Queue',
    syntax: 'heappush(heap, item) / heappop(heap)',
    description: 'Maintains min-heap invariant on standard Python lists in O(log n).',
    example: 'heapq.heappush(min_heap, (weight, node))'
  },
  {
    id: 'zip',
    title: 'zip(*iterables)',
    category: 'Iteration',
    syntax: 'zip(iter1, iter2, ...)',
    description: 'Iterate over several iterables in parallel, producing tuples.',
    example: 'for a, b in zip(list1, list2):'
  }
];

export const AI_COMMANDS: AiCommand[] = [
  {
    id: 'cmd-code-workspace',
    title: 'Open my coding workspace',
    description: 'Launches VS Code, Terminal, and localhost',
    icon: 'terminal',
    targetTab: 'coding',
    action: 'open_coding'
  },
  {
    id: 'cmd-emails',
    title: 'Show important emails',
    description: 'Filters inbox for high-priority senders',
    icon: 'mail',
    targetTab: 'apps',
    action: 'filter_emails'
  },
  {
    id: 'cmd-split-view',
    title: 'Open GitHub and LeetCode together',
    description: 'Arranges windows in split-view layout',
    icon: 'splitscreen',
    targetTab: 'coding',
    action: 'split_layout'
  },
  {
    id: 'cmd-focus-mode',
    title: 'Start 25-min Deep Focus Session',
    description: 'Mutes notifications and starts Pomodoro timer',
    icon: 'play_circle',
    targetTab: 'home',
    action: 'start_focus'
  },
  {
    id: 'cmd-connect-app',
    title: 'Connect a new application integration',
    description: 'Add Slack, LeetCode, Jira or custom webhook',
    icon: 'add_link',
    targetTab: 'apps',
    action: 'connect_app'
  }
];

export const AI_INSIGHTS: AiInsight[] = [
  {
    id: 'insight-switch',
    title: 'App switching reduction',
    metricOld: '37',
    metricNew: '14',
    highlight: '62%',
    description: 'CHRONA reduced unnecessary app switching by 62%.'
  },
  {
    id: 'insight-streak',
    title: 'Coding Streak Active',
    metricOld: '4',
    metricNew: '5',
    highlight: '5 Days',
    description: 'Complete Two Sum today to hit a 5-day continuous streak!'
  },
  {
    id: 'insight-time',
    title: 'Deep Work Time Logged',
    metricOld: '1.8h',
    metricNew: '3.4h',
    highlight: '+88%',
    description: 'Deep work time increased significantly with automated window tiling.'
  }
];

export const WORKSPACE_PRESETS: WorkspacePreset[] = [
  {
    id: 'wp-coding',
    name: 'Coding Workspace',
    description: 'LeetCode Problem solving, Python/JS Sandbox & GitHub Sync',
    icon: 'code',
    apps: ['LeetCode', 'GitHub', 'VS Code'],
    activeTab: 'coding',
    lastUsed: 'Just now'
  },
  {
    id: 'wp-design',
    name: 'Design & Tokens',
    description: 'Figma components, UI Specs & Notion Requirements',
    icon: 'draw',
    apps: ['Figma', 'Notion', 'Slack'],
    activeTab: 'apps',
    lastUsed: '2 hours ago'
  },
  {
    id: 'wp-inbox',
    name: 'Inbox Zero & Triage',
    description: 'Superhuman email triage, Calendar blocking & Linear sprint items',
    icon: 'mark_email_unread',
    apps: ['Gmail', 'Google Calendar', 'Linear'],
    activeTab: 'apps',
    lastUsed: 'Yesterday'
  },
  {
    id: 'wp-deepwork',
    name: 'Deep Focus Sandbox',
    description: 'Distraction-free environment with automated ambient sound',
    icon: 'timer',
    apps: ['Notion', 'Obsidian', 'Spotify'],
    activeTab: 'home',
    lastUsed: '3 days ago'
  }
];
