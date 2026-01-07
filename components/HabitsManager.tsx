
import React from 'react';
import { Habit } from '../types';

interface HabitsManagerProps {
  habits: Habit[];
  onBack: () => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

const HabitsManager: React.FC<HabitsManagerProps> = ({ habits, onBack, onEdit, onDelete }) => {
  return (
    <div className="animate-fade-in flex flex-col min-h-screen">
      <header className="px-6 py-8 flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="size-10 rounded-full bg-surface border border-white/5 flex items-center justify-center active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-white text-xl">arrow_back</span>
        </button>
        <h1 className="text-sm font-black text-white uppercase tracking-[0.3em]">Meus Hábitos</h1>
        <div className="size-10"></div>
      </header>

      <div className="px-6 space-y-4 pb-20">
        {habits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
            <span className="material-symbols-outlined text-6xl">inventory_2</span>
            <p className="text-xs font-bold uppercase tracking-widest">Nenhum hábito cultivado ainda</p>
          </div>
        ) : (
          habits.map((habit) => (
            <div 
              key={habit.id}
              className="bg-surface rounded-3xl border border-white/5 p-5 flex items-center justify-between group overflow-hidden relative"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="size-12 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: `${habit.color}20` }}
                >
                  <span className="material-symbols-outlined text-xl filled" style={{ color: habit.color }}>
                    {habit.category}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white tracking-tight">{habit.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-white/5 text-text-secondary/60">
                      {habit.frequency}
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-white/5 text-text-secondary/60">
                      {habit.goal}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => onEdit(habit)}
                  className="size-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm(`Excluir "${habit.name}" permanentemente?`)) {
                      onDelete(habit.id);
                    }
                  }}
                  className="size-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary transition-all hover:text-white"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HabitsManager;
