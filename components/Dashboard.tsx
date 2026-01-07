
import React from 'react';
import { Habit } from '../types';

interface DashboardProps {
  habits: Habit[];
  profileImage: string;
  onToggle: (id: string) => void;
  onHabitClick: (id: string) => void;
  onProfileClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ habits, profileImage, onToggle, onHabitClick, onProfileClick }) => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const completedCount = habits.filter(h => h.completedDays.includes(todayStr)).length;
  const totalCount = habits.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // PT-BR Weekdays
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  return (
    <div className="animate-fade-in flex flex-col gap-6 pt-6">
      {/* Header - Reduced radius by 15% (16px -> 14px, xl -> 10px) */}
      <header className="flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button onClick={onProfileClick} className="relative group">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-[14px] size-14 ring-2 ring-white/5 group-hover:ring-primary/50 transition-all duration-300 shadow-xl"
              style={{ backgroundImage: `url("${profileImage}")` }}
            ></div>
            <div className="absolute -bottom-1 -right-1 size-5 bg-gradient-primary rounded-full border-2 border-[#0f111a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[10px] text-white font-bold">photo_camera</span>
            </div>
          </button>
          <div className="flex flex-col">
            <span className="text-text-secondary text-[11px] font-bold uppercase tracking-[0.2em] mb-0.5 opacity-70">
              {today.toLocaleDateString('pt-BR', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight leading-none">Olá, Alex</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center justify-center size-10 rounded-[10px] bg-surface border border-white/5 text-white/80 hover:bg-surface-light transition-all">
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          <button className="flex items-center justify-center size-10 rounded-[10px] bg-surface border border-white/5 text-white/80 hover:bg-surface-light transition-all relative">
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full shadow-[0_0_8px_rgba(233,30,99,0.8)]"></span>
          </button>
        </div>
      </header>

      {/* Week View */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-lg text-white tracking-tight">Semana de Foco</h3>
          <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest">HOJE</div>
        </div>
        <div className="flex justify-between items-start">
          {weekDays.map((day, idx) => {
            const date = new Date();
            const diff = idx - today.getDay();
            date.setDate(today.getDate() + diff);
            const isToday = idx === today.getDay();
            const isCompleted = idx < today.getDay() || (isToday && percentage >= 100);
            
            return (
              <div key={idx} className="flex flex-col items-center">
                <span className={`text-[11px] font-black tracking-tighter mb-4 ${isToday ? 'text-primary' : 'text-text-secondary/40'}`}>
                  {day}
                </span>
                <div className="flex flex-col items-center">
                  <button className={`size-10 rounded-full flex items-center justify-center text-sm font-black transition-all border ${
                    isToday 
                    ? 'bg-gradient-primary border-transparent text-white shadow-[0_0_15px_rgba(233,30,99,0.4)] scale-110 z-10' 
                    : 'bg-surface border-white/5 text-text-secondary'
                  }`}>
                    {date.getDate()}
                  </button>
                  <div className="h-4 flex items-center justify-center mt-1">
                    {isCompleted && (
                      <div className="size-1 bg-primary/80 rounded-full shadow-[0_0_4px_rgba(233,30,99,0.6)]"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Stats Card - Reduced radius 32px -> 27px */}
      <div className="px-6">
        <div className="relative overflow-hidden rounded-[27px] bg-surface border border-white/5 shadow-2xl p-6 flex items-center justify-between group">
          <div className="absolute top-0 right-0 size-56 bg-primary/10 blur-[70px] rounded-full translate-x-12 -translate-y-12"></div>
          <div className="flex flex-col gap-2 z-10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-[7px] bg-accent/20 text-accent text-[9px] font-black uppercase tracking-[0.2em]">Pulso Real</span>
            </div>
            <h3 className="text-white text-3xl font-black leading-none tracking-tight">
              {percentage}% <span className="text-xl opacity-50 font-medium tracking-normal">Completo</span>
            </h3>
            <p className="text-text-secondary text-sm font-medium mt-0.5">
              Você completou <span className="text-white font-bold">{completedCount} de {totalCount} metas</span> hoje.
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

      {/* Habit List - Reduced radius 24px -> 20px, icon 18px -> 15px */}
      <div className="px-6 flex flex-col gap-4 pb-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white tracking-tight">Missões Atuais</h3>
          <button className="text-[10px] font-black text-primary uppercase tracking-[0.15em] px-3 py-1 bg-primary/5 rounded-[7px] border border-primary/10">GERENCIAR</button>
        </div>
        <div className="flex flex-col gap-3">
          {habits.map((habit) => {
            const isCompleted = habit.completedDays.includes(todayStr);
            return (
              <div 
                key={habit.id}
                className="group relative flex items-center justify-between p-4 rounded-[20px] bg-surface border border-white/5 hover:border-primary/30 transition-all cursor-pointer active:scale-[0.98]"
                onClick={() => onHabitClick(habit.id)}
              >
                <div className="flex items-center gap-5">
                  <div className="size-14 rounded-[15px] bg-[#0f111a] flex items-center justify-center text-white/90 shadow-inner group-hover:scale-105 transition-transform border border-white/5">
                    <span className="material-symbols-outlined text-3xl filled">{habit.category}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-base font-bold tracking-tight text-white transition-all ${isCompleted ? 'opacity-30 line-through' : ''}`}>
                      {habit.name}
                    </span>
                    <span className="text-xs text-text-secondary font-medium tracking-wide flex items-center gap-1.5 mt-0.5">
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
                  className={`size-10 rounded-[12px] border-2 transition-all flex items-center justify-center ${isCompleted ? 'bg-gradient-primary border-transparent shadow-lg shadow-primary/30 scale-110' : 'border-white/10 bg-white/5 hover:border-primary/50'}`}
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
