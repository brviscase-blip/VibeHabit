
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
    <div className="animate-fade-in flex flex-col min-h-screen pb-32">
      {/* Header with Title and Tags - More compact top padding */}
      <header className="pt-10 pb-6 px-6 flex flex-col items-center text-center">
        <div className="w-full flex justify-between items-center absolute top-6 left-0 px-6">
          <button 
            onClick={onBack}
            className="flex size-10 items-center justify-center rounded-2xl bg-white/5 border border-white/10 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-white text-xl">arrow_back</span>
          </button>
          <button className="flex size-10 items-center justify-center rounded-2xl bg-white/5 border border-white/10 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-white text-xl">more_horiz</span>
          </button>
        </div>

        <h1 className="text-3xl font-black tracking-tight mb-3 text-white mt-8">{habit.name}</h1>
        
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-text-secondary uppercase tracking-[0.2em]">
            {habit.frequency}
          </span>
          <span className="text-white/10">•</span>
          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-[0.2em]">
            {habit.goal}
          </span>
        </div>
      </header>

      {/* Main Action Area - Made more compact with 4:3 aspect ratio */}
      <div className="px-6 flex flex-col gap-6">
        <button 
          onClick={onToggle}
          className={`relative w-full aspect-[4/3] rounded-[32px] p-[1.5px] transition-all duration-500 overflow-hidden shadow-2xl active:scale-[0.97] ${
            isCompleted 
            ? 'bg-white/10 shadow-none' 
            : 'bg-gradient-primary shadow-primary/25'
          }`}
        >
          {/* Subtle animation layer */}
          {!isCompleted && (
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] animate-[shimmer_3s_infinite] transition-transform opacity-30"></div>
          )}
          
          <div className={`relative h-full w-full rounded-[30px] flex flex-col items-center justify-center gap-4 transition-all duration-500 ${
            isCompleted ? 'bg-[#1a1d2d]' : 'bg-transparent'
          }`}>
            <div className={`size-20 rounded-full flex items-center justify-center transition-all duration-500 ${
              isCompleted ? 'bg-primary/20 scale-110' : 'bg-white/15'
            }`}>
              <span className={`material-symbols-outlined text-4xl filled transition-all duration-500 ${
                isCompleted ? 'text-primary' : 'text-white'
              }`}>
                {isCompleted ? 'verified' : 'bolt'}
              </span>
            </div>
            
            <span className={`font-black tracking-[0.2em] text-[11px] uppercase transition-all duration-500 ${
              isCompleted ? 'text-primary' : 'text-white'
            }`}>
              {isCompleted ? 'CONCLUÍDO' : 'MARCAR COMO FEITO'}
            </span>
          </div>
        </button>

        {/* Stats Grid - Now fits better on the screen */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface/40 rounded-[28px] p-5 border border-white/5 flex flex-col gap-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-16 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-colors"></div>
            <span className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em]">Streak</span>
            <span className="text-xl font-black text-white">12 Days</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[10px] text-accent filled">local_fire_department</span>
              <span className="text-[8px] font-bold text-accent">Personal Record</span>
            </div>
          </div>
          <div className="bg-surface/40 rounded-[28px] p-5 border border-white/5 flex flex-col gap-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-16 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors"></div>
            <span className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em]">Monthly</span>
            <span className="text-xl font-black text-white">94%</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[10px] text-primary filled">stars</span>
              <span className="text-[8px] font-bold text-primary">Master Level</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-20deg); }
          30% { transform: translateX(100%) skewX(-20deg); }
          100% { transform: translateX(100%) skewX(-20deg); }
        }
      `}</style>
    </div>
  );
};

export default HabitDetail;
