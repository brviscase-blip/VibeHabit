
import React, { useState, useEffect } from 'react';
import { Habit, HabitCategory } from '../types';

interface CreateHabitProps {
  editingHabit?: Habit | null;
  onBack: () => void;
  onSave: (habit: Habit) => void;
}

const CATEGORY_CONFIG = [
  { cat: HabitCategory.FITNESS, label: 'Corpo', color: '#e91e63' },
  { cat: HabitCategory.READING, label: 'Mente', color: '#2196f3' },
  { cat: HabitCategory.WATER, label: 'Saúde', color: '#00bcd4' },
  { cat: HabitCategory.MEDITATION, label: 'Foco', color: '#9c27b0' },
  { cat: HabitCategory.SLEEP, label: 'Descanso', color: '#ffeb3b' },
];

const CreateHabit: React.FC<CreateHabitProps> = ({ editingHabit, onBack, onSave }) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [freq, setFreq] = useState<'diário' | 'semanal' | 'mensal'>('diário');
  const [selectedCat, setSelectedCat] = useState(HabitCategory.FITNESS);

  useEffect(() => {
    if (editingHabit) {
      setName(editingHabit.name);
      setGoal(editingHabit.goal);
      setFreq(editingHabit.frequency);
      setSelectedCat(editingHabit.category);
    }
  }, [editingHabit]);

  const handleSave = () => {
    if (!name) return;
    const config = CATEGORY_CONFIG.find(c => c.cat === selectedCat);
    const newHabit: Habit = {
      id: editingHabit?.id || Math.random().toString(36).substr(2, 9),
      name,
      description: editingHabit?.description || '',
      category: selectedCat,
      goal: goal || 'Diário',
      completedDays: editingHabit?.completedDays || [],
      color: config?.color || '#e91e63',
      frequency: freq,
    };
    onSave(newHabit);
  };

  return (
    <div className="animate-fade-in flex flex-col min-h-[calc(100vh-80px)]">
      <header className="px-6 py-8 flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="size-10 rounded-full bg-surface border border-white/5 flex items-center justify-center active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-white text-xl">close</span>
        </button>
        <h1 className="text-sm font-black text-white uppercase tracking-[0.3em]">
          {editingHabit ? 'Editar Hábito' : 'Criar Hábito'}
        </h1>
        <div className="size-10"></div>
      </header>

      <div className="px-6 space-y-10 pb-12">
        <div className="space-y-4">
          <label className="block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1">O que vamos cultivar?</label>
          <div className="space-y-3">
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface border border-white/5 focus:border-primary/40 rounded-2xl py-5 px-6 text-base font-bold text-white placeholder:text-white/20 outline-none transition-all" 
              placeholder="Ex: Meditação Matinal" 
            />
            <input 
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-surface border border-white/5 focus:border-primary/40 rounded-2xl py-5 px-6 text-base font-bold text-white placeholder:text-white/20 outline-none transition-all" 
              placeholder="Meta (ex: 15 min)" 
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Frequência</label>
          <div className="grid grid-cols-3 gap-2 bg-surface p-1.5 rounded-2xl border border-white/5">
            {(['diário', 'semanal', 'mensal'] as const).map(f => (
              <button 
                key={f}
                onClick={() => setFreq(f)}
                className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  freq === f ? 'bg-gradient-primary text-white shadow-lg shadow-primary/20' : 'text-text-secondary/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1">Vibe do Hábito</label>
          <div className="grid grid-cols-5 gap-3">
            {CATEGORY_CONFIG.map(({ cat, label, color }) => (
              <button 
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`flex flex-col items-center gap-3 transition-all duration-300 ${selectedCat === cat ? 'scale-110' : 'opacity-30 grayscale'}`}
              >
                <div 
                  className="size-12 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: color }}
                >
                  <span className="material-symbols-outlined text-white text-xl filled">{cat}</span>
                </div>
                <span className="text-[8px] font-black text-white uppercase tracking-widest">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button 
            onClick={handleSave}
            disabled={!name}
            className="w-full bg-gradient-primary disabled:opacity-30 text-white font-black text-xs uppercase tracking-[0.3em] py-6 rounded-[24px] shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            {editingHabit ? 'Atualizar Hábito' : 'Iniciar Jornada'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateHabit;
