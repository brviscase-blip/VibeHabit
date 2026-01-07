
import React from 'react';
import { Habit } from '../types';

interface StatsViewProps {
  habits: Habit[];
  onBack: () => void;
}

const StatsView: React.FC<StatsViewProps> = ({ habits, onBack }) => {
  const weeklyData = [
    { day: 'SEG', val: 65 },
    { day: 'TER', val: 40 },
    { day: 'QUA', val: 85 },
    { day: 'QUI', val: 50 },
    { day: 'SEX', val: 95 },
    { day: 'SÁB', val: 70 },
    { day: 'DOM', val: 30 },
  ];

  const maxVal = Math.max(...weeklyData.map(d => d.val));

  return (
    <div className="animate-fade-in flex flex-col gap-5">
      <header className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-[#0f111a]/90 backdrop-blur-xl">
        <button onClick={onBack} className="flex size-9 items-center justify-center rounded-[9px] bg-surface border border-white/5 shadow-xl">
          <span className="material-symbols-outlined text-white text-lg">arrow_back</span>
        </button>
        <h1 className="text-base font-black tracking-tight text-white uppercase tracking-[0.1em]">Estatísticas</h1>
        <button className="flex size-9 items-center justify-center rounded-[9px] bg-surface border border-white/5 shadow-xl">
          <span className="material-symbols-outlined text-white text-lg">calendar_month</span>
        </button>
      </header>

      <div className="px-5 flex flex-col gap-5 pb-8">
        {/* Performance Overview */}
        <section className="grid grid-cols-2 gap-2.5">
          <div className="bg-surface rounded-[21px] p-4.5 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-16 bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all"></div>
            <span className="text-text-secondary text-[8px] font-black uppercase tracking-[0.15em] mb-2.5 block">Sequência Máxima</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white">24</span>
              <span className="text-[9px] text-text-secondary font-bold">DIAS</span>
            </div>
            <div className="mt-2.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-accent text-[10px] filled">trending_up</span>
              <span className="text-[8px] font-bold text-accent">+3 este mês</span>
            </div>
          </div>
          <div className="bg-surface rounded-[21px] p-4.5 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-16 bg-accent/10 blur-3xl group-hover:bg-accent/20 transition-all"></div>
            <span className="text-text-secondary text-[8px] font-black uppercase tracking-[0.15em] mb-2.5 block">Domínio</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white">82</span>
              <span className="text-[9px] text-text-secondary font-bold">%</span>
            </div>
            <div className="mt-2.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[10px] filled">stars</span>
              <span className="text-[8px] font-bold text-primary">Nível Elite</span>
            </div>
          </div>
        </section>

        {/* Weekly Chart */}
        <section className="bg-surface rounded-[24px] p-5 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-black text-white tracking-tight">Fluxo de Energia</h3>
              <p className="text-text-secondary text-[9px] font-bold uppercase tracking-widest">Últimos 7 Dias</p>
            </div>
            <span className="material-symbols-outlined text-primary text-lg">analytics</span>
          </div>

          <div className="flex items-end justify-between h-36 gap-2">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2.5 group">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div 
                    className={`w-2.5 rounded-full transition-all duration-700 shadow-md ${d.val === maxVal ? 'bg-gradient-primary shadow-primary/30' : 'bg-white/5 group-hover:bg-white/10'}`}
                    style={{ height: `${d.val}%` }}
                  >
                    {d.val === maxVal && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-black text-[7px] font-black px-1 py-0.5 rounded-sm">
                        {d.val}%
                      </div>
                    )}
                  </div>
                </div>
                <span className={`text-[8px] font-black tracking-tighter ${d.val === maxVal ? 'text-white' : 'text-text-secondary/40'}`}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Quest Breakdown */}
        <section className="flex flex-col gap-2.5">
          <h3 className="text-sm font-black text-white tracking-tight">Progresso de Habilidades</h3>
          <div className="flex flex-col gap-2">
            {habits.slice(0, 4).map((h, idx) => {
              const progress = [90, 75, 60, 45][idx];
              return (
                <div key={h.id} className="bg-surface rounded-[18px] p-3.5 border border-white/5 flex items-center gap-3.5 group">
                  <div className="size-9 rounded-[9px] bg-[#0f111a] flex items-center justify-center text-primary border border-white/5">
                    <span className="material-symbols-outlined text-lg filled">{h.category}</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-black text-white tracking-tight">{h.name}</span>
                      <span className="text-[8px] font-black text-text-secondary tracking-widest">{progress}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary rounded-full transition-all duration-1000 delay-500"
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
