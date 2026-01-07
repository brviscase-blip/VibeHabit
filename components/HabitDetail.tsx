
import React from 'react';
import { Habit } from '../types';

interface HabitDetailProps {
  habit: Habit;
  selectedDate: string;
  onBack: () => void;
  onToggle: () => void;
}

const HabitDetail: React.FC<HabitDetailProps> = ({ habit, selectedDate, onBack, onToggle }) => {
  const isCompleted = habit.completedDays.includes(selectedDate);
  const formattedDate = new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { 
    day: 'numeric', 
    month: 'long' 
  });

  return (
    <div className="animate-fade-in flex flex-col min-h-screen pb-28">
      {/* Header */}
      <header className="pt-7 pb-4 px-5 flex flex-col items-center text-center">
        <div className="w-full flex justify-between items-center absolute top-4 left-0 px-5">
          <button 
            onClick={onBack}
            className="flex size-8 items-center justify-center rounded-[9px] bg-white/5 border border-white/10 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-white text-base">arrow_back</span>
          </button>
          <button className="flex size-8 items-center justify-center rounded-[9px] bg-white/5 border border-white/10 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-white text-base">more_horiz</span>
          </button>
        </div>

        <h1 className="text-xl font-black tracking-tight mb-1 text-white mt-7">{habit.name}</h1>
        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-3">{formattedDate}</p>
        
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[7px] font-black text-text-secondary uppercase tracking-[0.2em]">
            {habit.frequency}
          </span>
          <span className="text-white/10">•</span>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[7px] font-black text-primary uppercase tracking-[0.2em]">
            {habit.goal}
          </span>
        </div>
      </header>

      {/* Main Action Area */}
      <div className="px-5 flex flex-col gap-4">
        <button 
          onClick={onToggle}
          className={`relative w-full aspect-[16/10] rounded-[18px] p-[1.1px] transition-all duration-500 overflow-hidden shadow-xl active:scale-[0.97] ${
            isCompleted 
            ? 'bg-white/10 shadow-none' 
            : 'bg-gradient-primary shadow-primary/25'
          }`}
        >
          {!isCompleted && (
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] animate-[shimmer_3s_infinite] transition-transform opacity-30"></div>
          )}
          
          <div className={`relative h-full w-full rounded-[17px] flex flex-col items-center justify-center gap-2.5 transition-all duration-500 ${
            isCompleted ? 'bg-[#1a1d2d]' : 'bg-transparent'
          }`}>
            <div className={`size-14 rounded-full flex items-center justify-center transition-all duration-500 ${
              isCompleted ? 'bg-primary/20 scale-110' : 'bg-white/15'
            }`}>
              <span className={`material-symbols-outlined text-2xl filled transition-all duration-500 ${
                isCompleted ? 'text-primary' : 'text-white'
              }`}>
                {isCompleted ? 'verified' : 'bolt'}
              </span>
            </div>
            
            <span className={`font-black tracking-[0.2em] text-[9px] uppercase transition-all duration-500 ${
              isCompleted ? 'text-primary' : 'text-white'
            }`}>
              {isCompleted ? 'CONCLUÍDO' : 'MARCAR COMO FEITO'}
            </span>
          </div>
        </button>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-surface/40 rounded-[18px] p-3.5 border border-white/5 flex flex-col gap-0.5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-12 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-colors"></div>
            <span className="text-[7px] font-black text-text-secondary uppercase tracking-[0.15em]">Streak</span>
            <span className="text-base font-black text-white">12 Dias</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[8px] text-accent filled">local_fire_department</span>
              <span className="text-[6.5px] font-bold text-accent">Recorde Pessoal</span>
            </div>
          </div>
          <div className="bg-surface/40 rounded-[18px] p-3.5 border border-white/5 flex flex-col gap-0.5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-12 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors"></div>
            <span className="text-[7px] font-black text-text-secondary uppercase tracking-[0.15em]">Mensal</span>
            <span className="text-base font-black text-white">94%</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[8px] text-primary filled">stars</span>
              <span className="text-[6.5px] font-bold text-primary">Nível Elite</span>
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
