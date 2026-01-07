
import React from 'react';
import { Habit, DailyInsight } from '../types';

interface DashboardProps {
  habits: Habit[];
  insight: DailyInsight | null;
  profileImage: string;
  onToggle: (id: string) => void;
  onHabitClick: (id: string) => void;
  onProfileClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ habits, insight, profileImage, onToggle, onHabitClick, onProfileClick }) => {
  const today = new Date().toISOString().split('T')[0];
  const completedCount = habits.filter(h => h.completedDays.includes(today)).length;
  const totalCount = habits.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="animate-fade-in flex flex-col gap-6 pt-4">
      {/* Header */}
      <header className="flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button onClick={onProfileClick} className="relative group">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-2xl size-14 ring-2 ring-white/5 group-hover:ring-primary/50 transition-all duration-300 shadow-xl"
              style={{ backgroundImage: `url("${profileImage}")` }}
            ></div>
            <div className="absolute -bottom-1 -right-1 size-5 bg-gradient-primary rounded-full border-2 border-[#0f111a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[10px] text-white font-bold">photo_camera</span>
            </div>
          </button>
          <div className="flex flex-col">
            <span className="text-text-secondary text-[11px] font-bold uppercase tracking-[0.15em] mb-0.5 opacity-70">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight leading-none">Hi, Alex</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center justify-center size-11 rounded-2xl bg-surface border border-white/5 text-white/80 hover:bg-surface-light transition-all">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="flex items-center justify-center size-11 rounded-2xl bg-surface border border-white/5 text-white/80 hover:bg-surface-light transition-all relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-3 right-3 size-2 bg-primary rounded-full shadow-[0_0_8px_rgba(233,30,99,0.8)]"></span>
          </button>
        </div>
      </header>

      {/* Week View */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-white tracking-tight">Focus Week</h3>
          <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold text-primary uppercase tracking-widest">Today</div>
        </div>
        <div className="flex justify-between items-center gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => {
            const date = new Date();
            date.setDate(date.getDate() - (date.getDay() - idx));
            const isToday = idx === new Date().getDay();
            const isCompleted = Math.random() > 0.4; // Mock past data
            
            return (
              <div key={idx} className="flex flex-col items-center gap-3 min-w-[48px]">
                <span className={`text-[10px] font-black tracking-tighter ${isToday ? 'text-primary' : 'text-text-secondary/60'}`}>{day}</span>
                <button className={`size-11 rounded-2xl flex items-center justify-center text-sm font-black transition-all border ${isToday ? 'bg-gradient-primary border-transparent text-white shadow-lg shadow-primary/20' : 'bg-surface border-white/5 text-text-secondary'}`}>
                  {date.getDate()}
                </button>
                {isCompleted && !isToday && <div className="size-1.5 rounded-full bg-primary/40"></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Stats Card */}
      <div className="px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-surface border border-white/5 shadow-2xl p-6 flex items-center justify-between group">
          <div className="absolute top-0 right-0 size-48 bg-primary/10 blur-[60px] rounded-full translate-x-12 -translate-y-12"></div>
          <div className="flex flex-col gap-2 z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-lg bg-accent/20 text-accent text-[9px] font-black uppercase tracking-[0.2em]">Live Pulse</span>
            </div>
            <h3 className="text-white text-3xl font-black leading-none tracking-tight">
              {percentage}% <span className="text-xl opacity-50 font-medium tracking-normal">Complete</span>
            </h3>
            <p className="text-text-secondary text-sm font-medium mt-1">
              You are crushing your <span className="text-white font-bold">{totalCount} goals</span> today.
            </p>
          </div>
          
          <div className="relative size-24 shrink-0 group-hover:scale-110 transition-transform duration-500">
            <svg className="size-full -rotate-90 drop-shadow-2xl" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
              <circle 
                cx="18" cy="18" r="16" 
                fill="none" 
                stroke="url(#pulseGrad)" 
                strokeWidth="3.5"
                strokeDasharray={`${percentage}, 100`} 
                strokeLinecap="round" 
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e91e63" />
                  <stop offset="100%" stopColor="#ff5722" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl filled animate-pulse">bolt</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight Section */}
      {insight && (
        <div className="px-6">
          <div className="p-5 rounded-3xl bg-surface-light/50 backdrop-blur-md border border-white/5 shadow-xl relative overflow-hidden">
            <div className="absolute -left-10 -bottom-10 size-40 bg-accent/5 blur-[50px] rounded-full"></div>
            <div className="flex items-center gap-2 mb-3">
              <div className="size-8 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[20px] filled">auto_awesome</span>
              </div>
              <span className="text-white text-xs font-black uppercase tracking-[0.2em]">Gemini AI</span>
            </div>
            <p className="text-white text-base font-bold mb-2 leading-snug italic">"{insight.quote}"</p>
            <p className="text-text-secondary text-xs leading-relaxed font-medium opacity-80">{insight.advice}</p>
          </div>
        </div>
      )}

      {/* Habit List */}
      <div className="px-6 flex flex-col gap-4 pb-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white tracking-tight">Current Quests</h3>
          <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-2 py-1 bg-primary/5 rounded-lg border border-primary/10">Manage</button>
        </div>
        <div className="flex flex-col gap-3">
          {habits.map((habit) => {
            const isCompleted = habit.completedDays.includes(today);
            return (
              <div 
                key={habit.id}
                className="group relative flex items-center justify-between p-4 rounded-3xl bg-surface border border-white/5 hover:border-primary/30 transition-all cursor-pointer active:scale-[0.98]"
                onClick={() => onHabitClick(habit.id)}
              >
                <div className="flex items-center gap-5">
                  <div className="size-14 rounded-2xl bg-[#0f111a] flex items-center justify-center text-white/90 shadow-inner group-hover:scale-105 transition-transform border border-white/5">
                    <span className="material-symbols-outlined text-3xl filled">{habit.category}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-base font-bold tracking-tight text-white transition-all ${isCompleted ? 'opacity-30 line-through' : ''}`}>
                      {habit.name}
                    </span>
                    <span className="text-xs text-text-secondary font-medium tracking-wide flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-accent"></span>
                      {habit.goal}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(habit.id);
                  }}
                  className={`size-10 rounded-2xl border-2 transition-all flex items-center justify-center ${isCompleted ? 'bg-gradient-primary border-transparent shadow-lg shadow-primary/30 scale-110' : 'border-white/10 bg-white/5 hover:border-primary/50'}`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-lg text-white font-bold">check</span>
                  ) : (
                    <span className="material-symbols-outlined text-lg text-text-secondary/30">circle</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
