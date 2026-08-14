import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy Gemini AI client
  let aiClient: GoogleGenAI | null = null;
  function getAiClient() {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return aiClient;
  }

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Chrona Core API', timestamp: new Date().toISOString() });
  });

  // AI Command Synthesis Endpoint
  app.post('/api/ai/ask', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt string is required' });
        return;
      }

      const client = getAiClient();
      if (!client) {
        // Fallback intelligent heuristic if API key is not configured in environment
        const lower = prompt.toLowerCase();
        let reply = '';
        if (lower.includes('two sum') || lower.includes('code') || lower.includes('leetcode')) {
          reply = `💡 **Chrona Optimization Analysis:**\nYour current Two Sum implementation uses a hash map (\`seen = {}\`) for O(n) linear time complexity and O(n) space complexity. To ensure 100% test pass on LeetCode, make sure to return early upon matching the complement.`;
        } else if (lower.includes('email') || lower.includes('mail') || lower.includes('sarah')) {
          reply = `📬 **Chrona Email Triage:**\n1. Sarah Chen (Urgent: Wireframe feedback before 3 PM)\n2. GitHub CI (PR #248 approved)\n3. Notion (Q3 Product Roadmap synced)`;
        } else {
          reply = `✨ **Chrona AI Assistant:**\nI reviewed your current digital workspace state. You have a 5-day coding streak, 4 active connected integrations (Gmail, GitHub, Notion, Calendar), and no sync conflicts.`;
        }
        res.json({ reply });
        return;
      }

      const systemInstruction = `You are Chrona AI, an ultra-advanced futuristic intelligence assistant embedded into the user's unified digital workspace.
The user is Alex Rivera (Pro Plan). Their current environment includes:
- Coding Workspace with LeetCode (Two Sum, 5-day streak) & GitHub Sync
- Connected Apps: Gmail (3 priority emails), Notion, Google Calendar, Slack (Disconnected)
- Deep Work timer active

Provide concise, highly actionable, well-structured, and intelligent responses formatted with Markdown. Be clear, professional, and helpful.`;

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error('Gemini AI error:', error);
      res.status(500).json({ error: error.message || 'Internal AI synthesis error' });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Chrona Digital Workspace running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
