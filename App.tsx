
import React, { useState, useEffect, useRef } from 'react';
import { Habit, DailyInsight, HabitCategory } from './types';
import { INITIAL_HABITS } from './constants';
import { getHabitInsight } from './services/geminiService';
import Dashboard from './components/Dashboard';
import HabitDetail from './components/HabitDetail';
import CreateHabit from './components/CreateHabit';
import StatsView from './components/StatsView';

type Screen = 'dashboard' | 'detail' | 'create' | 'stats';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const [insight, setInsight] = useState<DailyInsight | null>(null);
  const [profileImage, setProfileImage] = useState<string>("https://picsum.photos/200");
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchInsight = async () => {
      const data = await getHabitInsight(habits);
      setInsight(data);
    };
    fetchInsight();
  }, [habits]);

  const toggleHabitCompletion = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const isCompleted = habit.completedDays.includes(today);
        const newCompletedDays = isCompleted 
          ? habit.completedDays.filter(d => d !== today)
          : [...habit.completedDays, today];
        return { ...habit, completedDays: newCompletedDays };
      }
      return habit;
    }));
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
    <div className="flex justify-center min-h-screen bg-[#0f111a] font-sans overflow-x-hidden selection:bg-primary/30">
      <div className="w-full max-w-md relative pb-24 shadow-2xl bg-[#0f111a] min-h-screen flex flex-col">
        
        {currentScreen === 'dashboard' && (
          <Dashboard 
            habits={habits} 
            insight={insight} 
            profileImage={profileImage}
            onToggle={toggleHabitCompletion}
            onHabitClick={(id) => { setSelectedHabitId(id); setCurrentScreen('detail'); }}
            onProfileClick={startCamera}
          />
        )}

        {currentScreen === 'detail' && selectedHabit && (
          <HabitDetail 
            habit={selectedHabit} 
            onBack={() => setCurrentScreen('dashboard')}
            onToggle={() => toggleHabitCompletion(selectedHabit.id)}
          />
        )}

        {currentScreen === 'create' && (
          <CreateHabit 
            onBack={() => setCurrentScreen('dashboard')}
            onSave={(newHabit) => {
              setHabits([...habits, newHabit]);
              setCurrentScreen('dashboard');
            }}
          />
        )}

        {currentScreen === 'stats' && (
          <StatsView 
            habits={habits}
            onBack={() => setCurrentScreen('dashboard')}
          />
        )}

        {/* Camera Overlay */}
        {isCameraActive && (
          <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6">
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-3xl shadow-2xl border-2 border-primary/20" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-6 mt-10">
              <button 
                onClick={stopCamera}
                className="size-16 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <button 
                onClick={takePhoto}
                className="size-16 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-xl shadow-primary/20"
              >
                <span className="material-symbols-outlined text-3xl">photo_camera</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-[#0f111a]/95 backdrop-blur-2xl border-t border-white/5 px-6 pb-8 pt-4 z-50">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className={`flex flex-col items-center transition-all ${currentScreen === 'dashboard' ? 'text-primary' : 'text-text-secondary'}`}
            >
              <span className={`material-symbols-outlined ${currentScreen === 'dashboard' ? 'filled scale-110 drop-shadow-[0_0_8px_rgba(233,30,99,0.3)]' : ''}`}>home</span>
              <span className="text-[10px] mt-1 font-bold uppercase tracking-widest">Home</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('stats')}
              className={`flex flex-col items-center transition-all ${currentScreen === 'stats' ? 'text-primary' : 'text-text-secondary'}`}
            >
              <span className={`material-symbols-outlined ${currentScreen === 'stats' ? 'filled scale-110' : ''}`}>bar_chart</span>
              <span className="text-[10px] mt-1 font-bold uppercase tracking-widest">Stats</span>
            </button>
            <div className="relative -top-10">
              <button 
                onClick={() => setCurrentScreen('create')}
                className="flex items-center justify-center size-14 rounded-2xl bg-gradient-primary text-white shadow-[0_8px_24px_rgba(233,30,99,0.4)] active:scale-95 transition-all border-4 border-[#0f111a]"
              >
                <span className="material-symbols-outlined text-3xl font-bold">add</span>
              </button>
            </div>
            <button className="flex flex-col items-center text-text-secondary hover:text-white transition-colors">
              <span className="material-symbols-outlined">groups</span>
              <span className="text-[10px] mt-1 font-bold uppercase tracking-widest">Social</span>
            </button>
            <button className="flex flex-col items-center text-text-secondary hover:text-white transition-colors">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-[10px] mt-1 font-bold uppercase tracking-widest">Tools</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default App;
