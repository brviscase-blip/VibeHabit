
import React from 'react';
import { Habit } from '../types';

interface HabitDetailProps {
  habit: Habit;
  onBack: () => void;
  onToggle: () => void;
}

const HabitDetail: React.FC<HabitDetailProps> = ({ habit, onBack, onToggle }) => {
  const today = new Date().toISOString().split('T')[0];
  const isCompleted = habit.completedDays.includes(today);

  return (
    <div className="animate-fade-in pb-32">
      {/* Immersive Header */}
      <div className="relative h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f111a]/20 via-[#0f111a]/60 to-[#0f111a] z-10"></div>
        
        {/* Animated Background Shapes */}
        <div className="absolute top-[-20%] left-[-20%] w-[120%] h-[120%] bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-64 h-64 bg-accent/20 rounded-full blur-[80px]"></div>
        
        <div className="absolute top-0 w-full z-20 flex items-center justify-between p-6">
          <button 
            onClick={onBack}
            className="flex size-12 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all shadow-2xl"
          >
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <div className="flex gap-3">
            <button className="flex size-12 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <span className="material-symbols-outlined text-white">edit</span>
            </button>
            <button className="flex size-12 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <span className="material-symbols-outlined text-white">share</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 left-0 w-full px-6 z-20 flex flex-col items-center text-center">
          <div className="size-24 rounded-[32px] bg-gradient-primary flex items-center justify-center mb-6 shadow-2xl shadow-primary/40 group overflow-hidden">
             <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <span className="material-symbols-outlined text-white text-5xl filled drop-shadow-lg">{habit.category}</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-white">{habit.name}</h1>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">{habit.frequency}</span>
            <span className="text-white/20">•</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.2em]">{habit.goal}</span>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8 mt-4">
        {/* Main Action */}
        <button 
          onClick={onToggle}
          className={`group relative w-full h-18 overflow-hidden rounded-3xl p-[2px] transition-all hover:scale-[1.02] active:scale-95 ${isCompleted ? 'bg-white/10 shadow-xl' : 'bg-gradient-primary shadow-2xl shadow-primary/30'}`}
        >
          <div className={`relative flex h-full w-full items-center justify-center gap-3 rounded-[22px] transition-all ${isCompleted ? 'bg-[#0f111a]' : 'bg-[#0f111a]/40 backdrop-blur-md'}`}>
            <span className={`material-symbols-outlined text-2xl filled ${isCompleted ? 'text-primary animate-bounce' : 'text-white'}`}>
              {isCompleted ? 'verified' : 'bolt'}
            </span>
            <span className={`font-black tracking-widest text-sm uppercase ${isCompleted ? 'text-primary' : 'text-white'}`}>
              {isCompleted ? 'CONCLUÍDO HOJE' : 'MARCAR COMO FEITO'}
            </span>
          </div>
        </button>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface p-6 rounded-[32px] border border-white/5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 size-20 bg-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="size-8 bg-accent/20 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-accent text-sm filled">local_fire_department</span>
                </div>
                <span className="text-text-secondary text-[9px] font-black uppercase tracking-[0.2em]">Current Streak</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">12</span>
                <span className="text-[10px] font-black text-text-secondary uppercase">Days</span>
              </div>
            </div>
          </div>
          <div className="bg-surface p-6 rounded-[32px] border border-white/5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 size-20 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="size-8 bg-primary/20 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm filled">emoji_events</span>
                </div>
                <span className="text-text-secondary text-[9px] font-black uppercase tracking-[0.2em]">Completion</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">94</span>
                <span className="text-[10px] font-black text-text-secondary uppercase">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white tracking-tight uppercase tracking-widest text-sm">Weekly Log</h3>
            <span className="text-[10px] font-black text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20 cursor-pointer hover:bg-primary/20 transition-all">Full Calendar</span>
          </div>
          <div className="flex justify-between items-center bg-surface p-6 rounded-[32px] border border-white/5 shadow-inner">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => {
              const date = new Date();
              date.setDate(date.getDate() - (date.getDay() - idx));
              const isComp = Math.random() > 0.4;
              const isToday = idx === new Date().getDay();
              
              return (
                <div key={idx} className="flex flex-col items-center gap-4 group">
                  <span className={`text-[10px] font-black tracking-widest ${isToday ? 'text-primary' : 'text-text-secondary/40'}`}>{day}</span>
                  <div className={`size-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${isComp ? 'bg-gradient-primary shadow-lg shadow-primary/20 scale-105' : 'bg-white/5 border border-white/5 text-text-secondary/20'}`}>
                    {isComp ? (
                      <span className="material-symbols-outlined text-sm font-black text-white">check</span>
                    ) : (
                      <span className="text-[10px] font-black">{date.getDate()}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetail;
