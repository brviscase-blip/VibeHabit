
import React from 'react';
import { Habit } from '../types';

interface StatsViewProps {
  habits: Habit[];
  onBack: () => void;
}

const StatsView: React.FC<StatsViewProps> = ({ habits, onBack }) => {
  const weeklyData = [
    { day: 'Mon', val: 65 },
    { day: 'Tue', val: 40 },
    { day: 'Wed', val: 85 },
    { day: 'Thu', val: 50 },
    { day: 'Fri', val: 95 },
    { day: 'Sat', val: 70 },
    { day: 'Sun', val: 30 },
  ];

  const maxVal = Math.max(...weeklyData.map(d => d.val));

  return (
    <div className="animate-fade-in flex flex-col gap-8">
      <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-6 bg-[#0f111a]/90 backdrop-blur-xl">
        <button onClick={onBack} className="flex size-11 items-center justify-center rounded-2xl bg-surface border border-white/5 shadow-xl">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black tracking-tight text-white uppercase tracking-[0.1em]">Analytics</h1>
        <button className="flex size-11 items-center justify-center rounded-2xl bg-surface border border-white/5 shadow-xl">
          <span className="material-symbols-outlined text-white">calendar_month</span>
        </button>
      </header>

      <div className="px-6 flex flex-col gap-8 pb-10">
        {/* Performance Overview */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-surface rounded-[32px] p-6 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-24 bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all"></div>
            <span className="text-text-secondary text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">Peak Streak</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">24</span>
              <span className="text-xs text-text-secondary font-bold">DAYS</span>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-accent text-sm filled">trending_up</span>
              <span className="text-[10px] font-bold text-accent">+3 from last month</span>
            </div>
          </div>
          <div className="bg-surface rounded-[32px] p-6 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-24 bg-accent/10 blur-3xl group-hover:bg-accent/20 transition-all"></div>
            <span className="text-text-secondary text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">Mastery</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">82</span>
              <span className="text-xs text-text-secondary font-bold">%</span>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-sm filled">stars</span>
              <span className="text-[10px] font-bold text-primary">Elite Level</span>
            </div>
          </div>
        </section>

        {/* Weekly Chart */}
        <section className="bg-surface rounded-[40px] p-8 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">Energy Flow</h3>
              <p className="text-text-secondary text-[11px] font-bold uppercase tracking-widest">Last 7 Days</p>
            </div>
            <span className="material-symbols-outlined text-primary">analytics</span>
          </div>

          <div className="flex items-end justify-between h-48 gap-3">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div 
                    className={`w-3.5 rounded-full transition-all duration-700 delay-[${i * 100}ms] shadow-lg ${d.val === maxVal ? 'bg-gradient-primary shadow-primary/30' : 'bg-white/5 group-hover:bg-white/10'}`}
                    style={{ height: `${d.val}%` }}
                  >
                    {d.val === maxVal && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-2 py-1 rounded-lg">
                        {d.val}%
                      </div>
                    )}
                  </div>
                </div>
                <span className={`text-[10px] font-black tracking-tighter ${d.val === maxVal ? 'text-white' : 'text-text-secondary/40'}`}>
                  {d.day.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Quest Breakdown */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-black text-white tracking-tight">Skill Progress</h3>
          <div className="flex flex-col gap-3">
            {habits.slice(0, 4).map((h, idx) => {
              const progress = [90, 75, 60, 45][idx];
              return (
                <div key={h.id} className="bg-surface rounded-3xl p-5 border border-white/5 flex items-center gap-5 group">
                  <div className="size-12 rounded-2xl bg-[#0f111a] flex items-center justify-center text-primary border border-white/5">
                    <span className="material-symbols-outlined filled">{h.category}</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-black text-white tracking-tight">{h.name}</span>
                      <span className="text-[10px] font-black text-text-secondary tracking-widest">{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary rounded-full transition-all duration-1000 delay-500 shadow-[0_0_10px_rgba(233,30,99,0.3)]"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StatsView;
