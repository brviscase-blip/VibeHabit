
import React, { useState } from 'react';
import { Habit, HabitCategory } from '../types';

interface CreateHabitProps {
  onBack: () => void;
  onSave: (habit: Habit) => void;
}

const CreateHabit: React.FC<CreateHabitProps> = ({ onBack, onSave }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [goal, setGoal] = useState('');
  const [freq, setFreq] = useState<'diário' | 'semanal' | 'mensal'>('diário');
  const [cat, setCat] = useState<HabitCategory>(HabitCategory.FITNESS);

  const handleSave = () => {
    if (!name) return;
    const newHabit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description: desc,
      category: cat,
      goal: goal || 'Meta batida',
      completedDays: [],
      color: 'primary',
      frequency: freq,
    };
    onSave(newHabit);
  };

  return (
    <div className="animate-fade-in flex flex-col min-h-[calc(100vh-80px)]">
      {/* Header Fixo Simples */}
      <header className="px-5 py-6 flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="flex items-center justify-center size-10 rounded-xl bg-surface border border-white/5 active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined text-white">close</span>
        </button>
        <h1 className="text-lg font-black tracking-tight text-white uppercase tracking-[0.05em]">Novo Hábito</h1>
        <div className="size-10"></div> {/* Spacer para centralizar o título */}
      </header>

      <div className="flex-1 px-5 pb-10 space-y-8">
        
        {/* Seção 1: Identidade */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-sm filled">label</span>
            <h2 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Identidade</h2>
          </div>
          
          <div className="space-y-3">
            <div className="relative group">
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#121420] border border-white/5 focus:border-primary/50 rounded-[14px] py-4 px-4 text-sm font-bold text-white placeholder:text-white/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none" 
                placeholder="O que você quer cultivar?" 
                type="text"
              />
            </div>
            
            <textarea 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-[#121420] border border-white/5 focus:border-primary/50 rounded-[14px] p-4 text-xs font-medium text-white placeholder:text-white/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none min-h-[90px]" 
              placeholder="Descreva o 'porquê' por trás deste hábito..."
            ></textarea>
          </div>
        </section>

        {/* Seção 2: Ritmo e Meta */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-accent text-sm filled">rebase_edit</span>
            <h2 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Ritmo</h2>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-[#121420] p-1.5 rounded-[16px] border border-white/5">
            {(['diário', 'semanal', 'mensal'] as const).map(f => (
              <button 
                key={f}
                onClick={() => setFreq(f)}
                className={`py-2.5 rounded-[12px] font-black text-[9px] uppercase tracking-widest transition-all ${
                  freq === f 
                  ? 'bg-gradient-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-text-secondary/60 hover:text-text-secondary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-primary/40 text-lg filled">target</span>
            </div>
            <input 
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-[#121420] border border-white/5 focus:border-primary/50 rounded-[14px] py-4 pl-11 pr-4 text-sm font-bold text-white placeholder:text-white/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none" 
              placeholder="Ex: 30 minutos, 2 litros..." 
              type="text"
            />
          </div>
        </section>

        {/* Seção 3: Categoria e Estilo */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-purple-400 text-sm filled">palette</span>
            <h2 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Visual</h2>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {Object.values(HabitCategory).map(c => (
              <button 
                key={c}
                onClick={() => setCat(c)}
                className={`aspect-square rounded-[18px] flex flex-col items-center justify-center gap-2 transition-all duration-300 border ${
                  cat === c 
                  ? 'bg-gradient-primary border-transparent shadow-xl shadow-primary/20 scale-105' 
                  : 'bg-[#121420] border-white/5 text-text-secondary/40 hover:border-white/20 hover:text-text-secondary'
                }`}
              >
                <span className={`material-symbols-outlined text-2xl ${cat === c ? 'filled text-white' : ''}`}>{c}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Botão de Ação Principal */}
        <div className="pt-6">
          <button 
            onClick={handleSave}
            disabled={!name}
            className="w-full bg-gradient-primary disabled:opacity-50 disabled:grayscale text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-[18px] shadow-2xl shadow-primary/40 hover:brightness-110 active:scale-[0.97] transition-all flex items-center justify-center gap-3"
          >
            <span>Gerar Hábito</span>
            <span className="material-symbols-outlined text-xl filled">magic_button</span>
          </button>
          <p className="text-center text-[8px] text-text-secondary/40 mt-4 uppercase font-bold tracking-[0.1em]">Você poderá editar estas configurações a qualquer momento</p>
        </div>
      </div>
    </div>
  );
};

export default CreateHabit;
