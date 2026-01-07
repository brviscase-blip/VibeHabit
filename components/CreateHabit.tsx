
import React, { useState } from 'react';
import { Habit, HabitCategory } from '../types';

interface CreateHabitProps {
  onBack: () => void;
  onSave: (habit: Habit) => void;
}

const CreateHabit: React.FC<CreateHabitProps> = ({ onBack, onSave }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [freq, setFreq] = useState<'diário' | 'semanal' | 'mensal'>('diário');
  const [cat, setCat] = useState<HabitCategory>(HabitCategory.FITNESS);

  const handleSave = () => {
    if (!name) return;
    const newHabit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description: desc,
      category: cat,
      goal: 'Concluído',
      completedDays: [],
      color: 'primary',
      frequency: freq,
    };
    onSave(newHabit);
  };

  return (
    <div className="animate-fade-in px-6">
      <header className="sticky top-0 z-20 flex items-center justify-between py-4 bg-background/80 backdrop-blur-md">
        <button onClick={onBack} className="flex items-center justify-center w-9 h-9 -ml-2 rounded-full hover:bg-surface transition-colors">
          <span className="material-symbols-outlined text-white text-xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-white">Criar Hábito</h1>
        <div className="w-9"></div>
      </header>

      <div className="space-y-5 mt-3">
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Nome</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary group-focus-within:text-primary transition-colors text-xl">edit</span>
            </div>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface border border-white/5 focus:border-primary/50 rounded-xl py-3 pl-11 pr-4 text-base font-medium text-white placeholder:text-white/20 focus:ring-0 transition-all shadow-sm" 
              placeholder="Ex: Corrida Matinal" 
              type="text"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Descrição</label>
          <textarea 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-surface border border-white/5 focus:border-primary/50 rounded-xl p-3.5 text-sm font-normal text-white placeholder:text-white/20 focus:ring-0 transition-all shadow-sm resize-none min-h-[80px]" 
            placeholder="Qual é a sua motivação?"
          ></textarea>
        </div>

        <div className="space-y-3">
          <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Frequência</label>
          <div className="flex gap-2.5">
            {(['diário', 'semanal', 'mensal'] as const).map(f => (
              <button 
                key={f}
                onClick={() => setFreq(f)}
                className={`px-4 py-2.5 rounded-lg font-bold text-xs transition-all ${freq === f ? 'bg-gradient-primary text-white shadow-lg shadow-primary/20' : 'bg-surface text-text-secondary border border-white/5 hover:bg-surface-light'}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest ml-1">Ícone & Categoria</label>
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-1.5">
            {Object.values(HabitCategory).map(c => (
              <button 
                key={c}
                onClick={() => setCat(c)}
                className={`w-14 h-14 rounded-xl shrink-0 flex items-center justify-center transition-all ${cat === c ? 'bg-gradient-primary ring-2 ring-primary ring-offset-4 ring-offset-background' : 'bg-surface border border-white/5 text-text-secondary hover:bg-surface-light'}`}
              >
                <span className="material-symbols-outlined text-xl filled">{c}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <button 
          onClick={handleSave}
          className="w-full bg-gradient-primary text-white font-bold text-base py-3.5 rounded-xl shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
        >
          <span>Salvar Hábito</span>
          <span className="material-symbols-outlined text-xl">check</span>
        </button>
      </div>
    </div>
  );
};

export default CreateHabit;
