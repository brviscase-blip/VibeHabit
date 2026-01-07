
import React, { useState } from 'react';
import { Habit, HabitCategory } from '../types';

interface CreateHabitProps {
  onBack: () => void;
  onSave: (habit: Habit) => void;
}

const CreateHabit: React.FC<CreateHabitProps> = ({ onBack, onSave }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [freq, setFreq] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [cat, setCat] = useState<HabitCategory>(HabitCategory.FITNESS);

  const handleSave = () => {
    if (!name) return;
    const newHabit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description: desc,
      category: cat,
      goal: 'Done',
      completedDays: [],
      color: 'primary',
      frequency: freq,
    };
    onSave(newHabit);
  };

  return (
    <div className="animate-fade-in px-6">
      <header className="sticky top-0 z-20 flex items-center justify-between py-5 bg-background/80 backdrop-blur-md">
        <button onClick={onBack} className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-surface transition-colors">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-white">Create Habit</h1>
        <div className="w-10"></div>
      </header>

      <div className="space-y-6 mt-4">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Name</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary group-focus-within:text-primary transition-colors">edit</span>
            </div>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface border border-white/5 focus:border-primary/50 rounded-2xl py-4 pl-12 pr-4 text-lg font-medium text-white placeholder:text-white/20 focus:ring-0 transition-all shadow-sm" 
              placeholder="e.g. Morning Run" 
              type="text"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Description</label>
          <textarea 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-surface border border-white/5 focus:border-primary/50 rounded-2xl p-4 text-base font-normal text-white placeholder:text-white/20 focus:ring-0 transition-all shadow-sm resize-none min-h-[100px]" 
            placeholder="What's your motivation?"
          ></textarea>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Frequency</label>
          <div className="flex gap-3">
            {(['daily', 'weekly', 'monthly'] as const).map(f => (
              <button 
                key={f}
                onClick={() => setFreq(f)}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${freq === f ? 'bg-gradient-primary text-white shadow-lg shadow-primary/20' : 'bg-surface text-text-secondary border border-white/5 hover:bg-surface-light'}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Icon & Color</label>
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
            {Object.values(HabitCategory).map(c => (
              <button 
                key={c}
                onClick={() => setCat(c)}
                className={`w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center transition-all ${cat === c ? 'bg-gradient-primary ring-2 ring-primary ring-offset-4 ring-offset-background' : 'bg-surface border border-white/5 text-text-secondary hover:bg-surface-light'}`}
              >
                <span className="material-symbols-outlined text-2xl filled">{c}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <button 
          onClick={handleSave}
          className="w-full bg-gradient-primary text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <span>Save Habit</span>
          <span className="material-symbols-outlined">check</span>
        </button>
      </div>
    </div>
  );
};

export default CreateHabit;
