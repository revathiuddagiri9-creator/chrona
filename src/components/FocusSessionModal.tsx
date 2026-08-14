import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Flame 
} from 'lucide-react';

interface FocusSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTaskTitle?: string;
  onCompleteSession?: () => void;
}

export const FocusSessionModal: React.FC<FocusSessionModalProps> = ({
  isOpen,
  onClose,
  initialTaskTitle = 'LeetCode Daily: Two Sum Optimization',
  onCompleteSession
}) => {
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTask, setActiveTask] = useState(initialTaskTitle);

  useEffect(() => {
    if (isOpen) {
      setActiveTask(initialTaskTitle);
    }
  }, [isOpen, initialTaskTitle]);

  const selectDuration = (minutes: number) => {
    setSessionMinutes(minutes);
    setSecondsLeft(minutes * 60);
    setIsRunning(false);
    setIsCompleted(false);
  };

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && secondsLeft === 0) {
      setIsRunning(false);
      setIsCompleted(true);
      if (onCompleteSession) onCompleteSession();
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, onCompleteSession]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalSeconds = sessionMinutes * 60;
  const progressPercent = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[520px] bg-[#161618] border border-[#2a2a2b] rounded-2xl shadow-2xl overflow-hidden p-6 relative ai-glow"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#262626]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center text-[#adc6ff]">
              <Sparkles className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <div>
              <h3 className="font-geist font-bold text-white text-base">Deep Focus Session</h3>
              <p className="text-xs text-[#8c909f]">Chrona Environment Shield Active</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[#8c909f] hover:text-white hover:bg-[#201f20] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Task Input / Selector */}
        <div className="mb-6 bg-[#0e0e0f] p-3 rounded-xl border border-[#262626]">
          <label className="text-[11px] font-geist uppercase tracking-wider text-[#8c909f] block mb-1">
            Target Focus Objective
          </label>
          <input
            type="text"
            value={activeTask}
            onChange={(e) => setActiveTask(e.target.value)}
            className="w-full bg-transparent border-none text-sm text-[#e5e2e3] font-medium focus:ring-0 p-0"
            placeholder="What are you focusing on?"
          />
        </div>

        {/* Preset Selectors */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[15, 25, 45, 60].map((m) => (
            <button
              key={m}
              onClick={() => selectDuration(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-geist font-medium transition-all ${
                sessionMinutes === m
                  ? 'bg-[#3B82F6] text-white shadow-[0_0_10px_rgba(59,130,246,0.4)]'
                  : 'bg-[#201f20] text-[#8c909f] hover:text-[#e5e2e3] hover:bg-[#2a2a2b]'
              }`}
            >
              {m} min
            </button>
          ))}
        </div>

        {/* Big Circular Timer Display */}
        <div className="relative flex flex-col items-center justify-center my-4">
          <div className="w-48 h-48 rounded-full border-4 border-[#201f20] flex flex-col items-center justify-center relative shadow-inner">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="transparent"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeDasharray={552}
                strokeDashoffset={552 - (552 * progressPercent) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>

            <span className="font-mono text-4xl font-bold text-white tracking-wider">
              {formattedTime}
            </span>
            <span className="text-xs text-[#8c909f] mt-1 font-geist">
              {isRunning ? 'Shielding Distractions' : isCompleted ? 'Session Finished!' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2.5 rounded-xl font-geist font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${
              isRunning
                ? 'bg-[#201f20] text-[#ffb4ab] border border-[#ffb4ab]/40 hover:bg-[#ffb4ab]/10'
                : 'bg-[#3B82F6] text-white hover:bg-[#2563EB] shadow-[0_0_15px_rgba(59,130,246,0.4)]'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> {secondsLeft < totalSeconds ? 'Resume' : 'Start Focus'}
              </>
            )}
          </button>

          <button
            onClick={() => selectDuration(sessionMinutes)}
            className="p-2.5 rounded-xl bg-[#201f20] hover:bg-[#2a2a2b] text-[#8c909f] hover:text-white border border-[#262626] transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleSound}
            className={`p-2.5 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-[#4edea3]/20 border-[#4edea3]/40 text-[#4edea3]'
                : 'bg-[#201f20] border-[#262626] text-[#8c909f] hover:text-white'
            }`}
            title="Ambient Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Streak & Stats footer */}
        <div className="mt-6 pt-4 border-t border-[#262626] flex items-center justify-between text-xs text-[#8c909f]">
          <div className="flex items-center gap-1.5 text-[#ffb95f]">
            <Flame className="w-4 h-4 fill-current" />
            <span className="font-semibold">5-Day Coding Streak</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>3.4h logged today</span>
          </div>
        </div>
      </div>
    </div>
  );
};
