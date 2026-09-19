import React, { useState } from 'react';
import { Header } from './components/Header';
import { BoneExplorer } from './components/BoneExplorer';
import { MuscleTable } from './components/MuscleTable';
import { Flashcards } from './components/Flashcards';
import { Quiz } from './components/Quiz';
import { PresentationGuideModal } from './components/PresentationGuideModal';
import { HeartPulse, BookOpen, Activity, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'bones' | 'muscles' | 'flashcards' | 'quiz'>('bones');
  const [muscleSearchFilter, setMuscleSearchFilter] = useState<string>('');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  const handleSelectMuscleFromBone = (muscleName: string) => {
    // Extract base muscle name if compound
    const cleaned = muscleName.replace('Músculo ', '').trim();
    setMuscleSearchFilter(cleaned);
    setActiveTab('muscles');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/80 selection:bg-sky-500 selection:text-white">
      {/* Top Professional Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'muscles') {
            setMuscleSearchFilter('');
          }
        }}
        onOpenQuickGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'bones' && (
          <div className="animate-fadeIn">
            <BoneExplorer onSelectMuscle={handleSelectMuscleFromBone} />
          </div>
        )}

        {activeTab === 'muscles' && (
          <div className="animate-fadeIn">
            <MuscleTable initialFilter={muscleSearchFilter} />
          </div>
        )}

        {activeTab === 'flashcards' && (
          <div className="animate-fadeIn">
            <Flashcards />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="animate-fadeIn">
            <Quiz />
          </div>
        )}
      </main>

      {/* Presentation Guide Modal */}
      <PresentationGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Clinical Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-500"></div>
            <span className="font-semibold text-slate-700">
              Anatomía del Hombro & Cintura Escapular
            </span>
            <span className="text-slate-400">|</span>
            <span>Nomina Anatomica & Biomecánica Clínica</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="text-sky-700 hover:text-sky-900 font-medium hover:underline cursor-pointer"
            >
              Perlas de Exposición
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setActiveTab('quiz')}
              className="text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Autoevaluación
            </button>
            <span className="text-slate-300">•</span>
            <span>SPA Médica Interactiva</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
