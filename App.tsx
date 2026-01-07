
import React, { useState, useRef, useEffect } from 'react';
import { Habit, HabitCategory } from './types';
import { INITIAL_HABITS } from './constants';
import Dashboard from './components/Dashboard';
import HabitDetail from './components/HabitDetail';
import CreateHabit from './components/CreateHabit';
import StatsView from './components/StatsView';
import HabitsManager from './components/HabitsManager';

type Screen = 'dashboard' | 'detail' | 'create' | 'stats' | 'manage_habits';

const STORAGE_KEY_HABITS = 'vibehabit_habits_v1';
const STORAGE_KEY_PROFILE = 'vibehabit_profile_v1';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem(STORAGE_KEY_HABITS);
    return savedHabits ? JSON.parse(savedHabits) : INITIAL_HABITS;
  });
  
  const [profileImage, setProfileImage] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_PROFILE) || "https://picsum.photos/200";
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HABITS, JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILE, profileImage);
  }, [profileImage]);

  const toggleHabitCompletion = (id: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const isCompleted = habit.completedDays.includes(selectedDate);
        const newCompletedDays = isCompleted 
          ? habit.completedDays.filter(d => d !== selectedDate)
          : [...habit.completedDays, selectedDate];
        return { ...habit, completedDays: newCompletedDays };
      }
      return habit;
    }));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const saveHabit = (habit: Habit) => {
    if (editingHabit) {
      setHabits(prev => prev.map(h => h.id === habit.id ? habit : h));
      setEditingHabit(null);
    } else {
      setHabits(prev => [...prev, habit]);
    }
    setCurrentScreen('dashboard');
  };

  const startEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setCurrentScreen('create');
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setProfileImage(dataUrl);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const selectedHabit = habits.find(h => h.id === selectedHabitId);

  return (
    <div className="flex justify-center min-h-screen bg-[#0f111a] font-sans selection:bg-primary/30 overflow-x-hidden">
      <div className="w-full max-w-xl relative pb-24 shadow-2xl bg-[#0f111a] min-h-screen flex flex-col transition-all duration-300">
        
        {currentScreen === 'dashboard' && (
          <Dashboard 
            habits={habits} 
            profileImage={profileImage}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onToggle={toggleHabitCompletion}
            onHabitClick={(id) => { setSelectedHabitId(id); setCurrentScreen('detail'); }}
            onProfileClick={startCamera}
          />
        )}

        {currentScreen === 'manage_habits' && (
          <HabitsManager 
            habits={habits}
            onBack={() => setCurrentScreen('dashboard')}
            onEdit={startEdit}
            onDelete={deleteHabit}
          />
        )}

        {currentScreen === 'detail' && selectedHabit && (
          <HabitDetail 
            habit={selectedHabit} 
            selectedDate={selectedDate}
            onBack={() => setCurrentScreen('dashboard')}
            onToggle={() => toggleHabitCompletion(selectedHabit.id)}
          />
        )}

        {currentScreen === 'create' && (
          <CreateHabit 
            editingHabit={editingHabit}
            onBack={() => {
              setEditingHabit(null);
              setCurrentScreen('dashboard');
            }}
            onSave={saveHabit}
          />
        )}

        {currentScreen === 'stats' && (
          <StatsView 
            habits={habits}
            onBack={() => setCurrentScreen('dashboard')}
          />
        )}

        {isCameraActive && (
          <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6">
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-2xl shadow-2xl border-2 border-primary/20" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-6 mt-10">
              <button 
                onClick={stopCamera}
                className="size-14 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <button 
                onClick={takePhoto}
                className="size-14 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-xl shadow-primary/20"
              >
                <span className="material-symbols-outlined text-2xl">photo_camera</span>
              </button>
            </div>
          </div>
        )}

        <nav className="fixed bottom-0 left-0 right-0 w-full max-w-xl mx-auto bg-[#0f111a]/95 backdrop-blur-2xl border-t border-white/5 px-4 pb-6 pt-3 z-50">
          <div className="flex justify-around items-center">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className={`flex flex-col items-center transition-all ${currentScreen === 'dashboard' ? 'text-primary' : 'text-text-secondary'}`}
            >
              <span className={`material-symbols-outlined text-[24px] ${currentScreen === 'dashboard' ? 'filled' : ''}`}>home</span>
              <span className="text-[8px] mt-1 font-black uppercase tracking-widest">Home</span>
            </button>

            <button 
              onClick={() => setCurrentScreen('manage_habits')}
              className={`flex flex-col items-center transition-all ${currentScreen === 'manage_habits' ? 'text-primary' : 'text-text-secondary'}`}
            >
              <span className={`material-symbols-outlined text-[24px] ${currentScreen === 'manage_habits' ? 'filled' : ''}`}>format_list_bulleted</span>
              <span className="text-[8px] mt-1 font-black uppercase tracking-widest">Lista</span>
            </button>
            
            <button 
              onClick={() => { setEditingHabit(null); setCurrentScreen('create'); }}
              className="flex items-center justify-center size-12 rounded-2xl bg-gradient-primary text-white shadow-lg active:scale-90 transition-all border border-white/10"
            >
              <span className="material-symbols-outlined text-2xl font-bold">add</span>
            </button>
            
            <button 
              onClick={() => setCurrentScreen('stats')}
              className={`flex flex-col items-center transition-all ${currentScreen === 'stats' ? 'text-primary' : 'text-text-secondary'}`}
            >
              <span className={`material-symbols-outlined text-[24px] ${currentScreen === 'stats' ? 'filled' : ''}`}>analytics</span>
              <span className="text-[8px] mt-1 font-black uppercase tracking-widest">Stats</span>
            </button>

            <button 
              className="flex flex-col items-center text-text-secondary opacity-50"
              disabled
            >
              <span className="material-symbols-outlined text-[24px]">settings</span>
              <span className="text-[8px] mt-1 font-black uppercase tracking-widest">Ajustes</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default App;
