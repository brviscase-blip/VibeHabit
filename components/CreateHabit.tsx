
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
    <div className="animate-fade-in px-5">
      <header className="sticky top-0 z-20 flex items-center justify-between py-3.5 bg-background/80 backdrop-blur-md">
        <button onClick={onBack} className="flex items-center justify-center w-8 h-8 -ml-1 rounded-full hover:bg-surface transition-colors">
          <span className="material-symbols-outlined text-white text-lg">arrow_back</span>
        </button>
        <h1 className="text-base font-bold tracking-tight text-white">Criar Hábito</h1>
        <div className="w-8"></div>
      </header>

      <div className="space-y-4.5 mt-2">
        <div className="space-y-1">
          <label className="block text-[9px] font-bold text-text-secondary uppercase tracking-widest ml-1">Nome</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary group-focus-within:text-primary transition-colors text-lg">edit</span>
            </div>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface border border-white/5 focus:border-primary/50 rounded-[9px] py-2.5 pl-10 pr-3.5 text-sm font-medium text-white placeholder:text-white/20 focus:ring-0 transition-all shadow-sm" 
              placeholder="Ex: Corrida Matinal" 
              type="text"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-[9px] font-bold text-text-secondary uppercase tracking-widest ml-1">Descrição</label>
          <textarea 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-surface border border-white/5 focus:border-primary/50 rounded-[9px] p-3 text-xs font-normal text-white placeholder:text-white/20 focus:ring-0 transition-all shadow-sm resize-none min-h-[70px]" 
            placeholder="Qual é a sua motivação?"
          ></textarea>
        </div>

        <div className="space-y-2.5">
          <label className="block text-[9px] font-bold text-text-secondary uppercase tracking-widest ml-1">Frequência</label>
          <div className="flex gap-2">
            {(['diário', 'semanal', 'mensal'] as const).map(f => (
              <button 
                key={f}
                onClick={() => setFreq(f)}
                className={`px-3.5 py-2 rounded-[6px] font-bold text-[11px] transition-all ${freq === f ? 'bg-gradient-primary text-white shadow-md shadow-primary/20' : 'bg-surface text-text-secondary border border-white/5 hover:bg-surface-light'}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <label className="block text-[9px] font-bold text-text-secondary uppercase tracking-widest ml-1">Ícone & Categoria</label>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
            {Object.values(HabitCategory).map(c => (
              <button 
                key={c}
                onClick={() => setCat(c)}
                className={`w-12 h-12 rounded-[9px] shrink-0 flex items-center justify-center transition-all ${cat === c ? 'bg-gradient-primary ring-2 ring-primary ring-offset-4 ring-offset-background' : 'bg-surface border border-white/5 text-text-secondary hover:bg-surface-light'}`}
              >
                <span className="material-symbols-outlined text-lg filled">{c}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button 
          onClick={handleSave}
          className="w-full bg-gradient-primary text-white font-bold text-sm py-3 rounded-[9px] shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Salvar Hábito</span>
          <span className="material-symbols-outlined text-lg">check</span>
        </button>
      </div>
    </div>
  );
};

export default CreateHabit;
